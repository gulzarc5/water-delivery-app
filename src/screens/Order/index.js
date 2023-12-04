
import React, { useContext, useEffect,useState } from 'react';
import { RefreshControl,StyleSheet, Text, View, Image,  ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import  Mainstyles from '../../assets/style';
import HeaderComponent from '../../components/Order/Header'
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../components/navigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import OrderStatus from '../../components/Order/OrderStatus';
import PaymentStatus from '../../components/Order/PaymentStatus';
import {ProgressDialog } from 'react-native-simple-dialogs';
import NoDataFound from '../../components/NoDataFound/NoDataFound';
import RazorpayCheckout from 'react-native-razorpay';
  
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
const paddingToBottom = 0;
return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

const OrdersScreen = ({navigation}) => {  
    const {authContext, loginState, dispatch} = useContext(AuthContext);
    const [isProgress,setIsProgress] = useState(true);
    const [isProgressMore,setIsProgressMore] = useState(false);
    const [paymentVisible,setPaymentVisible] = useState(false);
    const [orders, setOrders] = useState([]);
    const [pagination,setPagination] = useState({
        currentPage : 1,
        totalPage : 1,
    });
    const paginationCall = ()=>{
        if (pagination.totalPage != pagination.currentPage) {
            setIsProgressMore(true);
            fetchOrders(1);          
        }
    }

    const fetchOrders= async (status=null) => {
        let response = [];
        const user = await AsyncStorage.getItem('user');
        const modifiedUser = JSON.parse(user);
        axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
        if (status == 1) {            
            response = await axios.get(`user/order/list?page=${pagination.currentPage+1}`);
        } else {
            response = await axios.get(`user/order/list?page=1`);            
        }
        if(response.data.status !== true) {
            setIsProgress(false);
            setIsProgressMore(false);
            alert(response.data.message);
        }
        if (response.data.status === true) {
            if (status) {
                setOrders([...orders,...response.data.data]);                
            } else {
                setOrders(response.data.data);  
            }
            setPagination({
                currentPage: response.data.current_page,
                totalPage: response.data.total_pages,
            })
            setIsProgress(false);
            setIsProgressMore(false);
        }
    }

    const payNow = async(orderId) => {
        try{
         let data={
             order_id:orderId,
         };
          setPaymentVisible(true);
          const user = await AsyncStorage.getItem('user');
          const modifiedUser = JSON.parse(user);
          axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
          const response = await axios.post('/order/payment/pay/now', data);
          if(response.data.status !== true) {
            if (response.data.error_code) {
              setErrors(response.data.error_message);
            } else {    
              alert(response.data.message);
            }
            setPaymentVisible(false);
          }
          if(response.data.status === true) {
            setPaymentVisible(false);
            onlinePay(response.data);
            
          }
          setPaymentVisible(false);
        }catch (error) {
          setPaymentVisible(false);
        //   alert("Something Went Wrong Please Close The App And Try Again");
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
          axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
          const response = await axios.post('/order/payment/verify', verifyData);
          
          if(response.data.status !== true) {
            alert("Sorry Payment Failed");
            setIsProgress(false);
          }
          console.log(response);
          if(response.data.status === true) { 
            setIsProgress(false);  
            navigation.navigate('OrderDetail',{ order: response_data.data.id })
            // navigation.navigate('ConfirmScreen', {data: response_data});
          }
        }catch(error){
          setIsProgress(false);
        }
      }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        fetchOrders();
        setRefreshing(false)
      }, 2000);
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setIsProgress(true)
            fetchOrders();
          });
          return unsubscribe;
    }, [navigation])



