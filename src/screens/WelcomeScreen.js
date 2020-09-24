import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableNativeFeedback,
    ScrollView,
    Dimensions
} from 'react-native'
import {GREY_COLOR, PRIMARY_COLOR} from "../utils/constants";
import HeaderText from "../components/HeaderText";
import {Button as RNEButton, Icon} from "react-native-elements";
import MainText from "../components/MainText";
import {Font} from "../utils/font";

const WelcomeScreen = ({navigation}) => {


    return (

        <View style={style.container}>

            <View style={style.viewContainer}>

                <View style={style.logoView}>
                    <View style={style.logoContainer}>
                        <Image
                            style={style.logo}
                            source={require('../assets/image/logo-bg-blue.png')}
                        />
                    </View>
                </View>


                <View style={style.contentContainer}>

                    <View style={style.textContainer}>

                        <View style={style.headerTextLabelContainer}>
                            <HeaderText style={style.headerTextLabel}>Welcome to </HeaderText>
                            <HeaderText style={style.headerTextLabel}>TB-Quanta</HeaderText>
                        </View>


                        <MainText style={style.textLabel}>
                            Profile chart & RoboDigit with ground breaking factor
                        </MainText>

                    </View>


                    <View style={style.btnContainer}>

                        <TouchableNativeFeedback
                            onPress={() => navigation.navigate('Login')}
                        >
                            <View style={[style.btn, style.btnFilled]}>
                                <MainText style={[style.btnText, style.loginBtnText]}>Already has an account?</MainText>
                                <Icon
                                    name='login'
                                    type='antdesign'
                                    color='#154cb1'
                                    size={16}
                                />
                            </View>
                        </TouchableNativeFeedback>


                        <RNEButton
                            onPress={() => navigation.navigate('SignUp')}
                            buttonStyle={style.btnOutline}
                            title='Create a New Account'
                            titleStyle={[style.btnText, {color: '#eee'}]}
                            type='outline'
                            raised
                            icon={
                                <Icon
                                    type='antdesign'
                                    name="adduser"
                                    size={16}
                                    color='#eee'
                                />
                            }
                            iconRight

                        />

                    </View>

                </View>
            </View>
        </View>


    );
};


const style = StyleSheet.create({
    container: {
        backgroundColor: '#154cb1',
        flex: 1
    },

    viewContainer: {
        width: '75%',
        alignSelf: "center",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },


    textContainer: {
        justifyContent: 'center',
        marginBottom: 60,
        alignItems: "center"
    },

    headerTextLabelContainer: {
        flexDirection: 'row',
        justifyContent: "center"
    },

    headerTextLabel: {
        fontSize: 26,
        lineHeight: 40,
        color: '#eee',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: Font.MontserratBold,
    },


    textLabel: {
        lineHeight: 25,
        fontSize: 16,
        textAlign: 'center',
        fontFamily: Font.MontserratMedium,
        textShadowRadius: 6,
        color: '#eee',
        textShadowColor: GREY_COLOR
    },

    logoView: {
        flex: 0.4,
        width: "100%",
        height: "100%",
        justifyContent: 'center'
    },

    logoContainer: {
        width: "80%",
        height: "80%",
        alignSelf: 'center'
    },


    logo: {
        width: null,
        height: null,
        flex: 1,
        resizeMode: 'cover'
    },


    contentContainer: {
        flex: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },

    btnContainer: {
        width: '85%'
    },

    btn: {
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 9,
        borderWidth: 0,
    },

    btnOutline: {
        height: 50,
        borderWidth: 2,
        borderColor: 'rgba(21,76,177,0.41)',
        backgroundColor: '#154cb1'
    },

    btnText: {
        fontFamily: Font.MontserratSemiBold,
        color: '#eee',
        marginRight: 8
    },
    loginBtnText: {
        color: '#154cb1'
    },

    btnFilled: {
        backgroundColor: '#eee',
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },


});

export default WelcomeScreen;
