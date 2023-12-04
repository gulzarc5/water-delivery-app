
 import React, { useContext, useState } from 'react';
 import {View,Text, TouchableOpacity, StyleSheet,} from 'react-native';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import Entypo from 'react-native-vector-icons/Entypo';
 import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../navigation/StackNavigator';

const HeaderComponent = ({auth, navigation}) => {   
  const {authContext, loginState, dispatch} = useContext(AuthContext);
  const cartCount = loginState.cartData ? loginState.cartData.cart.length : 0;
  const openCartHandler = () => {
    if (loginState.token && loginState.token) {
      navigation.navigate('CartScreen');
    } else {
      navigation.navigate('LoginScreen');
    }
  }
   return (
    <View style={styles.header}>
        <View style={styles.headerRow}>
        {/* Back Button */}
        <TouchableOpacity activeOpacity={.9} style={{width:'70%'}} onPress={() => navigation.goBack()}>
            <Icon name="angle-left" style={styles.menuIcon}/>
        </TouchableOpacity>

        {/* Cart Icon */}          
        <TouchableOpacity activeOpacity={.8} style={styles.headIcon} onPress={() => openCartHandler() }>
          <Text style={styles.cartItemNumber}>{cartCount}</Text>
          <Feather name='shopping-cart' color='#fff' style={{fontSize:30}}/> 
        </TouchableOpacity>

        {/* User Icon */}
        <TouchableOpacity style={styles.headIcon} activeOpacity={.8} onPress={() => navigation.navigate('MenuScreen')}>
          <Entypo name='menu' color='#fff' style={{fontSize:40}}/> 
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { justifyContent: 'center', alignItems:'center', padding: 10, backgroundColor:'#2c69bc',  },
  headerText: {fontSize:30, fontWeight:"700",color:'#fff'},
  headerRow : {flexDirection: 'row',justifyContent:'space-between',width:'100%'},
  menuIcon: {fontSize:40,color:'#fff',alignSelf:'flex-start', justifyContent:'center', paddingTop:5,},
  navLogo: {width:100,height:50,resizeMode:'cover',marginRight:120},
  navIcon: {width:30,height:30,resizeMode:'contain',alignSelf:'flex-end'},
  navUser: {width:40,height:40,resizeMode:'cover',alignSelf:'flex-end',borderWidth:1,borderRadius:50,borderColor:'#fff',marginTop:5},
  headIcon: {color:'#2c69bc',alignSelf:'center', justifyContent:'center'},
  headingText: {fontSize:30, fontWeight:"700",color:'#333'},
  subHeading: {fontSize:15, fontWeight:"500",color:'#2c69bc'},
  topProfileBox: {justifyContent: 'center', alignItems:'center', padding: 10, paddingTop:0, flexDirection:'row' },
  topProfileInfo: {width:'75%',paddingTop:25},
  profilePhoto: {width:'25%',borderWidth:1,borderColor:'#fff',backgroundColor:'#2c69bc',borderRadius:50,overflow:'hidden',alignItems:'center',paddingVertical:5, shadowColor: '#2c69bc', shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.9, shadowRadius: 50, elevation: 20,},
  cartItemNumber: {position:'absolute',top:-10,right:-7,fontWeight:'700',fontSize:16,color:'#fff'}
})
 
 export default HeaderComponent;