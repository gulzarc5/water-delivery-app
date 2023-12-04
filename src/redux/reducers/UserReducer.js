import { EXISTING_USER, NEW_USER, ON_ERROR, OTP_SEND, USER_AUTH } from "../types";

const initialState = {
    // products: [],
    // isFirstOpen: false,
    // isLoading: false,
    data: '',
    isOtpSend: false,
    user: ''
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case OTP_SEND:
            return {
                ...state,
                data: action.payload,
                isOtpSend: true,
            }
        case EXISTING_USER:
            return {
                ...state,
                data: action.payload
            }
        case NEW_USER:
            return {
                ...state,
                data: action.payload
            }
        case ON_ERROR:
            return {
                ...state,
                appError: action.payload
            }
        case USER_AUTH:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}