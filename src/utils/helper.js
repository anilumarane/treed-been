import {AsyncStorage, Linking} from 'react-native';
import {AUTH_KEY, PUSH_TOKEN} from "./constants";
import HttpService from "../../services/HttpService";
import * as Joi from "react-native-joi";
import strftime from "./time";

export const getCurrStrTime = (timeStamp) => {

    const date = timeStamp ? new Date(timeStamp) : new Date();

    return strftime('%A, %b %e, %l:%M %p', date)

};


export const getLocalStorage = async (key) => {
    return await AsyncStorage.getItem(key);
};


export const setLocalStorage = async (key, data) => {
    return await AsyncStorage.setItem(key, data.toString());
};


export const deleteLocalStorage = async (key) => {
    return await AsyncStorage.removeItem(key)
};

export const getAuth = async () => {
    let user = await AsyncStorage.getItem(AUTH_KEY);
    console.log("User at auth", user);
    if (!user) return null;
    user = JSON.parse(user);
    if (user?.status) return user;
};


export const openLink = (url) => {

    Linking.canOpenURL(url)
        .then(supported => {
            if (!supported) {
                console.log('Device doesn\'t Support this feature...', url);
            } else {
                return Linking.openURL(url);
            }
        })

};


export const userAuthStatus = user => user?.approvalstatus ? 'AuthNavigator' : 'SignUpStatus';


export const getAuthHeaderObj = async () => {
    const auth = await getAuth();
    try {
        return {
            'Authorization': `Token ${auth.token}`
        }
    } catch (e) {
        console.log('No authHeader Found', e);
        return {}
    }

};


export const handleLogout = async (navigation) => {
    try {

        const expo_token = await getLocalStorage(PUSH_TOKEN);

        // If expo token is available delete the expo token first
        if (expo_token) {
            const {user_id} = await getAuth();
            const header = await getAuthHeaderObj();
            try {
                const post = await HttpService.post(
                    `/Account/logout_view/${user_id}`,
                    {},
                    {
                        headers: header
                    }
                );
                console.log('Token deleted successfully....')
            } catch (e) {
                console.log('Something went wrong while logging out the user.', e.response);
            }
        }
        await AsyncStorage.clear();
        navigation.replace('Welcome');
    } catch (e) {
        console.log('Error while logging out', e);
    }


};


// Verifying user is approved or not
export const handleUserApprovalVerification = async (navigation) => {
    const {user_id} = await getAuth();
    const res = await HttpService.get(`/Account/aproval_status/${user_id}`);

    console.log('Verification Status for user id ', user_id, res);

    if (!(res.data.status === 'success')) return;
    if (res.data?.result?.approvalstatus) return;

    alert('Please verify your account again.....');
    await handleLogout(navigation);
};


// Validating input using Joi (Only validating one input at a time)
export const validateInput = (input, schema) => {
    const inputKey = Object.keys(input)[0];
    const subSchema = {[inputKey]: schema[inputKey]};
    console.log('Schema', input, subSchema);
    const result = Joi.validate(input, subSchema, {allowUnknown: true});
    return result.error ? result.error.details[0].message : null;
};


export const onAdmin = async () => {
    const {is_admin} = await getAuth();
    return is_admin;
};
