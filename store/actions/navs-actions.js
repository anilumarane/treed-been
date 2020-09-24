import {SET_NAV} from "./actionTypes";

export const setCurrNav = (navTitle) => {
    return ((dispatch, state) => {

        dispatch({
            type: SET_NAV,
            payload: {
                title: navTitle
            }
        });
    });

};
