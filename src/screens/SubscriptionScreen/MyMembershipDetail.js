/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState,useEffect } from 'react';
 import { useNavigation, DrawerActions  } from '@react-navigation/native';
 import { ImageBackground, TextInput, AppRegistry, StyleSheet, Text, View, Linking, ScrollView, TouchableOpacity, Pressable } from 'react-native';
 import {Picker} from '@react-native-picker/picker';
//  import styles1 from './style';
 import  Mainstyles from '../../assets/style';
 import HeaderComponent from '../../components/CommonScreen/NoTitleHeader'
 import Icon from 'react-native-vector-icons/Entypo';
 import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ConfirmDialog, ProgressDialog } from 'react-native-simple-dialogs';
import SubscriptionDetailStatus from '../../components/Subscription/SubscriptionDetailStatus';
  


const CartScreen = ({route,navigation}) => {  
  const [order,setOrder] = useState([]);
  const [isProgress,setIsProgress] = useState(true);
  const [isProgressText,setIsProgressText] = useState("Loading Membereship Details");
  const [cancelDialog,setCancelDialog] = useState(false);  
  const initiateCall = () => {
    let url =
      'tel:' + 7086030335;
    Linking.openURL(url)
    .then((data) => {
      // console.log('Phone Opened');
    })
    .catch(() => {
      alert('Make sure Phone installed on your device');
    });
  };
  const fetchOrderDetail = async()=>{
    try{
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`         
      const response = await axios.get(`user/subscription/detail/${route.params.orderId}`);
      console.log(response.data.data);
      if(response.data.status !== true) {
          setIsProgress(false);
          alert(response.data.message);
      }
      if (response.data.status === true) {
        setOrder(response.data.data);  
        setIsProgress(false);
      }
    }catch (error) {
      console.log(error);
    }
  }
  const membershipCancel = async()=>{
    setIsProgressText("Cancel Request Sent")
    setIsProgress(true);
    try{
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`         
      const response = await axios.get(`user/subscription/cancel/${route.params.orderId}`);
      console.log(response.data.data);
      if(response.data.status !== true) {
          setIsProgress(false);
          alert(response.data.message);
      }
      if (response.data.status === true) {
        setIsProgress(false);
        setOrder({
          ...order,
          status: "4",
          is_cancellable:"2",
      });
      }
    }catch (error) {
      console.log(error);
    }
  }

  const orderCancelDilog = async()=>{
    setCancelDialog(true);
  }

  useEffect(() => {
    fetchOrderDetail();
  },[navigation])


  return (
    <View>
      {/* Header */}
      <HeaderComponent  navigation={navigation} title={'My Membership'} />
      <ScrollView showsVerticalScrollIndicator={false} style={{height:'93.3%'}}>
      <ProgressDialog
        visible={isProgress}
        titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5,fontSize:19}}
        messageStyle={{color:'#333'}}
        dialogStyle={{borderRadius:10}}
        title={isProgressText}
        message="Please, wait..."
      />
        {/* Divider */}
        <View style={Mainstyles.divider}></View>
        
        {/* Cart */}      
        <View style={styles.cartSection}>
          <View style={styles.cartBlock}>
            {/* prodict Item */}
            <View style={styles.cartItem}>
              <View style={styles.cartImage}>
                <View style={{width:'100%'}}>
                  <Text style={styles.orderIdText}>ORDER ID : {order.id}</Text>
                  <View>
                    
                    <View style={styles.productCompanyBlock}><Text style={[styles.productCompany, {backgroundColor:'#C99738',}]}>{order.plan_name}</Text></View>
                    <Text style={styles.cartName}>{order.brand} - {order.size}</Text>
                    <SubscriptionDetailStatus status={order.status} paymentStatus={order.payment_status}/>
                    <Text style={{fontSize: 13,color:'green',marginBottom:5}}>Duration {order.plan_duration} Days &nbsp;</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                      <View style={styles.qtyBlock}>
                        <Text style={styles.qtyHeadText}>Quantity</Text>
                        <Text style={styles.qtyText}>{order.quantity}</Text>
                      </View>                 
                      <Text style={styles.DeliveredText}>1st Delivered By {order.plan_start_date} &nbsp;</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Membership Point */}
        {(order.is_cancellable == 1) && (
          <View style={styles.CancelBlock}>
            <View style={styles.CancelInner1}>
              <Text style={styles.CancelInnerText1}>Do you want to cancel your product ?</Text>
            </View>
            <TouchableOpacity style={styles.CancelInner2} onPress={() =>orderCancelDilog()}>
              <Text style={styles.CancelInnerText2}>Cancel</Text>
            </TouchableOpacity>
            <ConfirmDialog
            titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-20,fontSize:14}}
            messageStyle={{color:'#333',marginBottom:-20,}}
            dialogStyle={{borderRadius:10}}
            title="Cancel Confirmation"
            message="Are you sure to cancel your Membership?"
            visible={cancelDialog}
            onTouchOutside={() => {dialogVisible: false}}
            positiveButton={{
                title: "YES",
                onPress: () => membershipCancel(),
                titleStyle: {
                    color: "#fff",
                    colorDisabled: "aqua",
                },
                style: {
                    backgroundColor: "#2c69bc",
                    backgroundColorDisabled: "transparent",
                    borderRadius:10
                },
            }}
            negativeButton={{
                title: "NO",
                onPress: () => setCancelDialog(false),
                titleStyle: {
                    color: "#fff",
                    colorDisabled: "aqua",
                },
                style: {
                    backgroundColor: "red",
                    backgroundColorDisabled: "transparent",
                    borderRadius:10
                },
            }}
            animationType={'slide'}
            />
          </View>

        )}

        {(order.is_cancellable == 2) && (
          <View style={styles.CancelBlock}>           
            <Text style={{color:'red',fontSize:15}} >You have cancelled this membership plan</Text>
          </View>
        )}

        <View style={[styles.CancelBlock, {marginTop:5}]}>
          <View style={styles.CancelInner1}>
            <Text style={styles.CancelInnerText1}>Do have an issue with this order ?</Text>
          </View>
          <TouchableOpacity style={styles.CancelInner2} onPress={initiateCall} >
            <Text style={styles.CancelInnerText2}>Call us</Text>
          </TouchableOpacity>
        </View>   

        {/* Divider */}
        <View style={Mainstyles.divider}></View>
        
        {/* Cart Value */}
        <View style={styles.cartValueBlock}>
          <Text style={styles.cartValueHeaderText}>Price Detail</Text>
          <View style={styles.cartValuePriceBlock}>
            <View style={styles.cartValueInnerBlock}>
              <Text>Cart Value</Text>
              <Text>₹ {order.total_mrp}</Text>
            </View>
            <View style={styles.cartValueInnerBlock}>
              <Text>Discount</Text>
              <Text style={{color:'green'}}>- ₹ {order.total_mrp - order.total_amount}</Text>
            </View>
            <View style={[styles.cartValueInnerBlock, {paddingBottom:0, }]}>
              <Text>Delivery Charges</Text>
              <Text style={{color:'green'}}>Free</Text>
            </View>
          </View>
          <View style={styles.cartValueTotalBlock}>
            <Text style={styles.cartValueTotalBlockText}>Total Amount</Text>
            <Text style={styles.cartValueTotalBlockText}>₹ {order.total_amount}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={Mainstyles.divider}></View>
        
        {/* Cart Value */}
        <View style={styles.cartValueBlock}>
          <Text style={styles.cartValueHeaderText}>All Delivery</Text>
          {/* <View style={{borderBottomWidth:1,borderColor:'#eee',padding: 10,}}>
            <Text style={{fontSize:12}}>You have received <Text style={{fontWeight:'700',color:'green'}}>5/30</Text> product from your subscription plan</Text>
          </View>  */}
          <View style={styles.cartValuePriceBlock}>
            
            <View style={styles.DeliveryHead}>
              <Text style={styles.DeliveryHeadItem}>Delivery Date</Text>
              <Text style={styles.DeliveryHeadItem}>No. of bottle</Text>
              <Text style={styles.DeliveryHeadItem}>Status</Text>
            </View>
            {order && order.order_dates && order.order_dates.length > 0 && order.order_dates.map((dates,index) => {
            return (
              <View style={styles.cartValueInnerBlock} key={index}>
                <Text style={styles.deliveyDateEach}>{dates.order_date}</Text>
                <Text style={styles.deliveyDateEach}>{order.quantity}</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  {dates.status == 1 ? (
                    <Text style={[styles.deliveyDateEach, {color:'orange'}]}>Pending</Text>
                  ) : (
                  <Text style={[styles.deliveyDateEach, {color:'green'}]}>Delivered</Text>
                  )}
                  <Icon name='info-with-circle' style={{fontSize:10,paddingLeft: 3,color:'#777'}} />
                </View>
              </View>
              )    
            })}
          </View>
          {/* <View style={styles.cartValueTotalBlock}>
            <Text style={styles.cartValueTotalBlockText}>Total No. of Bottle</Text>
            <Text style={styles.cartValueTotalBlockText}>30</Text>
          </View> */}
        </View>
        
        {/* Divider */}
        <View style={[Mainstyles.divider, {paddingBottom:20}]}></View>
      </ScrollView>

    </View>

  );
};
const styles = StyleSheet.create({
  header: { justifyContent: 'center', alignItems:'center', paddingLeft: 10, paddingRight:10, paddingBottom:10, backgroundColor:'#fff', shadowColor: "#000", shadowOffset: {width: 0, height: 4,}, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 10,},
  
  headerText: {fontSize:30, fontWeight:"700",color:'#fff'},

  cartSection: {backgroundColor:'#eee',marginBottom:5},
  cartBlock: {flexDirection:'column',flexWrap:'wrap', marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,overflow:'hidden'},
  cartItem: {flexDirection:'column',width:"100%",backgroundColor:'#fff',},
  cartImage: {marginTop: 5,marginBottom:0,flexDirection:'row',paddingLeft:10,paddingRight:10},
  orderIdText: {fontSize: 10,color:'#777',fontWeight:'700'},
  cartName: {fontSize: 18,color:'#C99738',fontWeight:'700'},
  cartPrice: {textAlign:'left',flexDirection:'row'},
  itemPrice: {fontSize:18,fontWeight:'700',color:'#333'},
  // cartPriceDiscount: {backgroundColor:'green',borderRadius:15},
  cartPriceDiscountText: {fontSize: 15,fontWeight:"700",color:'green', textAlign:'left',paddingTop:3},
  DeliveredText: {fontSize: 12,fontWeight:"700",color:'#000', textAlign:'left',marginLeft:10,paddingLeft:10,borderLeftWidth:2,borderColor:'#2c69bc'},

  qtyBlock: {flexDirection:'row',justifyContent:'center',alignSelf:'flex-start',borderWidth:1,borderColor:'#2c69bc',marginVertical:5,borderRadius:5,backgroundColor:'#2c69bc',overflow:'hidden'},
  qtyHeadText: {fontWeight:'700',justifyContent:'flex-start',color:'#fff',paddingHorizontal:5,},
  qtyText: {fontWeight:'700',justifyContent:'flex-start',backgroundColor:'#fff',paddingHorizontal:8,},
  // pickerBlock: {width:100,marginTop:-16,padding: 0,margin:0},
  
  cartValueBlock: {backgroundColor:'#fff', marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,},
  cartValueHeaderText: {fontWeight:'700',borderBottomWidth:1,borderColor:'#eee',padding:10,color:'#333'},
  cartValuePriceBlock: {padding:10,},
  cartValueInnerBlock: {flexDirection:'row',justifyContent:'space-between',paddingVertical:3},
  cartValueTotalBlock: {flexDirection:'row',justifyContent:'space-between',paddingTop:5,borderTopWidth:1,borderColor:'#eee',borderStyle:'dashed',padding:10,borderRadius: 5},
  cartValueTotalBlockText: {fontWeight:'700'},
  
  productCompanyBlock: {display:'flex',flexWrap:'wrap',marginTop:3},
  productCompany: {fontSize:10,color:'#fff',paddingHorizontal:8, paddingBottom:0,borderRadius:15},

  MembershipBlock: {backgroundColor:'#fff',padding:10,flexDirection:'row',alignItems:'center'},
  MembershipInner1: {width:'30%'},
  MembershipInner1Icon: {fontSize:50,paddingHorizontal:10,alignSelf:'center'},
  MembershipInner2: {width:'70%',borderLeftWidth:1,borderColor:'#eee',paddingLeft:10},
  MembershipInnerText: {fontSize:17,color:'#555'},
  MembershipInnerTextspan: {fontWeight:'700',color:'green'},

  CancelBlock: {backgroundColor:'#fff',flexDirection:'row',alignItems:'center',padding:10,borderWidth: 1, borderColor: '#ddd', borderRadius:10,marginHorizontal:5, },
  CancelInner1: {width:'70%'},
  CancelInnerText1: {fontSize:14,color:'#555'},
  CancelInner2: {width:'30%',paddingLeft:10,alignItems:'center'},
  CancelInnerText2: {fontSize:14,color:'#fff',paddingHorizontal:15,paddingBottom:1,borderRadius:10,backgroundColor:'red'},
  
  pointsblock: {borderWidth: 1,borderColor: '#ddd',borderRadius:10,padding: 10,width:'100%',backgroundColor:'#fff'},
  pointsText: {fontSize:15,paddingLeft:10,flexDirection:'column',color:'#fff'},

  DeliveryHead:{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1,borderColor:'#eee',marginHorizontal:-10,paddingHorizontal:10,paddingBottom:10},
  DeliveryHeadItem:{fontSize:12,color:'#2c69bc',fontWeight:'700'},

  deliveyDateEach:{fontSize:12,color:'#777'},

})

export default CartScreen;
