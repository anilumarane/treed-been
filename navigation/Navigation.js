import React, {useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {AUTH_KEY, PRIMARY_DARK_COLOR} from "../src/utils/constants";
import {StyleSheet} from "react-native";
import {Font} from "../src/utils/font";

import AuthNavigator from './AuthNavigator'
import SignUpScreen from "../src/screens/SignUpScreen";
import LoginScreen from "../src/screens/LoginScreen";
import RegistrationStatusScreen from "../src/screens/RegistrationStatusScreen";
import {setCurrNav} from "../store/actions/navs-actions";
import {connect} from "react-redux";
import WelcomeScreen from "../src/screens/WelcomeScreen";

const AppTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: PRIMARY_DARK_COLOR,
    },
};

const Navigation = (props) => {

    // Gets the current screen from navigation state
    const getActiveRouteName = state => {
        const route = state.routes[state.index];
        // console.log("mroute", route);

        if (route.state) {
            // Dive into nested navigators
            return getActiveRouteName(route.state);
        }

        return route.name;
    };

    const Stack = createStackNavigator();

    const routeNameRef = React.useRef();
    const navigationRef = React.useRef();

    console.log("my route", props.initRouteName);

    // if you want to route any parent from nested child just update the State first.
    return (
        <NavigationContainer
            theme={AppTheme}
            ref={navigationRef}
            onStateChange={state => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = getActiveRouteName(state);
                if (previousRouteName !== currentRouteName) {
                    // console.log('current route', currentRouteName)
                }
                props.setTitle(currentRouteName); // Setting to the redux
                // Save the current route name for later comparision
                routeNameRef.current = currentRouteName;
            }}
        >

            <Stack.Navigator
                headerMode='float'
                screenOptions={(navs) => {
                    return {
                        title: props.navTitle,
                        headerStyle: styles.headerStyle,
                        headerTintColor: '#eee',
                        headerTitleStyle: styles.headerTitleStyle
                    }
                }}
                initialRouteName={props.initRouteName}
            >
                <Stack.Screen options={{title: 'QuantaProfile'}} name="Welcome" component={WelcomeScreen}/>
                <Stack.Screen name="SignUp" component={SignUpScreen}/>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="SignUpStatus" options={{title: 'Status'}} component={RegistrationStatusScreen}/>
                <Stack.Screen name="AuthNavigator" component={AuthNavigator}/>

            </Stack.Navigator>

        </NavigationContainer>
    );

};


const mapDispatchToProps = dispatch => {
    return {
        setTitle: (title) => dispatch(setCurrNav(title)),
    };
};
const mapStateToProps = (state) => ({
    navTitle: state.nav.title,
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);


const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: PRIMARY_DARK_COLOR,
    },
    headerTitleStyle: {
        fontFamily: Font.MontserratSemiBold,
        marginLeft: 20
    },
});



