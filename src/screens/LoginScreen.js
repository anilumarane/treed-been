import React, {useState} from 'react';
import {
    View,
    Keyboard,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    ScrollView,
    ToastAndroid
} from 'react-native'
import HeaderText from "../components/HeaderText";
import InputText from "../components/InputText";
import {Button, Icon} from "react-native-elements";
import {AUTH_KEY, PRIMARY_COLOR, SECONDARY_COLOR} from "../utils/constants";
import MainText from "../components/MainText";
import AuthStyles from "../styles/AuthStyles";
import Spinner from "../components/Spinner";
import {CommonActions} from '@react-navigation/native';
import HttpService from "../../services/HttpService";
import {setLocalStorage, userAuthStatus, validateInput} from "../utils/helper";
import * as Joi from "react-native-joi";


const LoginScreen = ({navigation}) => {


    const [loader, setLoader] = useState(false);

    const [inputData, setInputData] = useState({
        "mobile_number": "",
        "password": "",
    });

    const [inputError, setInputError] = useState({
        "mobile_number": "",
        "password": "",
    });


    const schema = {
        mobile_number: Joi.string().required().length(10).label('Mobile No'),
        password: Joi.string().required().min(3).label('Password').trim()
    };

    const handleLogin = async () => {
        Keyboard.dismiss();
        setLoader(true);

        const result = Joi.validate(inputData, schema, {abortEarly: false, stripUnknown: true});
        console.log('Submitted Joi results : ', result);

        if (result.error) {
            const errors = {};
            for (let item of result.error.details)
                errors[item.path] = item.message;
            setLoader(false);
            return setInputError({...errors});
        }

        // if there is no error continue with login

        try {
            const res = await HttpService.post('/Account/login', inputData);
            console.log('login response', res);

            const user = res.data;

            await setLocalStorage(AUTH_KEY, JSON.stringify(user));
            setLoader(false);
            navigation.dispatch(CommonActions.reset({
                index: 1,
                routes: [{name: userAuthStatus(user)}]
            }));

        } catch (e) {
            const response = e.response;

            if (response.data?.status === 'failed') {
                try {
                    if ((response.status >= 400 && response.status < 500)) {
                        const bErrors = response.data;
                        delete bErrors['status'];
                        setInputError(bErrors);
                    } else {
                        ToastAndroid.show("Something went wrong ...", ToastAndroid.LONG)
                    }
                } catch (e) {
                    ToastAndroid.show("Something went wrong...", ToastAndroid.LONG)
                }
                return setLoader(false);
            }
        }

    };

    const handleInputChange = (name, value) => {
        const inputErrors = {...inputError};
        const inputFieldCurr = {[name]: value};

        const errorMessage = validateInput(inputFieldCurr, schema);

        if (errorMessage) inputErrors[name] = errorMessage;
        else delete inputErrors[name];

        setInputError({...inputErrors});
        setInputData({...inputData, ...inputFieldCurr});
    };


    return (
        <KeyboardAvoidingView behavior="height" style={AuthStyles.container}>


            <ScrollView showsVerticalScrollIndicator={false} style={AuthStyles.authContainer}>

                <View style={AuthStyles.formContainer}>


                    <HeaderText style={AuthStyles.headerText}>Welcome Back!</HeaderText>


                    <InputText
                        placeholder='Enter Mobile no.'
                        onInputChange={handleInputChange}
                        errorMessage=''
                        name='mobile_number'
                        rightIcon={
                            <Icon
                                type='octicon'
                                name='device-mobile'
                                size={24}
                                color={SECONDARY_COLOR}
                            />
                        }
                        keyboardType={"phone-pad"}
                        maxLength={10}
                        value={inputData.mobile_number}
                        error={inputError.mobile_number}
                    />

                    <InputText
                        placeholder='Enter Password'
                        errorMessage=''
                        name='password'
                        onInputChange={handleInputChange}
                        rightIcon={
                            <Icon
                                type='ionicon'
                                name='md-lock'
                                size={24}
                                color={SECONDARY_COLOR}
                            />
                        }
                        value={inputData.password}
                        error={inputError.password}
                        secureTextEntry
                    />


                    <Button
                        title="Login     "
                        type='solid'
                        onPress={handleLogin}
                        buttonStyle={AuthStyles.buttonStyle}
                        titleStyle={AuthStyles.titleStyle}
                        icon={
                            <Icon
                                type='ionicon'
                                name="ios-arrow-forward"
                                size={15}
                                color="white"
                            />
                        }
                        iconRight
                    />
                </View>


                <View style={AuthStyles.authFlipContainer}>
                    <MainText style={AuthStyles.authLabelMsg}>Don't have an account ? </MainText>

                    <TouchableOpacity style={AuthStyles.btnFlip} onPress={() => navigation.navigate('SignUp')}>
                        <MainText style={AuthStyles.btnLabel}>
                            Sign Up
                        </MainText>

                        <Icon
                            type='ionicon'
                            name='md-arrow-forward'
                            size={14}
                            color={PRIMARY_COLOR}
                        />

                    </TouchableOpacity>

                </View>


            </ScrollView>


            {loader && <Spinner message='Please wait....'/>}


        </KeyboardAvoidingView>


    );

};

const style = StyleSheet.create({});


export default LoginScreen;
