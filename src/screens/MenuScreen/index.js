/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useContext, useEffect, useState } from 'react';
 import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import AntDesign from 'react-native-vector-icons/AntDesign';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { AuthContext } from '../../components/navigation/StackNavigator';
 
 const MenuScreen = ({ navigation }) => {
   const {authContext, loginState, dispatch} = useContext(AuthContext);
   const products = loginState.data ? loginState.data.products : [];
  
   const logoutHandler = () => {
      authContext.signOut();
   }
   const loginHandler = () => {
     navigation.navigate('LoginScreen');
   }
   const productList = () => {
     navigation.navigate('ProductList', {products})
   }

   return (
     <View>
       <View style={{ position: 'absolute', zIndex: 99, backgroundColor: "#ddd",width:'100%' }}>
         <View style={{ backgroundColor: "#ddd" }}>
           <TouchableOpacity activeOpacity={.9} style={[styles.headIcon, {width:'70%',alignSelf:'flex-start',marginLeft:10,marginTop:10,marginBottom:-10}]} onPress={() => navigation.goBack()}>
             <Icon name="angle-left" color='#2c69bc' style={styles.backIcon}/>
           </TouchableOpacity>
           <View style={styles.topProfileBox}>
             <View style={styles.topProfileInfo}>
               <Text style={styles.headingText}>{loginState.user && loginState.user !== null ? loginState.user.name : 'Guest User'}</Text>
               <Text style={styles.subHeading}>{loginState.user && loginState.user !== null ? loginState.user.email : 'Welcome to Pyaas'}</Text>
             </View>
             { loginState.user && loginState.user ?
             <View style={styles.profilePhoto}>
               <Image style={{width:35,height:35,borderRadius:50}} resizeMode="cover" source={require('../../assets/img/icon/points.png')} />
               <Text style={{fontSize:25,color:'#fff',fontWeight:'bold',marginTop:-2}}>{loginState.coin ?loginState.coin.total_coins : 0}</Text>
               <Text style={{fontSize:8,color:'#fff',fontWeight:'500',marginTop:-5}}>Points</Text>
             </View> : null
             }
           </View>
         </View>
       </View>
       <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#ddd',height: '100%' }}>
        <View style={styles.MenuBlock}>
          <Text style={{fontSize:13,marginBottom:15,color:'#777',letterSpacing:2}}>MENU</Text>
          <TouchableOpacity activeOpacity={.7} style={styles.menuBlock} onPress={() => productList()}>
            <View style={styles.menuIconBlock}><Icon name="list" style={styles.menuIcon}/></View>
            <View style={styles.MenuList}><Text style={styles.MenuListText}>Product</Text></View>
          </TouchableOpacity>
  
          <TouchableOpacity activeOpacity={.7} style={styles.menuBlock} onPress={() => loginState.user && loginState.user != null ? navigation.navigate('OrderScreen') : navigation.navigate('LoginScreen') }>
            <View style={styles.menuIconBlock}><Icon name="archive" style={styles.menuIcon}/></View>
            <View style={styles.MenuList}><Text style={styles.MenuListText}>My Orders</Text></View>
          </TouchableOpacity>
  
          <TouchableOpacity activeOpacity={.7} style={styles.menuBlock} onPress={() => loginState.user && loginState.user != null ? navigation.navigate('MyMembership') : navigation.navigate('LoginScreen')}>
            <View style={styles.menuIconBlock}><Icon name="paper-plane-o" style={styles.menuIcon}/></View>
            <View style={styles.MenuList}><Text style={styles.MenuListText}>My Membership</Text></View>
          </TouchableOpacity>
  
          <TouchableOpacity activeOpacity={.7} style={styles.menuBlock} onPress={() => loginState.user && loginState.user != null ? navigation.navigate('AddressScreen') : navigation.navigate('LoginScreen')}>
            <View style={styles.menuIconBlock}><Icon name="address-book" style={styles.menuIcon}/></View>
            <View style={styles.MenuList}><Text style={styles.MenuListText}>Address Book</Text></View>
          </TouchableOpacity>
  
          <TouchableOpacity activeOpacity={.7} style={styles.menuBlock} onPress={() => loginState.user && loginState.user != null ? navigation.navigate('ProfileScreen') : navigation.navigate('LoginScreen')}>
            <View style={styles.menuIconBlock}><AntDesign name="user" style={styles.menuIcon}/></View>
            <View style={styles.MenuList}><Text style={styles.MenuListText}>My Profile</Text></View>
          </TouchableOpacity>
  
          <TouchableOpacity activeOpacity={.7} style={styles.menuBlock} onPress={() => loginState.user && loginState.user != null ? navigation.navigate("CartScreen") : navigation.navigate('LoginScreen')}>
            <View style={styles.menuIconBlock}><AntDesign name="shoppingcart" style={styles.menuIcon}/></View>
            <View style={styles.MenuList}><Text style={styles.MenuListText}>Cart</Text></View>
          </TouchableOpacity>
          {
            loginState.user && loginState.user != null ?
            <TouchableOpacity activeOpacity={.7} style={styles.menuBlock} onPress={() => logoutHandler()}>
              <View style={styles.menuIconBlock}><Icon name="lock" style={styles.menuIcon}/></View>
              <View style={styles.MenuList}><Text style={styles.MenuListText}>Logout</Text></View>
            </TouchableOpacity>          
          :  
            <TouchableOpacity activeOpacity={.7} style={styles.menuBlock} onPress={() => loginHandler()}>
              <View style={styles.menuIconBlock}><Icon name="key" style={styles.menuIcon}/></View>
              <View style={styles.MenuList}><Text style={styles.MenuListText}>Login</Text></View>
            </TouchableOpacity>
          }
        </View>
        <View style={{padding: 10, backgroundColor:'#fff'}}>
          <Text style={{fontSize:13,marginBottom:15,color:'#777',letterSpacing:2}}>CONTACT</Text>
          <TouchableOpacity activeOpacity={.7} style={styles.menuBlock} onPress={() => navigation.navigate('AboutScreen')}>
            <View style={styles.menuIconBlock}><Icon name="product-hunt" style={styles.menuIcon}/></View>
            <View style={styles.MenuList}><Text style={styles.MenuListText}>About</Text></View>
          </TouchableOpacity>
          
          <TouchableOpacity activeOpacity={.7} style={styles.menuBlock} onPress={() => navigation.navigate('ContactScreen')}>
            <View style={styles.menuIconBlock}><AntDesign name="customerservice" style={styles.menuIcon}/></View>
            <View style={styles.MenuList}><Text style={styles.MenuListText}>Contact Us</Text></View>
          </TouchableOpacity>
          
          <TouchableOpacity activeOpacity={.7} style={styles.menuBlock} onPress={() => navigation.navigate('TermsConditionScreen')}>
            <View style={styles.menuIconBlock}><AntDesign name="book" style={styles.menuIcon}/></View>
            <View style={styles.MenuList}><Text style={styles.MenuListText}>Terms & Condition</Text></View>
          </TouchableOpacity>
          
          <TouchableOpacity activeOpacity={.7} style={styles.menuBlock} onPress={() => navigation.navigate('DisclamerScreen')}>
            <View style={styles.menuIconBlock}><AntDesign name="book" style={styles.menuIcon}/></View>
            <View style={styles.MenuList}><Text style={styles.MenuListText}>Disclamer</Text></View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={.7} style={styles.menuBlock} onPress={() => navigation.navigate('PrivacyScreen')}>
            <View style={styles.menuIconBlock}><AntDesign name="book" style={styles.menuIcon}/></View>
            <View style={styles.MenuList}><Text style={styles.MenuListText}>Privacy Policy</Text></View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={.7} style={styles.menuBlock} onPress={() => navigation.navigate('RefundScreen')}>
            <View style={styles.menuIconBlock}><AntDesign name="book" style={styles.menuIcon}/></View>
            <View style={styles.MenuList}><Text style={styles.MenuListText}>Cancellation/Refund Policy</Text></View>
          </TouchableOpacity>
          <Text style={{ textAlign: 'center', letterSpacing: 2, padding: 20, paddingBottom: 0, marginTop:1 ,color: '#2c69bc' }}>POWERED BY WEBINFOTECH</Text>
        </View>
      </ScrollView>
     </View>
 
   );
 };
 
 const styles = StyleSheet.create({
   topProfileBox: {justifyContent: 'center', alignItems:'center', padding: 10, paddingTop:0, flexDirection:'row' },
   topProfileInfo: {width:'75%',paddingTop:25},
   profilePhoto: {width:'25%',borderWidth:1,borderColor:'#fff',backgroundColor:'#2c69bc',borderRadius:50,overflow:'hidden',alignItems:'center',paddingVertical:5, shadowColor: '#2c69bc', shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.9, shadowRadius: 50, elevation: 20,},
   MenuBlock: {padding: 10, paddingTop:30, borderBottomWidth:1,borderColor:'#ddd', borderTopEndRadius:40, borderTopStartRadius:40,backgroundColor:'#fff',marginTop:150},
   MenuList: {width:'80%'},
   MenuListText: {fontSize:17,color:'#333',letterSpacing:1},
   menuBlock: {flexDirection:'row',flexWrap:'wrap',alignItems:'center',paddingVertical:5},
   menuIconBlock: {width:'15%',marginRight:'1%'},
   menuIcon: {fontSize:15,color:'#777',alignSelf:'center', justifyContent:'center',},  
   headingText: {fontSize:30, fontWeight:"700",color:'#333'},
   subHeading: {fontSize:15, fontWeight:"500",color:'#2c69bc'},
   backIcon: {fontSize:30,color:'#48BBEC',alignSelf:'flex-start', justifyContent:'center', backgroundColor:'#fff',paddingHorizontal:10,borderRadius:50},
 })
 
 export default MenuScreen;
 