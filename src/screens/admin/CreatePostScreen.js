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
    Keyboard,
    Image
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
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


const CreatePostScreen = props => {

    const [post, setPost] = useState({
        image: null,
        title: "",
    });


    const [inputError, setInputError] = useState({
        "image": "",
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
        const inputErrors = {...inputError};
        const inputFieldCurr = {[name]: value};
        const errorMessage = validateInput(inputFieldCurr, schema);
        if (errorMessage) inputErrors[name] = errorMessage;
        else delete inputErrors[name];
        setInputError({...inputErrors});
        setPost({...post, ...inputFieldCurr});
    };

    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    const handleImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        console.log("Image result", result);

        if (!result.cancelled) {
            setPost({...post, image: result.uri})
        }


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
                            <Text style={styles.secHeaderTxt}>Add new Post</Text>
                        </View>

                        <View style={styles.cardBody}>


                            <DefaultInputText
                                containerStyle={styles.inputTitleContainer}
                                placeholder='Title'
                                name='title'
                                value={post.title}
                                error={inputError.title}
                                onTextChange={handleInputChange}
                                multiline
                                autoCorrect={false}
                                textAlignVertical='top'
                            />

                            <TouchableNativeFeedback onPress={handleImagePicker}>
                                <View style={[styles.pickerContainer]}>

                                    <View style={styles.pickerIconContainer}>
                                        <Icon
                                            color='#eee'
                                            type='material'
                                            size={40}
                                            name='add-a-photo'/>
                                    </View>

                                    {
                                        post.image &&
                                        <Image
                                            source={{uri: post.image}}
                                            style={[styles.selectedImage]}
                                        />
                                    }

                                </View>
                            </TouchableNativeFeedback>


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

    pickerIconContainer: {
        position: 'absolute',
        alignSelf: "center",
        top: '48%',
    },

    selectedImage: {
        flex: 1,
        width: null,
        height: null,
        zIndex: 999,
        resizeMode: 'cover'
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
    pickerContainer: {
        height: 300,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        position: 'relative',
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

export default CreatePostScreen;
