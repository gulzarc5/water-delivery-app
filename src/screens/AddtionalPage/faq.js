
 import React, { useState } from 'react';
 import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
 import  Mainstyles from '../../assets/style';
 import HeaderComponent from '../../components/CommonScreen/NoTitleHeader';
 import FixedNavbar from '../../components/CommonScreen/FixedNavbar';
 import AntDesign from 'react-native-vector-icons/AntDesign';

 const options = [
  {
    key: 1,
    text: 'HOW CAN I REGISTER IN PYAAS APPLICATION?',
    label: 'Getting yourself registered in Pyaas application is easier then you thought. All you need to do is install the app from play store and open the app in your device. A registration window setup will open up in which an empty space is given for feeding your phone number. As soon as you feed your phone number and press GET OTP button you will receive OTP in that number and next tab will appear asking for the OTP. You need to fill the OTP and proceed with pressing the VERIFY OTP button below. Your registration process is complete and you will be redirected to app homepage.',
  },
  {
    key: 2,
    text: 'HOW CAN I PLACE A SINGLE ORDER?',
    label: 'Placing a single app is simple. From the application’s homepage menu you need to click on PRODUCTS. Now following this action a list of products will appear. You need to click on your preferred product. Now a screen will open where you see that particular product’s details and description such as quantity, price. You need to add the product into your cart by clicking on ADD TO CART option at the bottom right of this page. Also after this you will see an option GO TO CART you need to click on that and you will be redirected to a confirmation page where you can select the quantity and then again you need to click on PROCEED tab in the bottom right of this page. When you have clicked it you will be redirected to the checkout page where you need to feed your address your preferred date/time slot for delivery and also the preferred payment type. You can also add coupons (on availability). For final submit you need to click on PLACE ORDER tab at the bottom right of this page. Your order will be placed successfully.',
  },
  {
    key: 3,
    text: 'HOW CAN I GET A MEMBERSHIP?',
    label: 'In the application homepage itself you need to scroll down, just where the list of products gallery ends you will find the Membership tab. Three type of membership plan is available- GOLD PLAN, SILVER PLAN and BRONZE PLAN. Each of these plans has different specifications. When you click on these tabs you can see the list of products available in that particular plan and the rate of discounts attached. You need to click on your preferred plan and a list of available products will be shown to you. You need to select your product and you will be redirected to the confirmation page. Here you have to select the quantity, daily frequency and at last click on the PROCEED TO CHECKOUT tab at the bottom right of that page. Next a check out page will appear where you need to feed your address preferred date and shift slot for 1st delivery and finally you need to click on PLACE ORDER tab at the bottom right of the page and your order and membership would be confirmed.',
  },
  {
    key: 4,
    text: 'HOW CAN I PLACE BULK ORDERS?',
    label: 'Placing a bulk order is quite similar to placing a single order. From the application’s homepage menu you need to click on PRODUCTS. Now following this a list of products will appear. You need to click on your preferred product. Now a screen will open where you see that particular product’s details and description such as quantity, price. You need to add the product into your cart by clicking on ADD TO CART option at the bottom right of this page. Also after this you will see an option GO TO CART you need to click on that and you will be redirected to a confirmation page where you can select the quantity in bulk and adjust it according to your preference and then you need to click on PROCEED tab in the bottom right of this page. When you have clicked it you will be redirected to the checkout page where you need to feed your address your preferred date/time slot for delivery and also the preferred payment type. You can also add coupons (on availability). For final submit you need to click on PLACE ORDER tab at the bottom right of this page. Your order will be placed successfully.',
  },
  {
    key: 5,
    text: 'HOW CAN I AVAIL COUPONS AND HOW TO USE THEM?',
    label: 'Different types of coupons providing discounts will be made available in the pyaas application by the developer from time to time. For using such coupons all you need to do is while you are in the checkout page after adding items in your cart you need to click on the coupon tab after that a drop down list will appear where all the available coupons will be displayed you need to choose you preferred coupon  and tap on APPLY. The coupon will be then applied to your order and will be displayed on the coupon tab. Then you need to click on PLACE ORDER tab to place you order and availing coupons benefit successfully.',
  },
  {
    key: 6,
    text: 'WHY ARE COINS ADDED TO THE ACCOUNTS AFTER SUCCESSFUL DELIVERY? HOW CAN I GET PROFITTED BY IT?',
    label: 'Coins are added to users accounts after the delivery for their order is successful. Coins are basically a token of compliment from pyaas. You will be profited by the coins in your next order. In your next order the credit point earned in your previous order will be credited and there you will earn a flat discount.',
  },
];
 
 const AboutScreen = ({navigation}) => {  
  const [selectedOption, SetSelectedOption] = useState({key: 1});
  const onSelect = (item) => {
    SetSelectedOption(item);
  };

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
              <Text style={styles.head}>Frequently Asked Question</Text>
             {options.map((item) => {
                return (
                  <View key={item.key} style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.questionBlock}
                      onPress={() => {
                          onSelect(item);
                    }}>
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.sectioHeader}>{item.text}</Text>
                        <AntDesign name="down" style={styles.menuIcon}/>
                      </View>
                      {selectedOption && selectedOption.key === item.key && (
                        <View><Text style={styles.sectioPara}>{item.label}</Text></View>
                      )}
                    </TouchableOpacity>
                  </View>
                );
              })}
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
  head: {fontSize: 18,color:'#333',fontWeight:'700',marginBottom:8,textTransform:'uppercase'},
  para: {fontSize: 11,fontWeight:"500",color:'#000', textAlign:'justify',marginBottom:5},
  
  cartItemBtnBlock: {marginVertical:5, flexDirection:'row',alignItems:'center'},
  statusHeader: {fontSize:12,color:'#333',fontWeight:'700'},
  statusBtn: {fontSize:12,paddingHorizontal:10,fontWeight:'700'},

  questionBlock: {marginBottom:10,paddingBottom:10},
  sectioHeader: {fontSize:16,fontWeight:'700',color:'#2c69bc',marginBottom:5,width:'97%'},
  menuIcon: {fontSize:18,color:'#2c69bc',position:'absolute',top:10,right:-10},
  sectioPara: {fontSize:14,color:'#333'},

})

export default AboutScreen;
