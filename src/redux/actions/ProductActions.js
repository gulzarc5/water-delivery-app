import axios from "axios";
import { url } from "../config";
import { FETCH_PRODUCTS, FETCH_SINGLE_PRODUCT, PRODUCT_FAILURE, PRODUCT_LOADING } from "../types"
import { timeoutPromise } from "../utils/Tools";

export const onProductFetch = () => {
    return async (dispatch) => {
        dispatch({ type: PRODUCT_LOADING });
        try {
            const response = await timeoutPromise(
                axios.get(`${url}/product/list?page=1`)
            );
            if (response.status !== 200) {
                dispatch({
                    type: PRODUCT_FAILURE,
                });
                throw new Error("Something went wrong!, can't get the products");
            }
            const resData = response.data.data;
            dispatch({
                type: FETCH_PRODUCTS,
                products: resData,
            });
        } catch (error) {
            throw error;
        }
    }
}