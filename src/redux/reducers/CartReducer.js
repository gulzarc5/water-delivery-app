import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cart } from "../../models/Cart";
import { ADD_CART, CART_FAILURE, CART_LOADING, DES_CART_QUANTITY, FETCH_CART, REMOVE_FROM_CART, RESET_CART } from "../types";
const emptyCart = {
    items: [],
};
const initialState = {
    data: '',
    isLoading: false,
};

const findIndex = (cartList, id) => {
    const index = cartList.findIndex((cart) => {
        return cart.item.product_id === id;
    });
    return index;
};
export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case CART_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        case FETCH_CART:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
            };

        case ADD_CART:
            const id = action.cartItem.product.product_id;
            if (cartList.length !== 0) {
                const index = findIndex(cartList, id);
                if (index >= 0) {
                    cartList[index] = new Cart(
                        action.cartItem,
                        +cartList[index].quantity + 1
                    );
                } else {
                    const newItem = new Cart(action.cartItem, 1);
                    cartList.push(newItem);
                }
            } else {
                const newItem = new Cart(action.cartItem, 1);
                cartList.push(newItem);
            }
            AsyncStorage.setItem('cart', JSON.stringify({ cartList }));
            return {
                ...state,
                cartItems: { ...state.cartItems },
                isLoading: false,
            };
        case REMOVE_FROM_CART:
            const { itemId } = action;
            const indexItem = findIndex(cartList, itemId);
            cartList.splice(indexItem, 1);
            return {
                ...state,
                cartItems: { ...state.cartItems },
                isLoading: false,
            };
        case DES_CART_QUANTITY:
            const { cartItemId } = action;
            const index = findIndex(cartList, cartItemId);
            cartList[index].quantity = +cartList[index].quantity - 1;
            return {
                ...state,
                cartItems: { ...state.cartItems },
                isLoading: false,
            };
        case RESET_CART:
            state.cartItems.items = [];
            return {
                ...state,
                cartItems: { ...state.cartItems },
                isLoading: false,
            };
    }
    return state;
};