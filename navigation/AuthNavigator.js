import React, {useEffect, useState} from "react";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {PRIMARY_BACKGROUND_COLOR, PRIMARY_DARK_COLOR} from "../src/utils/constants";
import HomeScreen from "../src/screens/HomeScreen";
import NotificationsScreen from "../src/screens/NotificationsScreen";
import ContactUsScreen from "../src/screens/ContactUsScreen";
import {Font} from '../src/utils/font'
import {StyleSheet} from "react-native";
import {setCurrNav} from "../store/actions/navs-actions";
import {connect} from "react-redux";
import {TouchableOpacity} from 'react-native';
import {Notifications} from "expo";
import registerPushNotification from "../services/PostNotificationService";
import {Icon} from "react-native-elements";
import {DrawerActions} from '@react-navigation/native';
import PrivacyAndTermsScreen from "../src/screens/PrivacyAndTermsScreen";
import {getAuth, handleLogout, handleUserApprovalVerification, onAdmin} from "../src/utils/helper";
import SubscriptionScreen from "../src/screens/SubscriptionScreen";
import CreateCommentScreen from "../src/screens/admin/CreateCommentScreen";
import CreatePostScreen from "../src/screens/admin/CreatePostScreen";

const AuthNavigators = ({navigation}) => {

    const Drawer = createDrawerNavigator();
    const [isAdmin, setAdmin] = useState(false);
    let logoutProcessing = false;


    // Notification handling
    useEffect(
        () => {

            handleUserApprovalVerification(navigation).then((success, error) => {
                if (error) return console.log('Error verifying user approval', error);
            });

            onAdmin().then((success, error) => setAdmin(success));

            // Registering the App for notification and listening for notification events

            registerPushNotification().then((success, error) => {
                if (error) console.log('Error while registering push notification');
            });

            // Handle notifications that are received or selected while the app
            // is open. If the app was closed and then opened by tapping the
            // notification (rather than just tapping the app icon to open it),
            // this function will fire on the next tick after the app starts
            // with the notification data.
            Notifications.addListener(onNotificationArrival);
        },
        []
    );

    const onNotificationArrival = (notification) => {
        try {
            console.log('You have received new notification ::::');
            const data = notification.data;
            navigation.dispatch(DrawerActions.jumpTo('Notifications'));
            console.log('notification received', notification);
        } catch (e) {
            console.log('Something went wrong while opening notification', e);
        }
    };


    const renderAdminDrawer = () => {
        return (
            <>
                <Drawer.Screen name="Create Post" component={CreatePostScreen}/>
                <Drawer.Screen name="Create Comment" component={CreateCommentScreen}/>
            </>
        );
    };

    const onLogout = async () => {
        if (logoutProcessing) return;
        logoutProcessing = true;
        await handleLogout(navigation);
        logoutProcessing = false;
    };


    navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity
                style={styles.menuIconContainer}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                <Icon
                    name='menu'
                    color='white'
                    size={26}
                    type='material'
                />
            </TouchableOpacity>
        ),
    });


    return (
        <Drawer.Navigator
            drawerType='front'
            initialRouteName="Home"
            drawerStyle={{
                backgroundColor: PRIMARY_BACKGROUND_COLOR,
                padding: 0,
                alignItems: 'stretch',
            }}
            screenOptions={(navs) => {
                // console.log('curr nav', navs);
            }}

            drawerContent={props => (

                // Adding extra items to the side drawer other than screen
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} labelStyle={styles.drawerItemLabelStyle}/>
                    <DrawerItem
                        label="Logout"
                        labelStyle={styles.drawerItemLabelStyle}
                        onPress={onLogout}

                    />
                </DrawerContentScrollView>
            )}
        >

            {
                isAdmin && renderAdminDrawer()
            }

            <Drawer.Screen name="Home" title='Home' component={HomeScreen}/>
            <Drawer.Screen name="Notifications" component={NotificationsScreen}/>
            <Drawer.Screen name="Subscription" component={SubscriptionScreen}/>
            <Drawer.Screen name="Contact Us" component={ContactUsScreen}/>
            <Drawer.Screen name="Privacy & Terms" component={PrivacyAndTermsScreen}/>

        </Drawer.Navigator>
    );
};


const styles = StyleSheet.create({
    drawerItemLabelStyle: {
        fontFamily: Font.MontserratSemiBold,
        color: PRIMARY_DARK_COLOR,
    },
    menuIconContainer: {
        marginLeft: 25
    }
});


const mapDispatchToProps = dispatch => {
    return {
        setTitle: (title) => dispatch(setCurrNav(title)),
    };
};

export default connect(null, mapDispatchToProps)(AuthNavigators);
