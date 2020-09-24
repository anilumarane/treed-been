import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid
} from 'react-native'
import GlobalStyles from '../styles/GlobalStyles'
import {Icon, Image} from "react-native-elements";
import {AUTH_KEY, PRIMARY_COLOR} from "../utils/constants";
import MainText from "../components/MainText";
import {Font} from "../utils/font";
import AuthStyles from "../styles/AuthStyles";
import HttpService from "../../services/HttpService";
import {getAuth, handleLogout, setLocalStorage} from "../utils/helper";
import {CommonActions} from '@react-navigation/native';
import Spinner from "../components/Spinner";

const RegistrationStatusScreen = ({navigation}) => {

    const [loader, setLoader] = useState(false);
    let logoutProcessing = false;

    const handleRetry = async () => {

        try {

            setLoader(true);

            const user = await getAuth();
            if (!user.user_id) return await handleLogout(navigation);

            const res = await HttpService.get(`/Account/aproval_status/${user.user_id}`);
            console.log('Verification Status for user id ', user.user_id, res);

            const {data} = res;

            if (!(data?.status === 'success')) return ToastAndroid.show(`Something went wrong....`, ToastAndroid.LONG);

            if (!data?.result?.approvalstatus) return ToastAndroid.show('Verification is still pending...', ToastAndroid.SHORT);

            user.approvalstatus = true;
            console.log('User verified successfully');

            await setLocalStorage(AUTH_KEY, JSON.stringify(user));
            navigation.dispatch(CommonActions.reset({
                index: 1,
                routes: [{name: 'AuthNavigator'}]
            }));

        } catch (e) {
            console.log('Error occurred while checking registration ', e)
        } finally {
            setLoader(false);
        }
    };


    return (
        <View style={[GlobalStyles.flexCenter, style.container]}>

            <View style={style.contentWrap}>
                <Image
                    source={require('../assets/image/progress-illustration.png')}
                    style={{width: 220, height: 200, zIndex: 5}}
                />
            </View>

            <MainText style={style.text}>
                Your registration approval process is in progress. Please try again later
            </MainText>


            <View style={style.btnContainer}>

                <TouchableOpacity style={[AuthStyles.btnFlip, style.retryBtn]} onPress={handleRetry}>
                    <Icon
                        type='material-community'
                        name='reload'
                        size={14}
                        color={PRIMARY_COLOR}
                    />
                    <MainText style={style.btnLabel}>
                        Retry
                    </MainText>

                </TouchableOpacity>


                <TouchableOpacity
                    style={[AuthStyles.btnFlip, style.logoutBtn]}
                    onPress={() => {
                        if (!logoutProcessing) {
                            logoutProcessing = true;
                            handleLogout(navigation)
                        }
                    }}
                >
                    <Icon
                        type='material-community'
                        name='logout'
                        size={14}
                        color={'tomato'}
                    />


                    <MainText style={[style.btnLabel, style.logoutBtnLabel]}>
                        Logout
                    </MainText>


                </TouchableOpacity>
            </View>

            {loader && <Spinner message='Please wait....'/>}

        </View>


    );

};

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: '20%',
        backgroundColor: 'white',
    },
    text: {
        marginTop: 20,
        color: PRIMARY_COLOR,
        opacity: 0.5,
        textAlign: 'center',
        fontSize: 15,
        lineHeight: 24,
        fontFamily: Font.MontserratSemiBold
    },
    retryBtn: {
        marginRight: 15
    },

    logoutBtn: {},


    btnContainer: {
        marginTop: 20,
        flexDirection: 'row'

    },

    btnLabel: {
        paddingBottom: 1,
        fontFamily: Font.MontserratSemiBold,
        color: PRIMARY_COLOR,
        marginLeft: 4
    },

    logoutBtnLabel: {
        color: 'tomato'
    },

    contentWrap: {}

});

export default RegistrationStatusScreen;
