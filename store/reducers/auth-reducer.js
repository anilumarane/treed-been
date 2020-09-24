import {SET_AUTH} from "../actions/actionTypes";

const initialState = {
    auth : false
};


const reducers = (state = initialState, action) => {
    switch (action.type) {

        case SET_AUTH:
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
