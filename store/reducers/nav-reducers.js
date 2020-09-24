import {SET_NAV} from "../actions/actionTypes";

const initialState = {
    title : null
};


const reducers = (state = initialState, action) => {
    switch (action.type) {

        case SET_NAV:
            return {
                ...state,
                ...action.payload
            };

        default:
            break;
    }
    return state;
};

export default reducers
