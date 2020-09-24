import {SET_AUTH} from './actionTypes'
import { AsyncStorage } from 'react-native';



// Check Async Storage to retrieve logged in
let isLoggedIn = async () => {
    try {
        const value = await AsyncStorage.getItem('auth');

        if (value !== null) {
            // value previously stored
            return true
        }
    } catch (e) {
        // error reading value
    }

};


export const setAuth = () => {
    return ((dispatch, state) => {

        const result = isLoggedIn();
        dispatch({
            type: SET_AUTH,
            payload: {
                auth: result
            }
        });
    });

};

