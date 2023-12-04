
 import React, { useState } from 'react';
 import { StyleSheet, Text, View, ScrollView} from 'react-native';
 import  Mainstyles from '../../assets/style';
 import HeaderComponent from '../../components/CommonScreen/NoTitleHeader';
 import FixedNavbar from '../../components/CommonScreen/FixedNavbar';
  


 const AboutScreen = ({navigation}) => {  
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
              <Text style={styles.head}>ABOUT US</Text>
              <Text style={styles.para}>
                PYAAS is Guwahati’s 1st organized packaged drinking water Distribution Company, We tied up with all leading packaged drinking water manufacturing companies who processess high quality Packaged Drinking Water, such as Bailey , Hydros . We also provide normal purified water from reliable sources ISI water plants. 
              </Text>

              <Text style={styles.para}>
                PYAAS is your one-stop solution for drinking water needs in Guwahati. We always take care of integrity and timely delivery. 
              </Text>
              <Text style={styles.para}>
                Download PYAAS app, and forget about the hassle of calling your local water delivery trucks repeatedly. Rather than waiting for hours, you can place your order for packaged drinking water cans in just a couple of steps.
              </Text>
              <Text style={styles.para}>
                We have developed the convenient and simple process of ordering water cans for you. From choosing your preferred brand of mineral water to the payment screen, every step has been designed intelligently. 
              </Text>

              <Text style={styles.para}>
                Just place your order and choose a slot, we will deliver the cans as per your convenience. We go the extra mile to ensure the purity and authenticity of the cans delivered to you. 
              </Text>
            </View>          

            {/* About */}
            <View style={[styles.cartItem, {marginTop:10}]}>
              <Text style={styles.head}>MISSION</Text>
              <Text style={styles.para}>
                Potable water being one of the most critical needs of mankind, next to oxygen, started our journey to deliver pure & hygienic drinking water at the doorstep of every Guwahati resident at an affordable price, quality & timely service. 
              </Text>
            </View>          

            {/* About */}
            <View style={[styles.cartItem, {marginTop:10}]}>
              <Text style={styles.head}>VISSION</Text>
              <Text style={styles.para}>
                To become a trusted and leading Packaged Drinking Water marketplace in GUWAHATI and all over ASSAM.
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
  para: {fontSize: 11,fontWeight:"500",color:'#000', textAlign:'justify',marginBottom:5},
  
  cartItemBtnBlock: {marginVertical:5, flexDirection:'row',alignItems:'center'},
  statusHeader: {fontSize:12,color:'#333',fontWeight:'700'},
  statusBtn: {fontSize:12,paddingHorizontal:10,fontWeight:'700'},
})

export default AboutScreen;
