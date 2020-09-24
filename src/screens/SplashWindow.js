import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, ActivityIndicator} from 'react-native'
import Navigation from "../../navigation/Navigation";
import {getAuth, userAuthStatus} from "../utils/helper";
import * as ExpoFont from "expo-font";
import FontObj from "../utils/font";
import Spinner from "../components/Spinner";
import {SECONDARY_COLOR} from "../utils/constants";

const SplashWindow = () => {

    const [showSplash, setSplash] = useState(true);
    const [fontLoading, setFontLoad] = useState(true);
    const [initRouteName, setInitRouteName] = useState('Welcome');


    useEffect(() => {

            // Loading custom font
            ExpoFont.loadAsync(FontObj).then((success, error) => {
                setFontLoad(false);
            });


            getAuth().then((user, error) => {
                if (user) {
                    setInitRouteName(userAuthStatus(user));
                    console.log("Logged in already", user);
                }
                setSplash(false);
            });
        },
        []);


    if (showSplash || fontLoading) return (
        <View style={style.container}>
            <ActivityIndicator accessibilityLabel='text' size={48} color={SECONDARY_COLOR}/>
        </View>
    );

    return (
        <Navigation initRouteName={initRouteName}/>
    )


};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default SplashWindow;
