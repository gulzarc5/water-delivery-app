import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
import { ToastAndroid } from "react-native";
import { url } from "../config"
import { EXISTING_USER, NEW_USER, ON_ERROR, OTP_SEND, USER_AUTH } from "../types";

export const onUserOtpSend = ({ mobile }) => {

    return async (dispatch) => {
        try {
            const response = await axios.post(`${url}/user/otp/send`, { mobile });
            if (response.data.status == true) {
                ToastAndroid.showWithGravity(
                    response.data.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
                dispatch({ type: OTP_SEND, payload: response.data })
            } else {
                alert('Error logging');
            }
        } catch (error) {
            dispatch({ type: ON_ERROR, payload: error });
        }
    }
}

export const onOtpVerify = (mobile, text) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${url}/user/otp/verify`, { mobile: mobile, otp: text })
            if (response.data.message === 'Otp Is Invalid') {
                ToastAndroid.showWithGravity(
                    response.data.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            } else if (response.data.status === false) {
                ToastAndroid.showWithGravity(
                    response.data.error_message.otp[0],
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            } else if (response.data.data.status === true) {
                // saveDataToStorage('user', resData);
                if (response.data.data.api_token) {
                    dispatch({ type: EXISTING_USER, payload: response.data.data });
                } else {
                    // dispatch({type: NEW_USER, payload:response.data.data});
                }
            }
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
            dispatch({ type: ON_ERROR, payload: error });
        }
    }
}

export const isFirstOpen = () => {
    return async (dispatch) => {
        try {
            const firstOpen = await AsyncStorage.getItem('users');
            dispatch({ type:USER_AUTH, payload:firstOpen });
        } catch (error) {
            console.warn(error);
        }
    }
}
