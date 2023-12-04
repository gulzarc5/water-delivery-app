
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native'
axios.defaults.baseURL = 'https://pyaas.webinfoghy.co.in/public/api';
const CartItem = (cartList) => {
    const [cartData, setCartData] = useState(null);
    useEffect(() => {
        setCartData(cartList.cartList);
      }, [])
    return (
        <View>
            {(
                cartData && cartData.map(product => {
                    return (
                        <Text>product</Text>
                    )
                })
            )}
        </View>
    )
}

export default CartItem
