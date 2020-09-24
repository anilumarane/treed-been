import React, {useState} from 'react';
import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableNativeFeedback,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native'
import GlobalStyles from "../../styles/GlobalStyles";
import {Font} from "../../utils/font";
import {
    DARK_COLOR, GREY_DARK,
    PRIMARY_DARK_COLOR,
} from "../../utils/constants";
import {validateInput} from "../../utils/helper";
import * as Joi from "react-native-joi";
import {Icon} from "react-native-elements";
import Spinner from "../../components/Spinner";
import DefaultInputText from "../../components/DefaultInputText";

const CreateCommentScreen = props => {

    const [comment, setComment] = useState({
        comment: "",
        title: "",
    });


    const [inputError, setInputError] = useState({
        "comment": "",
        "title": "",
    });

    const [loader, setLoader] = useState(false);


    const schema = {
        // use label if you want to give friendly label name (optional)
        title: Joi.string()
            .required()
            .label('title'),
        comment: Joi.string()
            .required()
            .label('Comment'),
    };


    const handleInputChange = (name, value) => {
        console.log(name, value);

        const inputErrors = {...inputError};
        const inputFieldCurr = {[name]: value};

        const errorMessage = validateInput(inputFieldCurr, schema);


        if (errorMessage) inputErrors[name] = errorMessage;
        else delete inputErrors[name];

        setInputError({...inputErrors});
        setComment({...comment, ...inputFieldCurr});
    };

    const handleSubmit = async () => {
        Keyboard.dismiss();
    };


    return (
        <SafeAreaView style={[GlobalStyles.container, styles.container]}>

            <ScrollView showsVerticalScrollIndicator={false}>

                <KeyboardAvoidingView behavior='padding' style={[GlobalStyles.viewContainer, styles.viewContainer]}>


                    <View style={styles.card}>

                        <View style={styles.cardHeader}>
                            <Text style={styles.secHeaderTxt}>Add new Comment</Text>
                        </View>

                        <View style={styles.cardBody}>


                            <DefaultInputText
                                containerStyle={styles.inputTitleContainer}
                                placeholder='Title'
                                name='title'
                                value={comment.title}
                                error={inputError.title}
                                onTextChange={handleInputChange}
                                multiline
                                autoCorrect={false}
                                textAlignVertical='top'
                            />



                            <DefaultInputText
                                containerStyle={styles.inputCommentContainer}
                                placeholder='Post something to this event....'
                                name='comment'
                                value={comment.comment}
                                error={inputError.comment}
                                onTextChange={handleInputChange}
                                multiline
                                autoCorrect={false}
                                textAlignVertical='top'
                                placeholderTextColor={GREY_DARK}
                            />


                            <View style={styles.btnWrap}>
                                <TouchableNativeFeedback onPress={handleSubmit}>
                                    <View style={styles.btnContainer}>
                                        <Text style={styles.btnTxt}>Post</Text>
                                        <Icon color={PRIMARY_DARK_COLOR} type='font-awesome' size={12}
                                              name='upload'/>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>


                        </View>


                    </View>


                </KeyboardAvoidingView>


            </ScrollView>

            {loader && <Spinner message='Please wait...'/>}


        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    viewContainer: {
        paddingTop: '20%',
        flex: 1,
    },


    cardHeader: {
        marginBottom: 30,
        marginRight: 'auto'
    },

    secHeaderTxt: {
        fontFamily: Font.MontserratBold,
        fontSize: 20,
        color: DARK_COLOR,
    },
    container: {},
    card: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 40,
        borderRadius: 5
    },
    cardBody: {
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 5,
        overflow: "hidden"
    },
    cardFooter: {},

    inputTitleContainer: {
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        minHeight: 30,
    },
    inputCommentContainer: {
        minHeight: 150,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },

    btnContainer: {
        marginLeft: "auto",
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dbdbdb',
        borderRadius: 3,
        marginRight: 15,
        paddingHorizontal: 30,
        paddingVertical: 10,

    },
    btnTxt: {
        fontFamily: Font.MontserratSemiBold,
        marginRight: 10,
        color: PRIMARY_DARK_COLOR
    },
    btnWrap: {
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15
    },

});

export default CreateCommentScreen;
