/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState } from 'react';
 import {StyleSheet, Text, View, ScrollView} from 'react-native';
 import  Mainstyles from '../../assets/style';
 import HeaderComponent from '../../components/CommonScreen/NoTitleHeader';
 import FixedNavbar from '../../components/CommonScreen/FixedNavbar';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';  


 const ContactScreen = ({navigation}) => {  
  return (
    <View>
      {/* Header */}
      <HeaderComponent  navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false} style={{height:'100%'}}>

        {/* Divider */}
        <View style={Mainstyles.divider}></View>
        
        {/* Notification */}      
        <View style={styles.cartSection}>
          <View style={styles.cartBlock}>

            {/* About */}
            <View style={styles.cartItem}>
              <Text style={styles.head}>CONTACT US</Text>
              <Text style={styles.para}>
                <Text style={{fontWeight:'700'}}>Address :</Text> Ganeshguri, Guwahati, Assam 
              </Text>
              <Text style={styles.para}>
                <Text style={{fontWeight:'700'}}>Phone :</Text> +91 60037 37738 
              </Text>
              <Text style={styles.para}>
                <Text style={{fontWeight:'700'}}>Address :</Text> pyaasapp@gmail.com
              </Text>
              <Text style={[styles.head,{marginTop:10}]}>CONTACT US ON SOCIAL MEDIA</Text>

              <View style={{flexDirection:'row'}}>
                <Icon name='facebook-square' style={[styles.menuIcon,{color:'#43609C'}]} />
                <Icon name='youtube-square' style={[styles.menuIcon,{color:'#e52d27'}]} />
                <Icon name='twitter-square' style={[styles.menuIcon,{color:'#1DA1F2'}]} />
                <Icon name='linkedin-square' style={[styles.menuIcon,{color:'#0e76a8'}]} />
                <FontAwesome5 name='instagram-square' style={[styles.menuIcon,{color:'#bc2a8d'}]} />
              </View>
            </View>           

          </View>
          
        </View>
      </ScrollView>

      {/* Fixed Navbar */}
      <FixedNavbar navigation={navigation} />

    </View>

  );
};
const styles = StyleSheet.create({
  header: { justifyContent: 'center', alignItems:'center', paddingLeft: 10, paddingRight:10, paddingBottom:10, backgroundColor:'#fff', shadowColor: "#000", shadowOffset: {width: 0, height: 4,}, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 10,},
  
  headerText: {fontSize:30, fontWeight:"700",color:'#fff'},
  headerRow : {flexDirection: 'row',justifyContent:'space-between',width:'100%'},

  cartSection: {backgroundColor:'#eee', shadowColor: "#000", shadowOffset: {width: 0, height: 4,}, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 8},
  cartBlock: {flexDirection:'row',flexWrap:'wrap',borderRadius:5,paddingHorizontal:5},
  cartItem: {flexDirection:'column',width:"100%",backgroundColor:'#fff',padding:10, borderWidth: 1, borderColor: '#ddd', borderRadius:10,},
  cartPointText: {fontSize:8,color:'green',fontWeight:'700',marginBottom:-3},
  head: {fontSize: 20,color:'#333',fontWeight:'700',marginBottom:8},
  para: {fontSize: 15,fontWeight:"500",color:'#000', textAlign:'justify'},
  menuIcon: {fontSize:30,alignSelf:'center', justifyContent:'center',marginRight:10},  
  
  cartItemBtnBlock: {marginVertical:5, flexDirection:'row',alignItems:'center'},
  statusHeader: {fontSize:12,color:'#333',fontWeight:'700'},
  statusBtn: {fontSize:12,paddingHorizontal:10,fontWeight:'700'},
})

export default ContactScreen;
