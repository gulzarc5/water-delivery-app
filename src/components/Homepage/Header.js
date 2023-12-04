import React, { useContext,useState } from 'react';
import { useNavigation} from '@react-navigation/native';
import {View, Text, Image,TouchableOpacity, StyleSheet} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather'; 
import { AuthContext } from '../navigation/StackNavigator';

const HeaderComponent = ({auth}) => {
    const {authContext, loginState} = useContext(AuthContext);
    const cartCount = loginState.cartData ? loginState.cartData.cart.length : 0;
    const navigation = useNavigation();


    const openCartHandler = () => {
      if (loginState.token) {
        navigation.navigate('CartScreen');
      } else {
        navigation.navigate('LoginScreen');
      }
    }
  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>

        {/* Company Logo */}
        <Image
          source={require('../../assets/img/logo.png')}
          style={styles.navLogo}
        />

        {/* Natification Icon */}
        <TouchableOpacity style={styles.headIcon} onPress={() => { loginState.token && loginState.token != null ? navigation.navigate('Notification') : navigation.navigate('LoginScreen')}}>
          <Feather name='bell' color='#2c69bc' style={{fontSize:30}}/> 
        </TouchableOpacity>
          
        {/* Cart Icon */}
        <TouchableOpacity style={styles.headIcon} onPress={() => openCartHandler()}>
          <Text style={styles.cartItemNumber}>{cartCount}</Text>
          <Feather name='shopping-cart' color='#2c69bc' style={{fontSize:30}}/> 
        </TouchableOpacity>

        {/* User Icon */}
        <TouchableOpacity style={styles.headIcon} activeOpacity={.8} onPress={() => navigation.navigate('MenuScreen')}>
          <Entypo name='menu' color='#2c69bc' style={{fontSize:40}}/> 
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { justifyContent: 'center', alignItems:'center', padding: 10, backgroundColor:'#fff', shadowColor: "#000", shadowOffset: {width: 0, height: 4,}, shadowOpacity: 0.90, shadowRadius: 10.65, elevation: 10,},
  headerText: {fontSize:30, fontWeight:"700",color:'#fff'},
  headerRow : {flexDirection: 'row',justifyContent:'space-between',width:'100%',alignItems:'center'},
  navLogo: {width:120,height:45,resizeMode:'cover',marginRight:50},
  navUser: {width:40,height:40,resizeMode:'cover',alignSelf:'flex-end',borderWidth:1,borderRadius:50,borderColor:'#bbb',marginTop:10},
  headIcon: {color:'#2c69bc',alignSelf:'center', justifyContent:'center'},
  headingText: {fontSize:30, fontWeight:"700",color:'#333'},
  subHeading: {fontSize:15, fontWeight:"500",color:'#2c69bc'},
  cartItemNumber: {position:'absolute',top:-10,right:-7,fontWeight:'700',fontSize:16,color:'#2c69bc'}
})

export default HeaderComponent;