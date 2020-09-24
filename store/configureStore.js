import AuthReducer from './reducers/auth-reducer'
import NavReducer from './reducers/nav-reducers'
import thunk from 'redux-thunk'
import {applyMiddleware, combineReducers, createStore, compose} from "redux";


const rootReducers = combineReducers({
    auth: AuthReducer, //  auth is a reducer
    nav: NavReducer, //  nav is a reducer
});

let composeEnhancers = compose;


if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // REDUX DEBUGGER INTEGRATION
    // @ts-ignore
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
} else {
    // production code
}


const configureStore = () => {
    return createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)))
};

export default configureStore

