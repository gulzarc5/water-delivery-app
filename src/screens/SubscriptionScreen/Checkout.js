import React, { useState,useContext,useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import  Mainstyles from '../../assets/style';
import HeaderComponent from '../../components/Checkout/Header'
import AddressComponent from '../../components/Subscription/Address'
import ShiftRadioButton from '../../components/RadioButton/ShiftRadioButton';
import {DateTimePickerModal} from "react-native-modal-datetime-picker";
import IconF5 from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../components/navigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewAddressComponent from '../../components/Subscription/NewAddress'

import { ProgressDialog } from 'react-native-simple-dialogs';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';

 const paymentOptions = [
  {
    key: 1,
    text: 'Online',
    label: 'Pay With Payment Gateway',
  },
  {
    key: 2,
    text: 'Cash On Delivery',
    label: 'Pay At The Time Of Delivery',
  },
];
const shiftOptions = [
  {
    key: 1,
    text: 'Morning Shift',
    subtext: '10Am - 1Pm',
  },
  {
    key: 2,
    text: 'Evening Shift',
    subtext: '4Pm - 7PM',
  },
];

 const CheckoutScreen = ({route,navigation}) => {  
  const {authContext, loginState, dispatch} = useContext(AuthContext);
  const [date, setDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [shiftOption, setShiftOption] = useState({key: 1})
  const plan = route.params.plan;
  const [address,setAddress] = useState();
  const [selectedAddress,setSelectedAddress] = useState(null);
  const [errors,setErrors]=useState(null);  
  const [mounted, setMounted] = useState(false); 
  
  console.log(route.params);

  const [isProgress,setIsProgress] = useState(false);
  const [isProgressCheckout,setIsProgressCheckout] = useState(true);
  const [data,setData] = useState({
    subscription_details_id:route.params.plan.id,
    quantity : route.params.data.quantity,
    frequency : route.params.data.frequency,
    is_jar : route.params.data.jar,
    delivery_address_id : '',
    delivery_slot_id:1,
    delivery_start_date:'',
  })
  console.log(data.frequency);
  const [addressAddModalVisible, setAddressAddModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); 
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
 
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    setData({
      ...data,
      delivery_start_date: date.toISOString().slice(0,10)
    });
    hideDatePicker();
  };

  const onSelectShift = (item) => {
      setShiftOption(item);
      setData({
        ...data,
        delivery_slot_id: item.key
      })
  };

  const onselectAddress=(address)=>{
    setSelectedAddress(address);
    setData({
      ...data,
      delivery_address_id:address.id
    })
    setModalVisible(false);
  }

  const tomorrowDate = ()=>{
    const today = new Date()
    let tomorrow =  new Date()
    tomorrow.setDate(today.getDate() + 1)
    return tomorrow;
  }

  const onAddressAdd = async(addedAddress)=>{
    setAddressAddModalVisible(false);  
    setAddress(address => [addedAddress,...address] );
    setSelectedAddress(addedAddress);
    setData({
      ...data,
      delivery_address_id:addedAddress.id
    })
    dispatch({type: 'FETCH_ADDRESS', address});
  }

  const fetchUserAddress = async() => {
    try {
        const user = await AsyncStorage.getItem('user');
        const modifiedUser = JSON.parse(user);
        axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
        const response = await axios.get('user/address/list');
        if (response.data.status !== true) {
          ToastAndroid.showWithGravity(
            response.data.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }
        if (response.data.status == true) {
          setAddress(response.data.data);
          setSelectedAddress(response.data.data[0]);
          dispatch({ type: 'FETCH_ADDRESS', address: response.data.data });
          setData({
            ...data,
            delivery_address_id:response.data.data[0].id
          })
          setIsProgressCheckout(false);
        }
      } catch (error) {
        console.warn(error);
      }
  }

  const placeOrder = async() => {
    console.log(data);
    try{
      setIsProgress(true);
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
      const response = await axios.post('/order/subscription/place', data);
      
      if(response.data.status !== true) {
        if (response.data.error_code) {
          setErrors(response.data.error_message);
        } else {    
          alert(response.data.message);
        }
        setIsProgress(false);
      }
      if(response.data.status === true) {
        setIsProgress(false);
        onlinePay(response.data);
      }
      setIsProgress(false);
    }catch (error) {
      setIsProgress(false);
      alert("Something Went Wrong Please Close The App And Try Again");
    }  
  }

  const onlinePay = async(response)=>{
    var options = {
      description: 'Pyaas Water Booking Payment',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: response.data.payment_data.key_id,
      amount: response.data.payment_data.amount,
      name: 'Pyaas',
      order_id: response.data.payment_data.order_id,//Replace this with an order_id created using Orders API.
      prefill: {
        email: response.data.payment_data.email,
        contact: response.data.payment_data.mobile,
        name: response.data.payment_data.name
      },
      theme: {color: '#53a20e'}
    }
    RazorpayCheckout.open(options).then((data) => {
       paymentVerify(response,data);
    }).catch((error) => {
      // handle failure
      alert(`Error: "Sorry Payment Failed"`);
    });
  }

  const paymentVerify = async(response_data,paymentData)=>{
    setIsProgress(true);
    console.log("response",response_data.data.order.id);
    console.log("Payment Data",paymentData);
    try{
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      const verifyData = {
        razorpay_order_id:paymentData.razorpay_order_id,
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_signature: paymentData.razorpay_signature,
        order_id : response_data.data.order.id,
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
      const response = await axios.post('/order/subscription/payment/verify', verifyData);
      
      if(response.data.status !== true) {
        alert("Sorry Payment Failed");
        setIsProgress(false);
      }
      if(response.data.status === true) { 
        setIsProgress(false);  
        navigation.navigate('SConfirm', {data: response_data});
      }
    }catch(error){
      console.log(error);
      setIsProgress(false);
    }
  }

  useEffect(() => {
    if (!mounted) {           
      fetchUserAddress();  
    }
    setMounted(true);
  }, []);    

  return (
    <View>
      {/* Header */}
      <HeaderComponent  navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false} style={{height:'83.8%'}}>
      <ProgressDialog
        visible={isProgress}
        titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
        messageStyle={{color:'#333'}}
        dialogStyle={{borderRadius:10}}
        title="Placing Your Order"
        message="Please, wait..."
      />
      <ProgressDialog
        visible={isProgressCheckout}
        titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
        messageStyle={{color:'#333'}}
        dialogStyle={{borderRadius:10}}
        title="Loading Checkout Info"
        message="Please, wait..."
      />
        {/* Divider */}
        <View style={Mainstyles.divider}></View>
        
        {/* Deliver Block */}
        <View style={styles.addressBlock}>
          <View style={styles.addressHeader}>
            <Text style={{ fontSize: 12, color: '#333', fontWeight:'700', letterSpacing: 2 }}>DELIVERY ADDRESS</Text>
            {errors && errors.delivery_address_id && (<Text style={{color:'red'}}>{errors.delivery_address_id}</Text>)}
          </View>   
          {selectedAddress && (
            
          <View>
              <View style={styles.addressArea}>
                <Text style={{color:'#2c69bc',fontWeight:'700',fontSize:15,marginBottom:2}}>{selectedAddress.name}</Text>
                <Text style={{fontSize:14,marginBottom:-2}}>{selectedAddress.main_location_name} , {selectedAddress.sub_location_name}</Text>
                <Text style={{fontSize:14,marginBottom:-2}}><Text style={{color:'#777',fontSize:13}}>Flat No :</Text> {selectedAddress.flat_no}</Text>
                <Text style={{fontSize:14,marginBottom:-2}}>{selectedAddress.address_one}</Text>
                {/* <Text style={{fontSize:14,marginBottom:-2}}><Text style={{color:'#777',fontSize:13}}>House No :</Text> 56/1</Text> */}
                <Text style={{fontSize:14,marginBottom:-2}}><Text style={{color:'#777',fontSize:13}}>Landmark :</Text> {selectedAddress.landmark}</Text>
                <Text style={{fontSize:14,marginBottom:-2}}><Text style={{color:'#777',fontSize:13}}>Mobile :</Text> {selectedAddress.mobile}</Text>
                <Text style={{fontSize:14,marginBottom:-2}}><Text style={{color:'#777',fontSize:13}}>Pin :</Text> {selectedAddress.pin}</Text>
              </View>
              <TouchableOpacity style={{borderWidth:1,borderColor:'#ddd',padding: 4,alignItems:'center',backgroundColor:'#2c69bc'}} onPress={() => setModalVisible(true)}>
                <Text style={{fontSize:14,color:'#fff'}}>Change Address</Text>
              </TouchableOpacity>
            </View>
          )}     
          {/* Address List Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <AddressComponent data={address} onselectAddress={onselectAddress} selectedAddress={selectedAddress} setModalVisible={setModalVisible} setAddressAddModalVisible={setAddressAddModalVisible} />
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <IconF5 name='angle-double-down' color='black' style={{fontSize:25}} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
           {/* Address Add Modal */}
           <Modal
            animationType="slide"
            transparent={true}
            visible={addressAddModalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setAddressAddModalVisible(!addressAddModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={[styles.modalView,{height:'100%',paddingTop: 0,}]}>                
                <View style={styles.header}>
                  <View style={styles.headerRow}>
                    {/* Back Button */}
                    <TouchableOpacity activeOpacity={.9} style={{width:'10%'}} onPress={() => setAddressAddModalVisible(!addressAddModalVisible)}>
                        <Icon name="angle-left" style={styles.menuIcon}/>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Add New Address</Text>
                  </View>
                </View>
                <NewAddressComponent onAddressAdd={onAddressAdd} />
              </View>
            </View>
          </Modal>
        </View>

        {/* Divider */}
        <View style={Mainstyles.divider}></View>
        
        {/* Cart */}      
        <View style={styles.cartSection}>
          <View style={styles.PaymentInner}>              
            <View style={styles.addressHeader}>
              <Text style={{ fontSize: 12, color: '#333', fontWeight:'700', letterSpacing: 2 }}>MEMBERSHIP</Text>
              {errors && errors.subscription_details_id && (<Text style={{color:'red'}}>{errors.subscription_details_id}</Text>)}
            </View>
            <View style={styles.productBlock}>
              <View style={styles.productCompanyBlock}>
                <Text style={[styles.productCompany, {backgroundColor:'#C99738',}]}>{plan.plan_name}</Text>
              </View>
              <Text style={[styles.productName, {color:'#C99738',}]}>{plan.brand_name}</Text>
              <Text style={styles.productQuantity}>Duration {plan.duration} Days</Text>
              <Text style={{fontSize: 12,fontWeight:"700",color:'#000', textAlign:'left'}}>
              Qty: <Text style={{fontWeight:"500"}}> {data.quantity}</Text> &nbsp;|&nbsp; 
              Total Bottle: <Text style={{fontWeight:"500"}}> {data.frequency == 1 ? plan.duration : (plan.duration/2)} Bottles </Text>&nbsp;|&nbsp; 
              Deliver Frequency: <Text style={{fontWeight:"500"}}> {data.frequency == 1 ? "Daily" : "Alternative"}</Text>     
              </Text>
            </View> 
          </View> 

          {/* Divider */}
          <View style={Mainstyles.divider}></View>

          {/* Delivery Shift */}      
          <View style={styles.DeliveryInner}>
            <Text style={{ fontSize: 12, marginBottom: 10, color: '#333', fontWeight:'700', letterSpacing: 2 }}>1st DELIVERY DATE & SHIFT</Text>
            {/* {errors && errors.delivery_slot && (<Text style={{color:'red'}}>{errors.delivery_slot}</Text>)} */}
            <TouchableOpacity onPress={showDatePicker} style={styles.dateBlock} >
              <Text> {date ? date.toISOString().slice(0,10) : "-- DD/MM/YYYY --"} </Text>
              {/* {errors && errors.delivery_date && (<Text style={{color:'red'}}>{errors.delivery_date}</Text>)} */}
            </TouchableOpacity>
            {errors && errors.delivery_start_date && (<Text style={{color:'red'}}>{errors.delivery_start_date}</Text>)}
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              minimumDate={tomorrowDate()}
            />
            <View style={{alignItems:'flex-start',flexDirection:'row'}}>
              <ShiftRadioButton
                selectedOption={shiftOption}
                onSelect={onSelectShift}
                options={shiftOptions}
              />
            </View>
            {errors && errors.delivery_slot_id && (<Text style={{color:'red'}}>{errors.delivery_slot_id}</Text>)}
          </View>

          {/* Divider */}
          <View style={Mainstyles.divider}></View>
          
          {/* Cart Value */}
          <View style={styles.cartValueBlock}>
            <Text style={styles.cartValueHeaderText}>Price Detail</Text>
            <View style={styles.cartValuePriceBlock}>
              <View style={[styles.cartValueInnerBlock, {alignItems:'center'}]}>
                <Text>
                  Cart Value {'\n'}
                  <Text style={{ fontSize:10, color: '#777' }}>(incl. of all taxes)</Text>  
                </Text>
                <Text>₹ {((data.frequency == 1 ? plan.duration : (plan.duration/2)) * plan.mrp) * data.quantity}</Text>
              </View>
              <View style={styles.cartValueInnerBlock}>
                <Text>Discount</Text>
                <Text style={{color:'green'}}>- ₹ {(((data.frequency == 1 ? plan.duration : (plan.duration/2)) * plan.mrp) * data.quantity)-(((data.frequency == 1 ? plan.duration : (plan.duration/2)) * plan.price) * data.quantity)}</Text>
              </View>
              {data.jar == 1 && (
                <View style={styles.cartValueInnerBlock}>
                  <Text>Jar Price</Text>
                  <Text style={{color:'#333'}}>+₹ {plan.jar_price*data.quantity}</Text>
                </View>
              )}
              <View style={[styles.cartValueInnerBlock, {paddingBottom:0, }]}>
                <Text>Delivery Charges</Text>
                <Text style={{color:'green'}}>Free</Text>
              </View>
            </View>
            <View style={styles.cartValueTotalBlock}>
              <Text style={styles.cartValueTotalBlockText}>Total Amount</Text>
              <Text style={styles.cartValueTotalBlockText}>₹ {(((data.frequency == 1 ? plan.duration : (plan.duration/2)) * plan.price) * data.quantity)+((data.is_jar == 1)?(plan.jar_price*data.quantity):0)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.fixedButtonBlock}>
        <View style={styles.fixedButton1}>
          <Text style={styles.fixedButton1Text}>₹ {(((data.frequency == 1 ? plan.duration : (plan.duration/2)) * plan.price) * data.quantity)+((data.is_jar == 1)?(plan.jar_price*data.quantity):0)}</Text>
          <Text style={styles.fixedButton1TextOther}>Total Amount</Text>
        </View>
        <TouchableOpacity style={styles.fixedButton2} onPress={() => placeOrder()}>
          <Text style={styles.fixedButton2Text}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};
const styles = StyleSheet.create({
  header: { justifyContent: 'center', alignItems:'center', paddingLeft: 10, paddingRight:10, paddingBottom:10, backgroundColor:'#fff', shadowColor: "#000", shadowOffset: {width: 0, height: 4,}, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 10,},
  
  headerText: {fontSize:30, fontWeight:"700",color:'#fff'},
  headerRow : {flexDirection: 'row',justifyContent:'space-between',width:'100%'},

  addressBlock:{backgroundColor:'#fff',padding: 10, marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,},
  addressHeader:{flexDirection:'row',justifyContent:'space-between'},
  addressArea:{paddingVertical:10,},
  
  productCompanyBlock: {display:'flex',flexWrap:'wrap',marginTop:10},
  productCompany: {fontSize:14,color:'#fff',paddingLeft:10,paddingRight:10, paddingBottom:0,borderRadius:15},
  productName: {fontSize: 22,color:'#333',fontWeight:'700',},
  productQuantity: {fontSize: 13,color:'green',marginBottom:5},
  productPrice: {fontSize: 25,color:'#2c69bc', textAlign:'left',fontWeight:'700'},
  productBlockInfo:{padding: 15, paddingVertical:10},
  productFeatureItem:{fontSize:12,color:'#777', textAlign:'justify'},

  cartSection: {backgroundColor:'#eee'},
  
  DeliveryInner: {backgroundColor:'#fff',padding: 10, marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,},
  dateBlock: { fontSize: 13, marginBottom: 15, color: '#777', backgroundColor: '#eee', padding: 7, borderWidth: 1, borderColor: '#bbb', borderRadius: 5 },

  PaymentInner: {backgroundColor:'#fff',padding: 10, marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,},
  radioBtn: {borderWidth:5},
  
  CouponInner: {backgroundColor:'#fff',padding: 10, marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,},
  CouponMainBlock: {flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:5,backgroundColor:'#eee',marginTop:5,borderRadius:5},
  CouponMainBlockInner: {flexDirection:'row',alignItems:'center'},

  cartValueBlock: {backgroundColor:'#fff',marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,},
  cartValueHeaderText: {fontWeight:'700',borderBottomWidth:1,borderColor:'#eee',padding:10,color:'#333'},
  cartValuePriceBlock: {padding:10,},
  cartValueInnerBlock: {flexDirection:'row',justifyContent:'space-between',paddingBottom:5},
  cartValueTotalBlock: {flexDirection:'row',justifyContent:'space-between',paddingTop:5,borderTopWidth:1,borderColor:'#eee',borderStyle:'dashed',padding:10,borderRadius: 5},
  cartValueTotalBlockText: {fontWeight:'700'},

  fixedButtonBlock: {flexDirection:'row',justifyContent:'space-around',backgroundColor:'#eee',alignSelf:'center',justifyContent:'center'},
  fixedButton1: {padding: 15,width:'50%',justifyContent:'center'},
  fixedButton1Text: {textAlign:'center',color:'#333',fontWeight:'700',marginTop:-8},
  fixedButton1TextOther: {textAlign:'center',color:'#2c69bc',fontSize:12,fontWeight:'700'},
  fixedButton2: {padding: 15,backgroundColor:'#2c69bc',width:'50%',justifyContent:'center',color:'#fff'},
  fixedButton2Text: {textAlign:'center',color:'#fff',marginTop:-11},

  centeredView: {flex: 1,justifyContent: "center",alignItems: "center",marginTop: 0,backgroundColor: "#434246a3",},
  modalView: {position:'absolute',bottom:0,width:'100%',height:'50%',backgroundColor: "white",paddingTop: 15, },
  buttonClose: {backgroundColor: "#fff",position:'absolute',top:-10,right:10,paddingHorizontal:15,paddingVertical:5,borderTopStartRadius: 10,borderTopEndRadius: 10 },
  textStyle: { color: "white", fontWeight: "bold", textAlign: "center" },
  modalText: {marginBottom: 15,textAlign: "center" },
  
  header: { justifyContent: 'center', alignItems:'center', padding: 10, backgroundColor:'#2c69bc',  },
  headerText: {fontSize:20, fontWeight:"500",color:'#fff', paddingTop:11,},
  headerRow : {flexDirection: 'row',justifyContent:'flex-start',width:'100%'},
  menuIcon: {fontSize:40,color:'#fff',alignSelf:'flex-start', justifyContent:'center', paddingTop:5,},
})

export default CheckoutScreen;
