import React, {useEffect, useState} from 'react';
import FontObj from './src/utils/font'
import * as ExpoFont from 'expo-font';
import SplashWindow from "./src/screens/SplashWindow";
import configureStore from "./store/configureStore";
import {Provider} from "react-redux";



const store = configureStore();

// Redux Provider
const reduxApp = () => (
    <Provider store={store}><App/></Provider>
);

const App = (props) => {

    return (
        <SplashWindow/>
    )

};


export default reduxApp;




