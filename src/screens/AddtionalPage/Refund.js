/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState } from 'react';
 import { StyleSheet, Text, View,ScrollView} from 'react-native';
 import  Mainstyles from '../../assets/style';
 import HeaderComponent from '../../components/CommonScreen/NoTitleHeader';
 import FixedNavbar from '../../components/CommonScreen/FixedNavbar';  


 const RefundScreen = ({navigation}) => {  
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

            {/* About */}
            <View style={styles.cartItem}>
              <Text style={styles.head}>CANCELLATION/REFUND POLICY</Text>
                <Text  style={styles.para}>
                1.Order once delivered and after receiving of cans, there will be no cancellation or refund of the water cans.
                </Text>
                <Text  style={styles.para}>
                2.After placement of order, and order confirmation. User can request for cancellation before the delivery via app or via calling to customer support 60037 37738 or via whats app or via email at pyaasapp@gmail.com
                </Text>
                <Text  style={styles.para}>
                3.There will be refund for the can deposit amount, if the cans are purchased from Pyaas. There will be full refund of amount with a condition that can is not damaged or does not has leakage.
                </Text>
                <Text  style={styles.para}>
                
                4.Refund will be made to the customer within 3 working days.
                </Text> 
            </View>           

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
  head: {fontSize: 18,color:'#333',fontWeight:'700',marginBottom:8},
  para: {fontSize: 11,fontWeight:"500",color:'#000', textAlign:'justify'},
  
  cartItemBtnBlock: {marginVertical:5, flexDirection:'row',alignItems:'center'},
  statusHeader: {fontSize:12,color:'#333',fontWeight:'700'},
  statusBtn: {fontSize:12,paddingHorizontal:10,fontWeight:'700'},
})

export default RefundScreen;
