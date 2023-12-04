import { combineReducers } from "redux";
import { cartReducer } from "./CartReducer";
import { userReducer } from "./UserReducer";
import { productReducer } from './ProductReducer';
import { appLoadReducer } from './AppLoadReducer';
export const rootReducer = combineReducers({
    cartReducer,
    userReducer,
    productReducer,
    appLoadReducer
})