import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ToastAndroid } from "react-native";
import { url } from "../config";
import { ADD_CART, CART_FAILURE, CART_LOADING, FETCH_CART } from "../types";
import { timeoutPromise } from "../utils/Tools";

export const addToCart = (product, isJar) => {
    return async (dispatch) => {
        try {
            const data = {
                product_id: product.product.product_id,
                quantity: 1,
                is_jar: isJar ? 1 : 2,
            }
            const user = await AsyncStorage.getItem('users');
            const modifiedUser = JSON.parse(user);
            const token = modifiedUser.api_token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            const response = await timeoutPromise(
                axios.post(`${url}/cart/add`, data)
            );
            if (response.data.status !== true) {
                dispatch({
                    type: CART_FAILURE,
                });
                throw new Error("Something went wrong!, can't get the products");
            }
            const resData = response.data;
            if (response.data.status == true) {
                ToastAndroid.showWithGravity(
                    response.data.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            }
            // dispatch({
            //     type: FETCH_CART,
            //     products: resData,
            // });
        } catch (error) {
            console.warn(error);
        }
    }
}

export const fetchCart = () => {
    return async (dispatch) => {
        const emptyCart = {
            items: [],
        };
        dispatch({
            type: CART_LOADING,
        });
        try {
            const user = await AsyncStorage.getItem('users');
            console.warn(user);
            const modifiedUser = JSON.parse(user);
            const token = modifiedUser.api_token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            const response = await timeoutPromise(
                axios.get(`${url}/cart/list`)
            );
            if (response.data.status !== true) {
                dispatch({
                    type: CART_FAILURE,
                });
                throw new Error("Something went wrong!, can't get the products");
            }
            const resData = response.data;
            if (response.data.status == true) {
                dispatch({ type: FETCH_CART, payload: resData.data });
            }
        } catch (error) {
            console.warn(error);
        }
    }
}

export const removeFromCart = (product) => {
    return async (dispatch) => {
        const user = await AsyncStorage.getItem('users');
        const modifiedUser = JSON.parse(user);
        const token = modifiedUser.api_token;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await timeoutPromise(
            axios.post(`${url}/cart/delete/${product.cart_id}`, data, { headers: headers })
        );
    }
}