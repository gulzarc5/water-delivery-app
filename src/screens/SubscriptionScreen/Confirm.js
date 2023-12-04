/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState } from 'react';
 import { useNavigation } from '@react-navigation/native';
 import { ImageBackground, TextInput, AppRegistry, StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Image, Button, Pressable,  } from 'react-native';
 import styles from './style';
 import  Mainstyles from '../../assets/style';
 import Entypo from 'react-native-vector-icons/Entypo';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import HeaderComponent from '../../components/CommonScreen/NoTitleHeader'
 import LinearGradient from 'react-native-linear-gradient';
//  import * as Animatable from 'react-native-animatable';
 
 
//  MyCustomComponent = Animatable.createAnimatableComponent(MyCustomComponent);
 
 const LoginScreen = ({route,navigation}) => {  
   console.log(route.params.data.data.order);  
  const order = route.params.data.data.order;
  const shippingAddress = route.params.data.data.order.shipping_address;
   
  return (
   
    <View style={styles.container}>        

      <View style={{alignItems:'center',paddingTop:10,}}>
        <Image 
          source={require('../../assets/img/check-svgrepo-com.png')}
          style={{width:90,height:90,resizeMode:'cover',paddingVertical:30}}
        />
        {/* <Animatable.Text animation="zoomInUp">Zoom me up, Scotty</Animatable.Text> */}
        <Text style={{alignItems:'center',paddingTop:10,marginBottom:10,fontWeight:'700',fontSize:35,color:'#228b22'}}>ORDER PLACED</Text>
      </View>

      {/* prodict Item */}        
      <Text style={styles.addressText}>Membership</Text>
      <View style={styles.cartItem}>
        <TouchableOpacity
          activeOpacity={.9}
          onPress={() =>navigation.navigate('MyMembership')}
        >            
          <View style={styles.PaymentInner}>  
            <View style={internalstyles.productBlock}>
              <View style={internalstyles.productCompanyBlock}><Text style={[internalstyles.productCompany, {backgroundColor:'#C99738',}]}>{order.plan_name}</Text></View>
              <Text style={[internalstyles.productName, {color:'#C99738',}]}>{order.brand}</Text>
              <Text style={internalstyles.productQuantity}>Duration {order.plan_duration} Days</Text>
              <Text style={{fontSize: 12,fontWeight:"700",color:'#000', textAlign:'left'}}>
                Qty: <Text style={{fontWeight:"500"}}>{order.quantity}</Text> &nbsp;|&nbsp; 
                Total Bottle: <Text style={{fontWeight:"500"}}> {order.total_order} Bottles </Text>                
              </Text>
            </View> 
          </View> 
        </TouchableOpacity>
        <View style={{flexDirection:'row',borderTopWidth:1,borderColor:'#eee',paddingTop:5,marginTop:5}}>
          <TouchableOpacity style={{width:'100%',alignItems:'center'}}
            onPress={() => navigation.navigate('MyMembership')}
          >
            <Text style={styles.span}>Order Detail</Text>
          </TouchableOpacity>
        </View>
      </View>        
        
      {/* Points Block */}
      <LinearGradient colors={['#36d1dc', '#5b86e5']} style={internalstyles.pointsblock}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text style={internalstyles.pointsText}>Subscription Start From  : {order.plan_start_date}</Text>
        </View>
      </LinearGradient>

      {/* Delivery Address */}
      <Text style={styles.addressText}>Delivery Information</Text>
      <View style={styles.addressBlock}>
          <Text style={{color:'#2c69bc',fontWeight:'700',fontSize:15,marginBottom:2}}>{shippingAddress.name}</Text>
          <Text style={{fontSize:14,marginBottom:-2}}>{shippingAddress.main_location_name}, {shippingAddress.sub_location_name}- {shippingAddress.pin}</Text>
          <Text style={{fontSize:14,marginBottom:-2}}>{shippingAddress.flat_no} , {shippingAddress.address_one},</Text>
          <Text style={{fontSize:14,marginBottom:-2}}>{shippingAddress.landmark}</Text>
          <Text style={{fontSize:14,marginBottom:-2}}><Text style={{color:'#777',fontSize:13}}>Mobile :</Text> {shippingAddress.mobile}</Text>
      </View>

      {/* Continue Shoping */}
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <TouchableHighlight style={internalstyles.defaultbtn} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={internalstyles.defaultbtnText}>Continue Shoping</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
const internalstyles = StyleSheet.create({
  name: {fontSize:18,fontWeight:'700',color:'#333'},
  addesss: {fontSize:14,fontWeight:'500',color:'#777'},
  defaultbtn: {backgroundColor:'#48BBEC',width:'55%',alignItems:'center',paddingVertical: 10,marginVertical:8,borderRadius:3},
  addaddressbtn: {marginBottom:5,},
  defaultbtnText: {color:'#fff'},

  pointsblock: {borderWidth: 1,borderColor: '#ddd',borderRadius:10,padding: 10,width:'100%',marginBottom: 10,backgroundColor:'#fff',marginBottom:20},
  pointsText: {fontSize:15,paddingLeft:10,flexDirection:'column',color:'#fff'},

  cartSection: {backgroundColor:'#eee', shadowColor: "#000", shadowOffset: {width: 0, height: 4,}, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 8},
  cartBlock: {flexDirection:'row',flexWrap:'wrap',borderRadius:5,},
  cartItem: {flexDirection:'column',width:"100%",paddingBottom:10},
  cartImage: {marginTop: 5,marginBottom:0,flexDirection:'row',justifyContent:'space-between'},
  cartName: {fontSize: 16,color:'#333',fontWeight:'500',marginBottom:-2},
  cartPrice: {textAlign:'left',marginTop:10,marginBottom:10,flexDirection:'row'},
  itemPrice: {fontSize:18,fontWeight:'700'},
  cartPriceDiscountText: {fontSize: 12,fontWeight:"700",color:'#000', textAlign:'left'},
  
  
  productCompanyBlock: {display:'flex',flexWrap:'wrap',},
  productCompany: {fontSize:14,color:'#fff',paddingLeft:10,paddingRight:10, paddingBottom:0,borderRadius:15},
  productName: {fontSize: 22,color:'#333',fontWeight:'700',},
  productQuantity: {fontSize: 13,color:'green',marginBottom:5},
  productPrice: {fontSize: 25,color:'#2c69bc', textAlign:'left',fontWeight:'700'},
  productBlockInfo:{padding: 15, paddingVertical:10},
  productFeatureItem:{fontSize:12,color:'#777', textAlign:'justify'},

  arrow: {position:'absolute',top: '35%', right: 0,fontSize:30},
  
  cartItemBtnBlock: {marginVertical:5, flexDirection:'row',alignItems:'center'},
  statusHeader: {fontSize:12,color:'#333',fontWeight:'700'},
  statusBtn: {fontSize:12,paddingHorizontal:10,fontWeight:'700'},
})
export default LoginScreen;
