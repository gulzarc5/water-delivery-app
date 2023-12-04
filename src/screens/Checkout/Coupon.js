 import React, { useContext,useState } from 'react';
 import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
 import styles from './style';

 import { AuthContext } from '../../components/navigation/StackNavigator';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import axios from 'axios';

 

 
const CouponScreen = ({coupons,onCouponApply,setIsCouponProgress,setCouponDiscount,totalAmount}) => {    
  const {authContext, loginState,dispatch} = useContext(AuthContext);

  const couponCheck = async(coupon) => {

    setIsCouponProgress(true);
    const user = await AsyncStorage.getItem('user');
    const modifiedUser = JSON.parse(user);
    axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
    const response = await axios.get('order/coupon/apply/'+coupon.coupon);

    if(response.data.status === true) {
      console.log(response.data);
      onCouponApply(coupon);
      setCouponDiscount(response.data.discount);
      setIsCouponProgress(false);
    }else if(response.data.error_code){     
      setIsCouponProgress(false);
      setData({...data, errors: response.data.error_message})   
    }else{      
      setIsCouponProgress(false);
      alert(response.data.message);
    }
    
  }
  return (    
    <View>           
      <View style={styles.container}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={styles.addressText}>Coupons</Text>
        </View>
        {coupons && coupons.length > 0 && coupons.map((coupon, index) => {
            return(
            <View style={styles.addressBlock} key={coupon.id}>
              <View style={{flexDirection:'row'}}>
                <View style={{width:'90%',paddingRight:3}}>
                  <Text style={internalstyles.name}>{coupon.coupon}</Text>
                  <Text style={internalstyles.addesss}>{coupon.description} </Text>
                </View>
                <TouchableOpacity style={{width:'10%'}}>
                  <Text style={[styles.span, {fontWeight:'700'}]} onPress={() =>couponCheck(coupon)}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
      })}
      </View>
    </View>
  );
};
const internalstyles = StyleSheet.create({
  name: {fontSize:17,fontWeight:'700',color:'#444',letterSpacing:1},
  addesss: {fontSize:14,fontWeight:'500',color:'#777'},
  defaultbtn: {backgroundColor:'#48BBEC',width:'55%',alignItems:'center',paddingVertical: 2,marginVertical:8,borderRadius:3},
  addaddressbtn: {marginBottom:5,},
  defaultbtnText: {color:'#fff'},
})
export default CouponScreen;
