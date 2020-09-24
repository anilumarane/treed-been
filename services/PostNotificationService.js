import {Notifications,} from 'expo';
import * as Permissions from 'expo-permissions';
import HttpService from "./HttpService";
import {getAuth, getAuthHeaderObj, getLocalStorage, setLocalStorage} from "../src/utils/helper";
import {PUSH_TOKEN} from "../src/utils/constants";
import {ToastAndroid} from "react-native";


// Create a notification channel so we can add use categorize the notifications
const createNotificationChannel = async () => {
    if (Platform.OS === 'android') {
        await Notifications.createChannelAndroidAsync('comment-messages', {
            name: 'Comment Messages',
            sound: true,
            priority: 'max',
            vibrate: true,
        });
    }
};


export default async function registerForPushNotificationsAsync() {

    try{
        await createNotificationChannel();
    }catch (e) {
        Console.log('Error creating notification channel', e)
    }

    // If token already available in async storage no need to process further
    let token = await getLocalStorage(PUSH_TOKEN);
    console.log(PUSH_TOKEN, token);
    if (token) return;


    const perResponse = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    // Stop here if the user did not grant permissions
    console.log('notification permission :: ', perResponse);

    if (perResponse.status !== 'granted') {
        // alert('Please allow notification permission to receive notification!');
        return;
    }

    // Get the token that identifies this device
    token = await Notifications.getExpoPushTokenAsync();

    console.log('Expo push token', token);

    try {
        const header = await getAuthHeaderObj();
        const {user_id} = await getAuth();
        const res = await HttpService.post(
            'ExpoToken/expo_token',
            {
                "expo_token": token,
                "user_id": user_id
            },
            {headers: header}
        );

        console.log('token save response', res);

        if (res.data.status === 'success') {
            console.log("token send successfully");
            return await setLocalStorage(PUSH_TOKEN, token);
        }
    } catch (e) {
        console.log("Something went wrong while sending the token ");
        console.log(e.response);
        if (e.response.data?.error?.user_id[0] === 'expo token with this user id already exists.') {
            console.log("token saved successfully even it was already on server");
            return await setLocalStorage(PUSH_TOKEN, token);
        }


    }

}

