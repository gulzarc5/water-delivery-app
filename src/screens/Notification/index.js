/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState } from 'react';
 import { useNavigation, DrawerActions  } from '@react-navigation/native';
 import { ImageBackground, TextInput, AppRegistry, StyleSheet, Text, View, TouchableHighlight, Image,  ScrollView, TouchableOpacity, Pressable } from 'react-native';
 import {Picker} from '@react-native-picker/picker';
//  import styles1 from './style';
 import  Mainstyles from '../../assets/style';
 import HeaderComponent from '../../components/CommonScreen/NoTitleHeader';
 import FixedNavbar from '../../components/CommonScreen/FixedNavbar';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import Entypo from 'react-native-vector-icons/Entypo';
 import NumericInput from 'react-native-numeric-input'
  


 const Notification = ({navigation}) => {  
   const [selectedLanguage, setSelectedLanguage] = useState();
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

            {/* Notification Item */}
            <View style={styles.cartItem}>
              <Text style={styles.cartPriceDiscountText}>no notification</Text>
            </View>  

            {/* Divider */}
            <View style={Mainstyles.divider}></View>

            {/* Notification Item */}
            {/* <View style={styles.cartItem}>
              <Text style={styles.cartPointText}>20-10-21</Text>
              <Text style={styles.cartName}>Bailey Mineral Water adadvcs</Text>
              <Text style={styles.cartPriceDiscountText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum sagittis lacus, laoreet</Text>
            </View>        */}

            

            {/* Divider */}
            <View style={Mainstyles.divider}></View>

          </View>
          
        </View>
      </ScrollView>

      {/* Fixed Navbar */}
      <FixedNavbar navigation={navigation} style={styles.FixedNavbar} />

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
  cartName: {fontSize: 16,color:'#333',fontWeight:'700'},
  cartPriceDiscountText: {fontSize: 10,fontWeight:"500",color:'#000', textAlign:'left'},
  
  cartItemBtnBlock: {marginVertical:5, flexDirection:'row',alignItems:'center'},
  statusHeader: {fontSize:12,color:'#333',fontWeight:'700'},
  statusBtn: {fontSize:12,paddingHorizontal:10,fontWeight:'700'},
})

export default Notification;
