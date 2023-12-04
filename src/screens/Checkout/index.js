import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Modal, Dimensions } from 'react-native';
import  Mainstyles from '../../assets/style';
import HeaderComponent from '../../components/Checkout/Header'
import LoaderComponent from '../../components/CommonScreen/Loader'
import CouponComponent from './Coupon'
import Icon from 'react-native-vector-icons/AntDesign';
import IconF5 from 'react-native-vector-icons/FontAwesome';
import CartSummary from '../Cart/CartSummary';
import { AuthContext } from '../../components/navigation/StackNavigator';
import RadioButton from '../../components/RadioButton';
import ShiftRadioButton from '../../components/RadioButton/ShiftRadioButton';
import {DateTimePickerModal} from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ConfirmDialog,ProgressDialog } from 'react-native-simple-dialogs';
import RazorpayCheckout from 'react-native-razorpay';
import AddressComponent from '../../components/Subscription/Address'
import NewAddressComponent from '../../components/Subscription/NewAddress'

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

const CheckoutScreen = ({route}) => {  
  const {authContext, loginState, dispatch} = useContext(AuthContext);
  const [isProgress,setIsProgress] = useState(false);
  const [cartList, setCartList] = useState(loginState.cartData ? loginState.cartData.cart : []);
  const [cartTotal, setCartTotal] = useState(loginState.cartData ? loginState.cartData.cart_total : null);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const [address,setAddress] = useState(null);
  const [allAddress,setAllAddress] = useState([]);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState({key: 2});
  const [shiftOption, setShiftOption] = useState({key: 1})
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  // console.log(appliedCoupon);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [isCouponProgress,setIsCouponProgress] = useState(false); // only use for online Order
  const [isProgressCheckout,setIsProgressCheckout] = useState(true); // only use for online Order

  const [addressAddModalVisible, setAddressAddModalVisible] = useState(false);
  const [addressModalVisible, setAddressModalVisible] = useState(false); 
  const [mounted, setMounted] = useState(false); 
  const [coupons, setCoupons] = useState([]); 

  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState();
  const [data, setData] = useState({
    payment_type: selectedPaymentOption.key,
    address_id: '',
    delivery_date: '',
    delivery_slot: 1,
    coupon_code : '',
  })


   const [errors,setErrors] = useState(null);

   const onCouponApply = (coupon)=>{
    setAppliedCoupon(coupon);
      console.log("Data Set");
      setData({
        ...data,
        coupon_code: coupon.coupon
      })
      setModalVisible(!modalVisible);
   }

   const removeCoupon = () => {
    setData({
      ...data,
      coupon_code: '',
    })
    setAppliedCoupon(false);
    setCouponDiscount(0);
    console.log(data);
   }

   const onChangeAddress = (addr)=>{
    setAddressModalVisible(false);
     setAddress(addr);
     setData({
        ...data,
        address_id:addr.id
      });
   }
   const onAddressAdd = async(addedAddress)=>{
    setAddressAddModalVisible(false);  
    setAllAddress(allAddress => [addedAddress,...allAddress] );
    setAddress(addedAddress);
    setData({
      ...data,
      address_id:addedAddress.id
    })
    dispatch({type: 'FETCH_ADDRESS', address});
  }

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
       delivery_date: date.toISOString().slice(0,10)
     });
     hideDatePicker();
   };
  const onSelect = (item) => {
    setSelectedPaymentOption(item);
    setData({...data,payment_type:item.key});
  };

  const onSelectShift = (item) => {
      setShiftOption(item);
      setData({
        ...data,
        delivery_slot: item.key
      })
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
          setAllAddress(response.data.data);
          setAddress(response.data.data[0]);
          dispatch({ type: 'FETCH_ADDRESS', address: response.data.data });
          setData({
            ...data,
            address_id:response.data.data[0].id
          })
          setIsProgressCheckout(false);
        }
      } catch (error) {
        console.warn(error);
      }
  }
  const fetchCoupons = async() => {
    try {
        const user = await AsyncStorage.getItem('user');
        const modifiedUser = JSON.parse(user);
        axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
        const response = await axios.get('order/coupon/fetch');
        if (response.data.status !== true) {
          ToastAndroid.showWithGravity(
            response.data.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }
        if (response.data.status == true) {
          console.log(response.data.coupons);
          setCoupons(response.data.coupons);
          setIsProgressCheckout(false);
        }
      } catch (error) {
        console.warn("error");
      }
  }

  const placeOrder = async() => {
    console.log(data);
    try{
      setIsProgress(true);
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
      const response = await axios.post('/order/place', data);
      
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
        if (response.data.data.payment) {
          onlinePay(response.data);
        } else {          
          navigation.navigate('ConfirmScreen', {data: response.data});
        }
      }
      setIsProgress(false);
    }catch (error) {
      console.log(error);setIsProgress(false);
      alert("Something Went Wrong Please Close The App And Try Again");
    }  
  }

  const onlinePay = async(response)=>{
    var options = {
      description: 'Pyaas Water Booking Payment',
      image: 'https://pyaas.in/web/images/pyaas-logo.png',
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
      console.log("calling payment verify called");
       paymentVerify(response,data);
    }).catch((error) => {
      // handle failure
      alert(`Error: "Sorry Payment Failed"`);
    });
  }

  const paymentVerify = async(response_data,paymentData)=>{
    console.log("payment verify called");
    setIsProgress(true);
    try{
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      const verifyData = {
        razorpay_order_id:paymentData.razorpay_order_id,
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_signature: paymentData.razorpay_signature,
        order_id : response_data.data.id,
      }
      console.log(modifiedUser);
      console.log(verifyData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
      const response = await axios.post('/order/payment/verify', verifyData);
      
      if(response.data.status !== true) {
        alert("Sorry Payment Failed");
        setIsProgress(false);
      }
      console.log(response);
      if(response.data.status === true) { 
        setIsProgress(false);  
        navigation.navigate('ConfirmScreen', {data: response_data});
      }
    }catch(error){
      console.log(error);
      setIsProgress(false);
    }
  }

  const fetchCartData = async()=>{
    try {
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
      const response = await axios.get('/cart/list');
      
      if (response.data.status !== true) {
        setIsProgress(false);
        alert(response.data.message);
      }
      if (response.data.status == true) {
        setCartList(response.data.data.cart);
        setCartTotal(response.data.data.cart_total);
        dispatch({ type: 'FETCH_CART', data: response.data.data });
        setIsProgress(false);
      }
    } catch (error) {
      alert("Something Wrong Please Close The App And Open Again");
    }
  }

  const tomorrowDate = ()=>{
    const today = new Date()
    let tomorrow =  new Date()
    tomorrow.setDate(today.getDate() + 1)
    return tomorrow;
  }

  useEffect(() => {
    if (!mounted) {
      fetchCartData();
      fetchUserAddress();    
      fetchCoupons();
    }
    setMounted(true);
  },[])

  if(loginState.placeOrderLoading ) {
    return(
      <LoaderComponent />
    );
  }
  return (
    <View>
      {/* Header */}
      <HeaderComponent  navigation={navigation} />
      <ProgressDialog
        visible={isProgress}
        titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
        messageStyle={{color:'#333'}}
        dialogStyle={{borderRadius:10}}
        title="Placing Your Order"
        message="Please, wait..."
      />
      <ProgressDialog
        visible={isCouponProgress}
        titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
        messageStyle={{color:'#333'}}
        dialogStyle={{borderRadius:10}}
        title="Checking Coupon"
        message="Please, wait..."
      />
      <ProgressDialog
        visible={isProgressCheckout}
        titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
        messageStyle={{color:'#333'}}
        dialogStyle={{borderRadius:10}}
        title="Loading Checkout"
        message="Please, wait..."
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{height:'83.3%'}}>

        {/* Divider */}
        <View style={Mainstyles.divider}></View>
        
        {/* Deliver Block */}
        {address && (
         <View style={styles.addressBlock}>
          <View style={styles.addressHeader}>
            <Text style={{ fontSize: 12, color: '#333', fontWeight:'700', letterSpacing: 2 }}>DELIVERY ADDRESS</Text>
            {errors && errors.address_id && (<Text style={{color:'red'}}>{errors.address_id}</Text>)}
          </View>
          
          <View style={styles.addressArea}>
            <Text style={{color:'#2c69bc',fontWeight:'700',fontSize:15,marginBottom:2}}>{address.name}</Text>
            <Text style={{fontSize:14,marginBottom:-2}}>{address.address_one}</Text>
            <Text style={{fontSize:14,marginBottom:-2}}>{address.address_two}</Text>
            <Text style={{fontSize:14,marginBottom:-2}}><Text style={{color:'#777',fontSize:13}}>Flat No :</Text> {address.flat_no}</Text>
            <Text style={{fontSize:14,marginBottom:-2}}><Text style={{color:'#777',fontSize:13}}>House No :</Text> {address.house_no}</Text>
            <Text style={{fontSize:14,marginBottom:-2}}><Text style={{color:'#777',fontSize:13}}>Landmark :</Text> {address.landmark}</Text>
          </View>
          
           
          <TouchableOpacity style={{borderWidth:1,borderColor:'#ddd',padding: 4,alignItems:'center',backgroundColor:'#2c69bc'}}  onPress={() => setAddressModalVisible(true)}>
            <Text style={{fontSize:14,color:'#fff'}}>Change or Add Address</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={addressModalVisible}
            onRequestClose={() => {
              alert("Modal has been closed.");
              setAddressModalVisible(!addressModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <AddressComponent data={allAddress} onselectAddress={onChangeAddress} selectedAddress={address} setModalVisible={setAddressModalVisible} setAddressAddModalVisible={setAddressAddModalVisible} />
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setAddressModalVisible(!addressModalVisible)}
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
              alert("Modal has been closed.");
              setAddressAddModalVisible(!addressAddModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={[styles.modalView,{height:'100%',paddingTop:0}]}>                
                <View style={styles.header}>
                  <View style={styles.headerRow}>
                    {/* Back Button */}
                    <TouchableOpacity activeOpacity={.9} style={{width:'10%'}} onPress={() => setAddressAddModalVisible(!addressAddModalVisible)}>
                        <IconF5 name="angle-left" style={styles.menuIcon}/>
                    </TouchableOpacity>
                    <Text style={{paddingTop:11,fontSize:20, fontWeight:"500",color:'#fff',}}>Add New Address</Text>
                  </View>
                </View>
                <NewAddressComponent onAddressAdd={onAddressAdd} />
              </View>
            </View>
          </Modal>
        </View> )}



        {/* Divider */}
        <View style={Mainstyles.divider}></View>

        {/* Delivery Shift */}      
        <View style={styles.DeliveryInner}>
          <Text style={{ fontSize: 12, marginBottom: 10, color: '#333', fontWeight:'700', letterSpacing: 2 }}>DELIVERY DATE</Text>
          {errors && errors.delivery_slot && (<Text style={{color:'red'}}>{errors.delivery_slot}</Text>)}
          <TouchableOpacity onPress={showDatePicker} style={styles.dateBlock} >
            <Text> {date ? date.toISOString().slice(0,10) : "-- DD/MM/YYYY --"} </Text>
            {errors && errors.delivery_date && (<Text style={{color:'red'}}>{errors.delivery_date}</Text>)}
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            minimumDate={tomorrowDate()}
          />
          {/* <View style={{alignItems:'flex-start',flexDirection:'row'}}>
            <ShiftRadioButton
              selectedOption={shiftOption}
              onSelect={onSelectShift}
              options={shiftOptions}
            />
          </View> */}
        </View>

        {/* Divider */}
        <View style={Mainstyles.divider}></View>
        
        {/* Payment */}      
        <View style={styles.PaymentInner}> 
          <View style={styles.addressHeader}>
            <Text style={{ fontSize: 12, color: '#333', fontWeight:'700', letterSpacing: 2 }}>PAYMENT</Text>
            {errors && errors.payment_type && (<Text style={{color:'red'}}>{errors.payment_type}</Text>)}
          </View>
          <View style={{alignItems:'flex-start',paddingTop:15}}>
            <RadioButton
              selectedOption={selectedPaymentOption}
              onSelect={onSelect}
              options={paymentOptions}
            />
          </View>
        </View>
        
        {/* Divider */}
        <View style={Mainstyles.divider}></View>
        
        {/* Coupon */}      
        <View style={styles.CouponInner}> 
          <View style={styles.addressHeader}>
            <Text style={{ fontSize: 12, color: '#333', fontWeight:'700', letterSpacing: 2 }}>COUPON</Text>
          </View>
          {appliedCoupon ? (
            <TouchableOpacity style={styles.CouponMainBlock} onPress={() => removeCoupon()}>
              <View style={styles.CouponMainBlockInner}>
                <Icon name='tagso' color='green' style={{fontSize:25,marginRight:10}} />
                <View style={{flexDirection:'column',width:'90%'}} >
                  <Text style={{color:'#000',fontWeight:'bold',fontSize:14}}>{appliedCoupon.coupon}</Text>
                  <Text style={{color:'#000',fontSize:10}} numberOfLines={1}>{appliedCoupon.description}</Text>                
                  <Text style={{color:'#FF0000',fontWeight:'bold',fontSize:10}}>remove</Text>
                </View>
              </View>
            {/* <Icon name='right' color='#aaa' style={{fontSize:20}} /> */}
          </TouchableOpacity>  
          ):(
            <TouchableOpacity style={styles.CouponMainBlock} onPress={() => setModalVisible(true)}>
              <View style={styles.CouponMainBlockInner}>
                <Icon name='tagso' color='#333' style={{fontSize:25,marginRight:10}} />
                <Text >Apply Coupon</Text>
              </View>
              <Icon name='right' color='#aaa' style={{fontSize:20}} />
            </TouchableOpacity>  
          )}
       
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <CouponComponent
                coupons={coupons}
                onCouponApply={onCouponApply}
                setIsCouponProgress={setIsCouponProgress}
                setCouponDiscount={setCouponDiscount}
                totalAmount={cartTotal.total_amount}
                />
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <IconF5 name='angle-double-down' color='black' style={{fontSize:25}} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>  
                          
        </View> 
        
        {/* Divider */}
        <View style={Mainstyles.divider}></View>
        
        {/* Cart Value */}
        {
          cartList && cartList.length != 0 && (
          <CartSummary cartTotal={cartTotal} couponDiscount={couponDiscount} screenType={2}/>
          )
        }
        {/* Divider */}
        <View style={Mainstyles.divider}></View>
      </ScrollView>
      { cartList && cartList.length != 0 && (
      <View style={styles.fixedButtonBlock}>
        <View style={styles.fixedButton1}>
          <Text style={styles.fixedButton1Text}>₹ {(cartTotal.total_amount+cartTotal.shipping_charge)- (couponDiscount ? couponDiscount : 0)-cartTotal.coins}</Text>
          <Text style={styles.fixedButton1TextOther}>View price detail</Text>
        </View>
        <TouchableOpacity style={styles.fixedButton2} onPress={() => placeOrder()}>
          <Text style={styles.fixedButton2Text}>Place Order</Text>
        </TouchableOpacity>
      </View>
      )}
    
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

  cartSection: {backgroundColor:'#eee', shadowColor: "#000", shadowOffset: {width: 0, height: 4,}, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 8},

  DeliveryInner: {backgroundColor:'#fff',padding: 10, marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,},
  dateBlock: { fontSize: 13, marginBottom: 15, color: '#777', backgroundColor: '#eee', padding: 7, borderWidth: 1, borderColor: '#bbb', borderRadius: 5 },

  PaymentInner: {backgroundColor:'#fff',padding: 10, marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,},
  radioBtn: {borderWidth:5},
  
  CouponInner: {backgroundColor:'#fff',padding: 10, marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,},
  CouponMainBlock: {flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:5,backgroundColor:'#eee',marginTop:5,borderRadius:5},
  CouponMainBlockInner: {flexDirection:'row',alignItems:'center'},

  cartValueBlock: {backgroundColor:'#fff', marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,},
  cartValueHeaderText: {fontWeight:'700',borderBottomWidth:1,borderColor:'#eee',padding:10,color:'#333'},
  cartValuePriceBlock: {padding:10,},
  cartValueInnerBlock: {flexDirection:'row',justifyContent:'space-between',paddingBottom:5},
  cartValueTotalBlock: {flexDirection:'row',justifyContent:'space-between',paddingTop:5,borderTopWidth:1,borderColor:'#eee',borderStyle:'dashed',padding:10,borderRadius: 5},
  cartValueTotalBlockText: {fontWeight:'700'},

  fixedButtonBlock: {flexDirection:'row',justifyContent:'space-around',backgroundColor:'#fff', shadowColor: "#000", shadowOffset: {width: 0, height: 0,}, shadowOpacity: 0.90, shadowRadius: 4.65, elevation: 100,alignSelf:'center',justifyContent:'center',position:'relative',zIndex:9},
  fixedButton1: {padding: 15,width:'50%',justifyContent:'center'},
  fixedButton1Text: {textAlign:'center',color:'#333',fontWeight:'700',marginTop:-8},
  fixedButton1TextOther: {textAlign:'center',color:'#2c69bc',fontSize:12,fontWeight:'700'},
  fixedButton2: {padding: 15,backgroundColor:'#2c69bc',width:'50%',justifyContent:'center',color:'#fff'},
  fixedButton2Text: {textAlign:'center',color:'#fff',marginTop:-11},
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#434246a3",
  },
  modalView: {
    position:'absolute',
    bottom:0,
    width:'100%',
    height:'50%',
    backgroundColor: "white",
    paddingTop: 15,
  },
  buttonClose: {
    backgroundColor: "#fff",
    position:'absolute',
    top:-10,
    right:10,
    paddingHorizontal:15,
    paddingVertical:5,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  
  header: { justifyContent: 'center', alignItems:'center', padding: 10, backgroundColor:'#2c69bc',  },
  headerText: {fontSize:20, fontWeight:"500",color:'#fff', paddingTop:11,},
  headerRow : {flexDirection: 'row',justifyContent:'flex-start',width:'100%'},
  menuIcon: {fontSize:40,color:'#fff',alignSelf:'flex-start', justifyContent:'center', paddingTop:5,},
})

export default CheckoutScreen;
