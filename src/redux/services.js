import * as ActionTypes from './actionTypes';

export const Services = (state = {
    errMess: null,
    services: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_SERVICES:
            return { ...state, isLoading: false, errMess: null, services: action.payload };

        case ActionTypes.SERVICES_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, comments: [] };

        case ActionTypes.ADD_SERVICE:
            var service = action.payload;
            return { ...state, comments: state.comments.concat(service) };

        case ActionTypes.SERVICES_LOADING:
                return { ...state, isLoading: true, errMess: null, services: [] };

        default:
            return state;
    }
}