import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import CustomText from '../../components/UI/CustomText';
import { baseUrl } from '../../redux/config';
import { styles } from './style'

const ProductList = ({
    products
}) => {
    const navigation = useNavigation();
    return (
        <>
            {products && products.length === 0 ? (
                <CustomText style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    No Products Found!
                </CustomText>
            ) : (
                products && products.map(product => {
                    return (
                        <TouchableOpacity key={product.product_size_id} activeOpacity={.9} style={styles.productItem} onPress={() => navigation.navigate('ProductSingleScreen', { product: product })}>
                            <View style={styles.productImage}>
                                <Image
                                    source={{ uri: product.image }}
                                    style={{ width: 90, height: 90, resizeMode: 'contain' }}
                                />
                            </View>
                            <View style={{ padding: 10, alignItems: 'center' }}>
                                <Text style={styles.productName} numberOfLines = { 1 }>{product.name}</Text>                                
                                <Text style={{fontSize: 15, color: '#333', fontWeight: '500'}}>Size : {product.size_name}</Text>
                                <View style={styles.cartPrice}>
                                    <Text style={styles.itemPrice}>
                                        <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#aaa' }}>₹{product.mrp}</Text> ₹{product.price} &nbsp;
                                        </Text>
                                    <View style={styles.cartPriceDiscount}>
                                        <Text style={styles.cartPriceDiscountText}>{product.product_discount}% off &nbsp;</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })
            )}
        </>
    );
}

export default ProductList
