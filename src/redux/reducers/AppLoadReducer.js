import { ON_APP_LOADED, ON_APP_LOADING, ON_APP_LOAD_FAILED } from "../types";
import { FIRST_OPEN } from "./checkFirstTime";

const initialState = {
    data: {},
    isFirstOpen: false,
    isLoading: false,
}
export const appLoadReducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_APP_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case ON_APP_LOAD_FAILED:
            return {
                ...state,
                isLoading: false
            }
        case ON_APP_LOADED:
            return {
                ...state,
                data: {...action.payload},
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