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

import { ScrollView } from 'react-native-gesture-handler';
//  import * as Animatable from 'react-native-animatable';
 
 
//  MyCustomComponent = Animatable.createAnimatableComponent(MyCustomComponent);
 
const ConfirmScreen = ({route}) => {   
  const [data, setData] = useState(route.params ? route.params.data : '');
  const navigation = useNavigation();
  const greeting = 'Welcome to React';
   console.log(data);
  return (
<ScrollView>
    <View>
      {/* Header */}
      {/* <HeaderComponent props={greeting} navigation={navigation} /> */}
      
      <View style={styles.container}>        
      
        <View style={{alignItems:'center',paddingTop:10,}}>
          <Image 
            source={require('../../assets/img/check-svgrepo-com.png')}
            style={{width:100,height:100,resizeMode:'cover',paddingVertical:30}}
          />
          {/* <Animatable.Text animation="zoomInUp">Zoom me up, Scotty</Animatable.Text> */}
          <Text style={{alignItems:'center',paddingTop:10,marginBottom:20,fontWeight:'700',fontSize:35,color:'#228b22'}}>ORDER PLACED</Text>
        </View>

        {/* prodict Item */}
       
        <View style={styles.cartItem}>
          {/* <TouchableOpacity
            activeOpacity={.9}
            onPress={() =>navigation.navigate('OrderDetail')} style={internalstyles.cartImage}
          > */}
           {data.order.details && data.order.details.map((product, index) => {
              return(
                <View key={index} style={{flexDirection:'row',borderBottomColor:'#eee',borderBottomWidth:1,paddingTop:5,marginBottom:5}}>
                  <Image source={{uri: product.product.image }} style={{width:50,height:50,resizeMode:'contain',alignSelf:'center',marginTop:-10}}/>
                  <View style={{alignItems:'flex-start',width:'85%',paddingLeft:10}}>
                    <View>
                      <Text style={internalstyles.cartId}>Order Id: {data.order.id} </Text>
                      <Text style={internalstyles.cartName}>{product.product_name}-{product.size}{product.is_jar==1 ? ' With Jar' : ''}</Text>
                    </View>                               
                    <View style={internalstyles.cartPriceDiscount}>
                      <Text style={internalstyles.cartPriceDiscountText}>Delivered on {data.order.delivery_schedule_date} &nbsp;</Text>
                      <View style={internalstyles.cartItemBtnBlock}>
                        <Text style={internalstyles.statusHeader}>Status</Text>
                        <Text style={[internalstyles.statusBtn, {color:'green',}]}>Booked</Text>
                      </View>
                    </View>
                    {/* <Icon name='angle-right' style={internalstyles.arrow} />  */}
                  </View>
                </View>
              )
            })}
            
          {/* </TouchableOpacity> */}
          <View style={{flexDirection:'row',}}>
            <TouchableOpacity style={{width:'100%',alignItems:'center'}}
              onPress={() => navigation.navigate('OrderScreen')}
            >
              <Text style={styles.span}>Check Order History</Text>
            </TouchableOpacity>
          </View>
        </View>        
          
        {/* Points Block */}
        <LinearGradient colors={['#36d1dc', '#5b86e5']} style={internalstyles.pointsblock}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image
            source={require('../../assets/img/icon/points.png')}
            style={{width:45,height:45,resizeMode:'cover'}}
            />
            {(data.order.coin_earned > 0) && (
               <View>
               <Text style={internalstyles.pointsText}>You have earned <Text style={{fontWeight:'700',color:'yellow',fontSize:20}}>{data.order.coin_earned} </Text>points on this {'\n'} purchase. It will be credited after successful Delivery</Text>
             </View>
            )}
           
          </View>
        </LinearGradient>

        {/* Delivery Address */}
        <Text style={styles.addressText}>Delivery Information</Text>
        { 
        data.order.shipping_address ? 
        <View style={styles.addressBlock}>
            <Text style={internalstyles.name}>{data.order.shipping_address.name}</Text>
            <Text style={internalstyles.addesss}>{data.order.shipping_address.flat_no}, {data.order.shipping_address.main_location_name},{data.order.shipping_address.sub_location_name}, {data.order.shipping_address.address_one}, {data.order.shipping_address.land_mark}, {'\n'}{data.order.shipping_address.mobile}</Text>
        </View> : null
        }
        {/* Continue Shoping */}
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <TouchableHighlight style={internalstyles.defaultbtn} onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={internalstyles.defaultbtnText}>Continue Shoping</Text>
          </TouchableHighlight>
        </View>
        
      </View>
      
    </View>
    </ScrollView>
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
  cartItem: {flexDirection:'column',width:"100%",backgroundColor:'#fff',paddingBottom:10},
  cartImage: {marginTop: 5,marginBottom:0,flexDirection:'row',paddingLeft:10,paddingRight:10,justifyContent:'space-between'},
  cartId: {fontSize: 10,color:'#333',fontWeight:'700'},
  cartName: {fontSize: 16,color:'#C99738',fontWeight:'700'},
  cartPrice: {textAlign:'left',marginTop:10,marginBottom:10,flexDirection:'row'},
  itemPrice: {fontSize:18,fontWeight:'700'},
  cartPriceDiscountText: {fontSize: 12,fontWeight:"700",color:'#000', textAlign:'left'},

  arrow: {position:'absolute',top: '35%', right: 0,fontSize:30},
  
  cartItemBtnBlock: {marginVertical:5, flexDirection:'row',alignItems:'center'},
  statusHeader: {fontSize:12,color:'#333',fontWeight:'700'},
  statusBtn: {fontSize:12,paddingHorizontal:10,fontWeight:'700'},
})
export default ConfirmScreen;
