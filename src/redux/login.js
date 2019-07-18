import * as ActionTypes from './actionTypes';

export const Login = (state = {
    isLoading: false,
    errMess: null,
    logins: [],
    successMess: null
}, action) => {
    switch (action.type) {

        case ActionTypes.LOGIN_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, logins: [] };

        case ActionTypes.LOGIN_LOADING:
                return { ...state, isLoading: true, errMess: null, logins: [] };

        case ActionTypes.LOGIN_SUCCESS:
            return { ...state, isLoading: false, errMess: null, successMess: action.payload}        
        default:
            return state;
    }
}