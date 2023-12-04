import { FETCH_PRODUCTS, FETCH_SINGLE_PRODUCT, PRODUCT_FAILURE, PRODUCT_LOADING } from "../types";
import { FIRST_OPEN } from "./checkFirstTime";

const initialState = {
    products: [],
    isFirstOpen: false,
    isLoading: false,
}
export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case PRODUCT_FAILURE:
            return {
                ...state,
                isLoading: false
            }
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: [...action.products],
                isLoading: false
            }
        case FIRST_OPEN: {
            return {
                ...state,
                isFirstOpen: true,
            };
        }
        default:
            return state;
    }
}