return (
    
    <View>
        
            <View>
                <HeaderComponent  navigation={navigation} />
                {isProgress ? (
                    <ProgressDialog
                        visible={isProgress}
                        titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
                        messageStyle={{color:'#333'}}
                        dialogStyle={{borderRadius:10}}
                        title="Loading Orders"
                        message="Please, wait..."
                    />
                ) : (  
                <ScrollView showsVerticalScrollIndicator={false} style={{height:'100%'}} 
                onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                    paginationCall();
                }
                }}
                scrollEventThrottle={400}

                refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                >
                <ProgressDialog
                    visible={isProgressMore}
                    titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
                    messageStyle={{color:'#333'}}
                    dialogStyle={{borderRadius:10}}
                    title="Loading More Orders"
                    message="Please, wait..."
                />
                <ProgressDialog
                    visible={paymentVisible}
                    titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
                    messageStyle={{color:'#333'}}
                    dialogStyle={{borderRadius:10}}
                    title="While Loading"
                    message="Please, wait..."
                />
                <View style={Mainstyles.divider}></View>
                
                <View style={styles.cartSection}>
                    <View style={styles.cartBlock}>
                        { orders && orders.length > 0 ?                        
                        orders.map((order,index)=> {
                            return (
                                <View style={styles.cartItem} key={index}>
                                    <TouchableOpacity
                                        activeOpacity={.9}
                                        onPress={() =>navigation.navigate('OrderDetail',{ order: order.id })} style={styles.cartImage}
                                    >
                                        <View style={{alignItems:'flex-start',width:'100%'}}>
                                        <View>
                                            <Text style={[styles.orderIdText, {color:'#777'}]}>Order ID: {order.order_id} &nbsp;({order.created_at})</Text>
                                            <View style={styles.cartPrice}>
                                            <Text style={styles.itemPrice}>
                                                <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#aaa' }}>₹{order.total_mrp+order.shipping_charge}</Text> ₹{(order.total_sale_price+order.shipping_charge)-(order.coupon_discount+order.coins_used)} &nbsp;
                                            </Text>
                                            <Text style={styles.priceDiscountText}>Rs. {((order.total_mrp+order.shipping_charge) - (order.total_sale_price+order.shipping_charge))+(order.coupon_discount+order.coins_used)} off &nbsp;</Text>
                                            </View>
                                        </View>                               
                                        <View style={styles.cartPriceDiscount}>
                                            <Text style={styles.cartPriceDiscountText}>Delivered By {order.delivery_schedule_date}&nbsp;<Text style={{color:'#777'}}> ({order.delivery_slot_id == 1 ? 'Within 24 Hours' : 'Evening Shift'})</Text></Text>
                                            <View style={styles.cartItemBtnBlock}>
                                            <Text style={styles.statusHeader}>Order Status</Text>
                                            <OrderStatus status={order.status}/>
                                            <Text style={[styles.statusHeader, {paddingLeft:10,borderLeftWidth:1,borderLeftColor:'#777'}]}>Payment Status</Text>
                                            <PaymentStatus paymentType={order.payment_type} paymentStatus={order.payment_status}/>
                                            </View>
                                            <LinearGradient colors={['#2c69bc', '#5b86e5']} style={styles.points}>
                                                <Image 
                                                    source={require('../../assets/img/icon/points.png')}
                                                    style={{width:15,height:15,resizeMode:'contain',marginRight:3}}
                                                />
                                                <Text style={[styles.itemFeature, {color:'#fff'}]}>Coin Earn {order.coin_earned} after delivery</Text>
                                            </LinearGradient>
                                        </View>
                                        <Icon name='angle-right' style={styles.arrow} /> 
                                    </View>
                                    </TouchableOpacity>
                                    {order.payment_status != 3 && order.status != 5 && order.status != 4 && (
                                        <View style={styles.CartPay}>
                                            <Text>For Contactless & Cashless Delivery</Text>
                                            <TouchableOpacity onPress={() =>payNow(order.id)}>
                                                <Text style={styles.itemBtn}>Pay Now</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>  
                                
                            )
                        }) 
                        : 
                        <View style={{alignItems: 'center',width: '100%'}}>
                            <NoDataFound/>
                        </View>

                        }
                        
                        <View style={Mainstyles.divider}></View>
                    </View>      
            </View>
            <View style={[Mainstyles.divider, { paddingBottom: 120 }]}></View>
            </ScrollView>
            )} 
            </View>
            
    </View>

);
};


const styles = StyleSheet.create({
    header: { justifyContent: 'center', alignItems:'center', paddingLeft: 10, paddingRight:10, paddingBottom:10, backgroundColor:'#fff', shadowColor: "#000", shadowOffset: {width: 0, height: 4,}, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 10,},

    headerText: {fontSize:30, fontWeight:"700",color:'#fff'},
    headerRow : {flexDirection: 'row',justifyContent:'space-between',width:'100%'},

    cartSection: {backgroundColor:'#eee'},
    cartBlock: {flexDirection:'row',flexWrap:'wrap',borderRadius:5,},
    cartItem: {flexDirection:'column',backgroundColor:'#fff',paddingBottom:10, marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,marginBottom:5,},
    CartPay: {marginTop: 10,marginBottom:0,flexDirection:'row',paddingHorizontal:10,paddingTop:10,justifyContent:'space-between',borderTopWidth: 1, borderColor: '#ddd'},
    cartImage: {marginTop: 5,marginBottom:0,flexDirection:'row',paddingLeft:10,paddingRight:10,justifyContent:'space-between'},
    cartPrice: {textAlign:'left',marginTop:5,marginBottom:5,flexDirection:'row',alignItems:'center'},
    itemPrice: {fontSize:18,fontWeight:'700'},
    cartPointText: {fontSize:10,color:'#777',fontWeight:'700'},
    cartPointTextSpan: {color:'green'},
    cartPriceDiscountText: {fontSize: 12,fontWeight:"700",color:'#000', textAlign:'left',marginBottom:0},
    orderIdText: {fontSize: 12,fontWeight:"700",color:'#777', textAlign:'left'},
    priceDiscountText: { fontSize: 15, fontWeight: "700", color: 'green', textAlign: 'left' },
    itemFeature: {color:'#777',fontSize:10,fontWeight:'700'},
    points: {flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:5,paddingVertical:3,borderRadius:10,marginTop:3,width:170},

    arrow: {position:'absolute',top: '35%', right: 0,fontSize:30},

    cartItemBtnBlock: {marginVertical:5, flexDirection:'row',alignItems:'center'},
    statusHeader: {fontSize:12,color:'#333',fontWeight:'700'},
    statusBtn: {fontSize:12,paddingHorizontal:10,fontWeight:'700'},
    itemBtn: { fontSize: 12, color: '#fff', paddingLeft: 10, paddingRight: 10, padding: 2,  alignSelf: 'center', borderWidth: 1, borderRadius: 50, borderColor: '#bbb', backgroundColor: '#2c69bc' },
})

export default OrdersScreen;
