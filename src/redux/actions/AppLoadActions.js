import axios from "axios";
import { url } from "../config";
import { ON_APP_LOADED, ON_APP_LOADING, ON_APP_LOAD_FAILED } from "../types";
import { timeoutPromise } from "../utils/Tools";

export const onAppLoad = () => {
    return async (dispatch) => {
        dispatch({ type: ON_APP_LOADING });
        try {
            const response = await timeoutPromise(
                axios.get(`${url}/app/load/api`)
            );
            if (response.status !== 200) {
                dispatch({
                    type: ON_APP_LOAD_FAILED,
                });
                throw new Error("Something went wrong!, can't get the products");
            }
            const resData = response.data.data;
            dispatch({
                type: ON_APP_LOADED,
                payload: resData,
            });
        } catch (error) {
            throw error;
        }
    }
}