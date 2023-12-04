import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

const CartSummary = (props) => {    
    
    // const cartTotal = null;
    console.log(props.cartTotal);
    return (
        <View style={styles.cartValueBlock}>
            <Text style={styles.cartValueHeaderText}>Price Detail</Text>
           {props.cartTotal && (      
               <View>     
            <View style={styles.cartValuePriceBlock}>
                <View style={styles.cartValueInnerBlock}>
                    <Text>Cart Value</Text>
                    <Text>₹ {props.cartTotal.total_mrp}</Text>
                </View>
                {props.screenType == 2 && (
                    <View style={[styles.cartValueInnerBlock, { paddingBottom: 0, }]}>
                        <Text>Delivery Charges</Text>
                        <Text style={{ color: 'green' }}>{props.cartTotal.shipping_charge}</Text>
                    </View>
                )}
                <View style={styles.cartValueInnerBlock}>
                    <Text>Discount</Text>
                    <Text style={{ color: 'green' }}>- ₹ {props.cartTotal.total_mrp - props.cartTotal.total_amount}</Text>
                </View>
                <View style={styles.cartValueInnerBlock}>
                    <Text>Coin Used</Text>
                    <Text style={{ color: 'green' }}>- ₹ {props.cartTotal.coins}</Text>
                </View>
                {props.couponDiscount > 0 && (
                    <View style={styles.cartValueInnerBlock}>
                        <Text>Coupon Discount</Text>
                        <Text style={{ color: 'green' }}>- ₹ {props.couponDiscount}</Text>
                    </View>
                )}
                
            </View>
            {props.screenType == 2 && (
                <View style={styles.cartValueTotalBlock}>
                    <Text style={styles.cartValueTotalBlockText}>Total Amount</Text>
                    <Text style={styles.cartValueTotalBlockText}>₹ {(props.cartTotal.total_amount+props.cartTotal.shipping_charge)- (props.couponDiscount ?props.couponDiscount:0) - props.cartTotal.coins}</Text>
                </View>
            )}
            {props.screenType == 1 && (
                <View style={styles.cartValueTotalBlock}>
                    <Text style={styles.cartValueTotalBlockText}>Total Amount</Text>
                    <Text style={styles.cartValueTotalBlockText}>₹ {props.cartTotal.total_amount - (props.couponDiscount ?props.couponDiscount:0) - props.cartTotal.coins}</Text>
                </View>
            )}
            </View>
            )} 
        </View>
    )
}

export default CartSummary
