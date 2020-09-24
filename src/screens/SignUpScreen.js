import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    ScrollView,
    ToastAndroid
} from 'react-native'
import {Icon, Button} from 'react-native-elements';
import MainText from "../components/MainText";
import HeaderText from "../components/HeaderText";
import InputText from "../components/InputText";
import {AUTH_KEY, PRIMARY_COLOR, SECONDARY_COLOR} from "../utils/constants";
import AuthStyles from "../styles/AuthStyles";
import Spinner from "../components/Spinner";
import HttpService from "../../services/HttpService";
import {setLocalStorage, userAuthStatus, validateInput} from "../utils/helper";
import {CommonActions} from '@react-navigation/native';
import * as Joi from 'react-native-joi'


const SignUpScreen = ({navigation}) => {

    const [loader, setLoader] = useState(false);
    const [inputData, setInputData] = useState({
        "first_name": "",
        "mobile_number": "",
        "email": "",
        "password": ""
    });
    const [inputError, setInputError] = useState({
        "first_name": "",
        "mobile_number": "",
        "email": "",
        "password": ""
    });


    const schema = {
        // use label if you want to give friendly label name (optional)
        first_name: Joi.string()
            .regex(/^[a-zA-Z ]+$/)
            .required()
            .label('Name'),
        mobile_number: Joi.string()
            .required()
            .length(10)
            .label('Mobile No'),

        email: Joi.string()
            .required()
            .email()
            .trim(),

        password: Joi.string()
            .required()
            .min(3)
            .label('Password')
            .trim()
    };

    const autoLogin = async () => {
        const loginPayload = {...inputData};
        delete loginPayload.first_name;
        delete loginPayload.mobile_number;

        const res = await HttpService.post('/Account/login', inputData);
        console.log(res);
        if (!(res.data?.status === 'success')) return ToastAndroid.show(`Something went wrong...`);
        await setLocalStorage(AUTH_KEY, JSON.stringify(res.data));
        setLoader(false);
        navigation.dispatch(CommonActions.reset({
            index: 1,
            routes: [{name: userAuthStatus(res.data)}]
        }));
    };

    const handleSignUp = async () => {
        Keyboard.dismiss();
        setLoader(true);
        // Do the validation
        try {
            const result = Joi.validate(inputData, schema, {abortEarly: false, stripUnknown: true});
            console.log('Submitted Joi results : ', result);

            if (result.error) {
                const errors = {};
                for (let item of result.error.details)
                    if (item.type !== 'string.regex.base') errors[item.path] = item.message;
                    else {
                        errors[item.path] = item.context.key + ' must contain only letters';
                    }
                setLoader(false);
                return setInputError({...errors});
            }
            // if there is no error continue with sign up

            try {
                 const res = await HttpService.post('/Account/user_registration', inputData);
                ToastAndroid.show("Registration successful", ToastAndroid.SHORT);
            } catch (e) {
                const response = e.response;
                console.log('Error response ', response);
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
            // Registration is successful
            try {
                // Auto login
                await autoLogin();
            } catch (e) {
                setLoader(false);
                navigation.navigate('Login');
            }

        } catch (e) {
            setLoader(false);
            console.log("Error in signup", e);
            return ToastAndroid.show(`Something went wrong...`, ToastAndroid.LONG);
        } finally {
            if (loader) setLoader(false);
        }

    };

    const handleInputChange = (name, value) => {

        const inputErrors = {...inputError};
        const inputFieldCurr = {[name]: value};

        const errorMessage = validateInput(inputFieldCurr, schema);

        if (errorMessage && name === 'first_name' && errorMessage.indexOf('fails to match the required pattern') !== -1) {
            inputErrors[name] = 'Name must contain only letters';
        } else {
            if (errorMessage) inputErrors[name] = errorMessage;
            else delete inputErrors[name];

        }


        setInputError({...inputErrors});
        setInputData({...inputData, ...inputFieldCurr});
    };


    return (
        <KeyboardAvoidingView behavior="height" style={AuthStyles.container}>

            <ScrollView showsVerticalScrollIndicator={false} style={AuthStyles.authContainer}>

                <View style={AuthStyles.formContainer}>


                    <HeaderText style={AuthStyles.headerText}>Create an Account</HeaderText>


                    <InputText
                        onInputChange={handleInputChange}
                        placeholder='Enter Name'
                        errorMessage=''
                        name='first_name'
                        rightIcon={
                            <Icon
                                type='material-community'
                                name='rename-box'
                                size={24}
                                color={SECONDARY_COLOR}
                            />
                        }
                        value={inputData.first_name}
                        error={inputError.first_name}

                    />

                    <InputText
                        onInputChange={handleInputChange}
                        placeholder='Enter Mobile'
                        name='mobile_number'
                        errorMessage=''
                        rightIcon={
                            <Icon
                                type='octicon'
                                name='device-mobile'
                                size={24}
                                color={SECONDARY_COLOR}
                            />
                        }
                        value={inputData.mobile_number}
                        error={inputError.mobile_number}
                        keyboardType={"phone-pad"}
                        maxLength={10}
                    />

                    <InputText
                        onInputChange={handleInputChange}
                        placeholder='Enter email'
                        name='email'
                        errorMessage=''
                        rightIcon={
                            <Icon
                                type='entypo'
                                name='email'
                                size={24}
                                color={SECONDARY_COLOR}
                            />
                        }
                        value={inputData.email}
                        error={inputError.email}
                        keyboardType='email-address'

                    />

                    <InputText
                        onInputChange={handleInputChange}
                        placeholder='Enter Password'
                        errorMessage=''
                        name='password'
                        value={inputData.password}
                        error={inputError.password}
                        rightIcon={
                            <Icon
                                type='ionicon'
                                name='md-lock'
                                size={24}
                                color={SECONDARY_COLOR}
                            />
                        }
                        secureTextEntry
                        s/>


                    <Button
                        title="Submit     "
                        type='solid'
                        onPress={handleSignUp}
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
                    <MainText style={AuthStyles.authLabelMsg}>Already has an account ? </MainText>

                    <TouchableOpacity style={AuthStyles.btnFlip} onPress={() => navigation.navigate('Login')}>
                        <MainText style={AuthStyles.btnLabel}>
                            Signin
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

            {loader && <Spinner message='Please wait...'/>}


        </KeyboardAvoidingView>


    );
};

const style = StyleSheet.create({});

export default SignUpScreen;
