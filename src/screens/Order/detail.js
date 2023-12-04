/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState,useEffect } from 'react';
 import { StyleSheet, Text, View,  Image,  ScrollView, TouchableOpacity, Linking,ActivityIndicator } from 'react-native';
 import  Mainstyles from '../../assets/style';
 import HeaderComponent from '../../components/Order/Header'
 import LinearGradient from 'react-native-linear-gradient';
import OrderStatus from '../../components/Order/OrderStatus';
import PaymentStatus from '../../components/Order/PaymentStatus';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ConfirmDialog,ProgressDialog } from 'react-native-simple-dialogs';

  


 const OrderDetail = ({route,navigation}) => {  
  //  console.log(route.params.order);
   const [order,setOrder] = useState([]);
   const [cancelDialog,setCancelDialog] = useState(false);
   const [isProgress,setIsProgress] = useState(false);
   const [isProgressLoad,setIsProgressLoad] = useState(true);
   const [selectedLanguage, setSelectedLanguage] = useState();
   const initiateCall = () => {
    let url =
      'tel:' + 60037377385;
    Linking.openURL(url)
    .then((data) => {
      // console.log('Phone Opened');
    })
    .catch(() => {
      alert('Make sure Phone installed on your device');
    });
  };

  const fetchOrderDetail= async (status=null) => {
    const user = await AsyncStorage.getItem('user');
    const modifiedUser = JSON.parse(user);
    axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
    
    const response = await axios.get(`/user/order/detail/${route.params.order}`);         
    if(response.data.status !== true) {
      setIsProgressLoad(false);
        alert(response.data.message);
    }
    if (response.data.status === true) {
      setOrder(response.data.data);       
      setIsProgressLoad(false);
    }
  }

  const orderCancelDilog = async()=>{
    setCancelDialog(true);
  }

  const orderCancel = async()=>{    
    setCancelDialog(false)
    setIsProgress(true)
    const user = await AsyncStorage.getItem('user');
    const modifiedUser = JSON.parse(user);
    axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
    
    const response = await axios.get(`/user/order/cancel/${route.params.order}`);             
    console.log(response);
    if(response.data.status !== true) {
      setIsProgress(false)
      alert("Sorry Something Went Wrong");
    }
    if (response.data.status === true) {
      setIsProgress(false)
      setOrder({
          ...order,
          status: "5",
      });
    }
  }



  useEffect(() => {
    fetchOrderDetail();
  }, [navigation])


  return (
    
    <View>
      <HeaderComponent  navigation={navigation} />
      {isProgressLoad ? (
        <ProgressDialog
          visible={isProgressLoad}
          titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
          messageStyle={{color:'#333'}}
          dialogStyle={{borderRadius:10}}
          title="Loading Order Detail"
          message="Please, wait..."
        />
      ):(
        <ScrollView showsVerticalScrollIndicator={false} style={{height:'100%'}}>
        <ProgressDialog
          visible={isProgress}
          titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
          messageStyle={{color:'#333'}}
          dialogStyle={{borderRadius:10}}
          title="Processing Cancel Request"
          message="Please, wait..."
        />
        {/* Divider */}
        <View style={Mainstyles.divider}></View>

        {/* Cart */}      
        <View style={styles.cartSection}>
          <View style={styles.cartBlock}>
            {/* prodict Item */}
            <View style={styles.orderInfoBlock}>
              <View>
                <Text style={[styles.orderIdText, {color:'#333'}]}>Order ID  &nbsp;<Text style={{color:'#2c69bc'}}>{order.order_id} </Text>({order.created_at})</Text>                
              </View>                               
              <View style={styles.cartPriceDiscount}>
                  <Text style={styles.orderDeliveryText}>Delivered By<Text style={{color:'#2c69bc'}}>  {order.delivery_schedule_date} &nbsp; ({order.delivery_slot_id == 1 ? 'Within 24 Hours' : 'Evening Shift'})</Text></Text>
                  <View style={styles.cartItemBtnBlock}>
                    <Text style={styles.statusHeader}>Order Status</Text>
                    <OrderStatus status={order.status}/>
                    <Text style={[styles.statusHeader, {paddingLeft:10,borderLeftWidth:1,borderLeftColor:'#777'}]}>Payment Status</Text>
                    <PaymentStatus paymentType={order.payment_type} paymentStatus={order.payment_status}/>
                  </View>
                </View>
            </View>
          </View>
          
          {/* Divider */}
          <View style={Mainstyles.divider}></View>
          
          <Text style={styles.addressText}>Delivery Information</Text>
          <View style={styles.cartBlock}>
            {order.shipping_address ? 
            <View style={[styles.cartItem, {padding:10,borderBottomColor:'#f3f3f3',borderBottomWidth:1}]}>
                <Text style={{color:'#2c69bc',fontWeight:'700',fontSize:15,marginBottom:2}}>{order.shipping_address.name}</Text>
                <Text style={internalstyles.addesss}>{order.shipping_address.flat_no}, {order.shipping_address.main_location_name},{order.shipping_address.sub_location_name}, {order.shipping_address.address_one}, , {'\n'}{order.shipping_address.mobile}</Text>

            <Text style={{fontSize:14,marginBottom:-2}}>{order.shipping_address.main_location_name}, {order.shipping_address.sub_location_name}</Text>
            <Text style={{fontSize:14,marginBottom:-2}}><Text style={{color:'#777',fontSize:13}}>Flat No :</Text> {order.shipping_address.flat_no}</Text>
            <Text style={{fontSize:14,marginBottom:-2}}><Text style={{color:'#777',fontSize:13}}>Landmark :</Text> {order.shipping_address.address_one}</Text>
            <Text style={{fontSize:14,marginBottom:-2}}><Text style={{color:'#777',fontSize:13}}>Mobile :</Text> {order.shipping_address.mobile}</Text>
            </View> : null
            }
          </View>

          {/* Divider */}
          <View style={Mainstyles.divider}></View>

          <Text style={styles.addressText}>Order Item</Text>
          <View style={styles.cartBlock}>
            {order.details && order.details.map((product, index) => {
              return( 
                <View style={[styles.cartItem, {paddingBottom:10,borderBottomColor:'#f3f3f3',borderBottomWidth:1}]} key={index}>
                <View style={styles.cartImage}>
                  <View style={{alignItems:'flex-start',width:'85%'}}>
                    <TouchableOpacity
                      activeOpacity={.9}
                      // onPress={() =>navigation.navigate('ProductSingleScreen')}
                    >
                      <Text style={styles.cartName}>{product.product_name}-{product.size}</Text>
                    </TouchableOpacity>
                    <View style={styles.cartPrice}>
                      <Text style={styles.itemPrice}>
                        <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid',color:'#aaa'}}>₹{product.mrp}</Text> ₹{product.price} &nbsp;
                      </Text>
                      <View style={styles.cartPriceDiscount}><Text style={styles.cartPriceDiscountText}>{product.mrp-product.price > 0 && (<Text>Rs. {product.mrp-product.price} off</Text>)}  &nbsp;</Text></View>
                    </View> 
                    <View style={styles.qtyBlock}>
                      <Text style={styles.qtyHeadText}>Quantity</Text>
                      <Text style={styles.qtyText}>{product.quantity}</Text>
                    </View>                 
                  </View>
                  <Image 
                    source={{uri: product.product.image }}
                    style={{width:50,height:50,resizeMode:'contain',alignSelf:'center'}}
                  />
                </View>
                
                {/* Quantity */}
                {product.coin_generated > 0 && (
                <View style={{paddingHorizontal: 10,}}>
                  <LinearGradient colors={['#2c69bc', '#5b86e5']} style={styles.points}>
                    <Image 
                      source={require('../../assets/img/icon/points.png')}
                      style={{width:15,height:15,resizeMode:'contain',marginRight:3}}
                    />
                    <Text style={[styles.itemFeature, {color:'#fff'}]}>
                      <Text>Earn {product.coin_generated} point on each Item</Text>
                    </Text>
                  </LinearGradient>
                </View> )}
                {product.is_jar == 1 && (
                <View style={{marginTop: 10,paddingVertical:5,paddingHorizontal:10,borderTopWidth:1,borderColor:'#ddd',}}>
                  <Text style={styles.addressText}>ADD ON</Text>
                  <Text style={styles.cartName}>{product.quantity} Empty jars with cap</Text>
                  <View style={styles.cartPrice}>
                    <Text style={styles.itemPrice}>
                      <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid',color:'#aaa'}}>₹{product.jar_mrp}</Text> ₹{product.jar_price} &nbsp;
                    </Text>
                    <View style={styles.cartPriceDiscount}><Text style={styles.cartPriceDiscountText}>{product.mrp-product.price > 0 && (<Text>Rs. {product.jar_mrp-product.jar_price} off</Text>)}  &nbsp;</Text></View>
                  </View> 
                </View>)}
              </View>)
            })}          
          
          </View>
          

          <View style={Mainstyles.divider}></View>

    
    
          {(order.payment_type != 3) && (order.status < 3) ?(
          <View style={styles.CancelBlock}>
            <View style={styles.CancelInner1}>
              <Text style={styles.CancelInnerText1}>Do you want to cancel your product ?</Text>
            </View>
            
            <TouchableOpacity style={styles.CancelInner2}
            onPress={() =>orderCancelDilog()}
            >              
              <Text style={styles.CancelInnerText2} >Cancel</Text>
            </TouchableOpacity>

            <ConfirmDialog
                titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-20,fontSize:14}}
                messageStyle={{color:'#333',marginBottom:-20,}}
                dialogStyle={{borderRadius:10}}
                // buttonsStyle={{color:'#333'}}
                title="Cancel Confirmation"
                message="Are you sure to cancel your order?"
                visible={cancelDialog}
                onTouchOutside={() => {dialogVisible: false}}
                positiveButton={{
                    title: "YES",
                    onPress: () => orderCancel(),
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
          ): null}

          {order.status == 5 && (
            <View style={styles.CancelBlock}>           
              <Text style={{color:'red',fontSize:15}} >You have cancelled this order</Text>
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

          {/* Membership Block */}
          {/* <View style={styles.MembershipBlock}>            
            <Text style={{color:'#333',fontSize:14}}>You received <Text style={{fontWeight:'700',color:'green'}}>5/30</Text> product of your membership plan</Text>            
            <TouchableOpacity>
              <Text style={styles.MembershipBtn}>View Detail</Text>
            </TouchableOpacity>
          </View>             */}
                        
          {/* Divider */}
          <View style={Mainstyles.divider}></View>

          {/* Points Block */}
          <View style={{paddingHorizontal:5}}>
            <LinearGradient colors={['#36d1dc', '#5b86e5']} style={styles.pointsblock}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image
                source={require('../../assets/img/icon/points.png')}
                style={{width:45,height:45,resizeMode:'cover'}}
                />
                {order.coin_earned > 0 && (
                  <View>
                    <Text style={styles.pointsText}>You have earned <Text style={{fontWeight:'700',color:'yellow',fontSize:20}}>{order.coin_earned} </Text>points on this {'\n'} purchase.It wit credited after{'\n'} successfull delivery of item</Text>
                  </View>
                )}
                
              </View>
            </LinearGradient>
          </View>

          {/* Divider */}
          <View style={Mainstyles.divider}></View>
          
          {/* Cart Value */}
          <View style={styles.cartValueBlock}>
            <Text style={styles.cartValueHeaderText}>Price Detail</Text>
            <View style={styles.cartValuePriceBlock}>
              <View style={styles.cartValueInnerBlock}>
                <Text>Total Value</Text>
                <Text>₹ {order.total_mrp}</Text>
              </View>
              <View style={[styles.cartValueInnerBlock, {paddingBottom:0, }]}>
                <Text>Delivery Charges</Text>
                <Text style={{color:'green'}}>₹ {order.shipping_charge}</Text>
              </View>
              {((order.total_mrp-order.total_sale_price) > 0) && (
              <View style={styles.cartValueInnerBlock}>
                <Text>Discount</Text>
                <Text style={{color:'green'}}>- ₹ {order.total_mrp-order.total_sale_price}</Text>
              </View>
              )}
              {order.coins_used > 0 && (
                <View style={styles.cartValueInnerBlock}>
                  <Text>Coin Used</Text>
                  <Text style={{color:'green'}}>- ₹ {order.coins_used}</Text>
                </View>
              )}
               {order.coupon_discount > 0 && (
                    <View style={styles.cartValueInnerBlock}>
                        <Text>Coupon Discount</Text>
                        <Text style={{ color: 'green' }}>- ₹ {order.coupon_discount}</Text>
                    </View>
                )}              
              
            </View>
            <View style={styles.cartValueTotalBlock}>
              <Text style={styles.cartValueTotalBlockText}>Total Amount</Text>
              <Text style={styles.cartValueTotalBlockText}>₹ {(order.total_sale_price+order.shipping_charge)-(order.coupon_discount+order.coins_used)}</Text>
            </View>
          </View>
        </View>
        {/* Divider */}
        <View style={[Mainstyles.divider, { paddingBottom: 68 }]}></View>
        </ScrollView>
      )}
      
    </View>

  );
};
const styles = StyleSheet.create({
  header: { justifyContent: 'center', alignItems:'center', paddingLeft: 10, paddingRight:10, paddingBottom:10, backgroundColor:'#fff', shadowColor: "#000", shadowOffset: {width: 0, height: 4,}, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 10,},
  
  headerText: {fontSize:30, fontWeight:"700",color:'#fff'},

  cartSection: {backgroundColor:'#eee'},
  cartBlock: {flexDirection:'row',flexWrap:'wrap', marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,overflow:'hidden'},

  orderInfoBlock:{padding: 10,backgroundColor:'#fff',width:'100%'},  
  orderDeliveryText: {fontSize: 12,fontWeight:"700",color:'#000', textAlign:'left',marginBottom:0},
  cartItemBtnBlock: {flexDirection:'row',alignItems:'center'},
  statusHeader: {fontSize:12,color:'#333',fontWeight:'700'},
  statusBtn: {fontSize:12,paddingHorizontal:10,fontWeight:'700'},

  addressText : {color: '#333',alignSelf:'flex-start',marginBottom:1,marginLeft:5,fontWeight:'700',textTransform:'uppercase',fontSize:12},

  cartItem: {flexDirection:'column',width:"100%",backgroundColor:'#fff',},
  cartImage: {marginTop: 5,marginBottom:0,flexDirection:'row',paddingLeft:10,paddingRight:10},
  orderIdText: {fontSize: 10,color:'#777',fontWeight:'700'},
  cartName: {fontSize: 18,color:'#C99738',fontWeight:'700'},
  cartPrice: {textAlign:'left',flexDirection:'row'},
  itemPrice: {fontSize:18,fontWeight:'700',color:'#333'},
  // cartPriceDiscount: {backgroundColor:'green',borderRadius:15},
  cartPriceDiscountText: {fontSize: 15,fontWeight:"700",color:'green', textAlign:'left',paddingTop:3},
  DeliveredText: {fontSize: 12,fontWeight:"700",color:'#000', textAlign:'left'},
  itemFeature: {color:'#777',fontSize:10,fontWeight:'700'},
  points: {flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:5,paddingVertical:3,borderRadius:10,marginTop:3,width:170},

  qtyBlock: {flexDirection:'row',justifyContent:'center',alignSelf:'flex-start',borderWidth:1,borderColor:'#2c69bc',marginVertical:5,borderRadius:5,backgroundColor:'#2c69bc',overflow:'hidden'},
  qtyHeadText: {fontWeight:'700',justifyContent:'flex-start',color:'#fff',paddingHorizontal:5,},
  qtyText: {fontWeight:'700',justifyContent:'flex-start',backgroundColor:'#fff',paddingHorizontal:8,},
  // pickerBlock: {width:100,marginTop:-16,padding: 0,margin:0},
  
  cartItemInner: {flexDirection:'row',width:'100%',paddingBottom:10},
  cartItemBtn: {justifyContent:'center'},
  cartItemBtnText: {fontSize:14,color:'#fff',paddingHorizontal:15,fontWeight:'700'},

  cartValueBlock: {backgroundColor:'#fff', marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,},
  cartValueHeaderText: {fontWeight:'700',borderBottomWidth:1,borderColor:'#eee',padding:10,color:'#333'},
  cartValuePriceBlock: {padding:10,},
  cartValueInnerBlock: {flexDirection:'row',justifyContent:'space-between',paddingBottom:5},
  cartValueTotalBlock: {flexDirection:'row',justifyContent:'space-between',paddingTop:5,borderTopWidth:1,borderColor:'#eee',borderStyle:'dashed',padding:10,borderRadius: 5},
  cartValueTotalBlockText: {fontWeight:'700'},

  MembershipBlock: {backgroundColor:'#fff',padding:10,borderWidth: 1, borderColor: '#ddd', borderRadius:10,marginHorizontal:5, },
  MembershipBtn: {color: '#2c69bc',fontWeight:'700',fontSize:10 },

  CancelBlock: {backgroundColor:'#fff',flexDirection:'row',alignItems:'center',padding:10,borderWidth: 1, borderColor: '#ddd', borderRadius:10,marginHorizontal:5, },
  CancelInner1: {width:'70%'},
  CancelInnerText1: {fontSize:14,color:'#555'},
  CancelInner2: {width:'30%',paddingLeft:10,alignItems:'center'},
  CancelInnerText2: {fontSize:14,color:'#fff',paddingHorizontal:15,paddingBottom:1,borderRadius:10,backgroundColor:'red'},
  
  pointsblock: {borderWidth: 1,borderColor: '#ddd',borderRadius:10,padding: 10,width:'100%',backgroundColor:'#fff'},
  pointsText: {fontSize:15,paddingLeft:10,flexDirection:'column',color:'#fff'},

})

const internalstyles = StyleSheet.create({
  name: {fontSize:18,fontWeight:'700',color:'#333'},
  addesss: {fontSize:14,fontWeight:'500',color:'#777'},
  defaultbtn: {backgroundColor:'#48BBEC',width:'55%',alignItems:'center',paddingVertical: 10,marginVertical:8,borderRadius:3},
  addaddressbtn: {marginBottom:5,},
  defaultbtnText: {color:'#fff'},

  pointsblock: {borderWidth: 1,borderColor: '#ddd',borderRadius:10,padding: 10,width:'100%',marginBottom: 10,backgroundColor:'#fff',marginBottom:20},
  pointsText: {fontSize:15,paddingLeft:10,flexDirection:'column',color:'#fff'},

  cartSection: {backgroundColor:'#eee', shadowColor: "#000", shadowOffset: {width: 0, height: 4,}, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 8},
  cartBlock: {flexDirection:'row',flexWrap:'wrap',borderRadius:5,},
  cartItem: {flexDirection:'column',width:"100%",backgroundColor:'#fff',paddingBottom:10},
  cartImage: {marginTop: 5,marginBottom:0,flexDirection:'row',paddingLeft:10,paddingRight:10,justifyContent:'space-between'},
  cartName: {fontSize: 16,color:'#333',fontWeight:'500'},
  cartPrice: {textAlign:'left',marginTop:10,marginBottom:10,flexDirection:'row'},
  itemPrice: {fontSize:18,fontWeight:'700'},
  cartPriceDiscountText: {fontSize: 12,fontWeight:"700",color:'#000', textAlign:'left'},

  arrow: {position:'absolute',top: '35%', right: 0,fontSize:30},
  
  cartItemBtnBlock: {marginVertical:5, flexDirection:'row',alignItems:'center'},
  statusHeader: {fontSize:12,color:'#333',fontWeight:'700'},
  statusBtn: {fontSize:12,paddingHorizontal:10,fontWeight:'700'},
})

export default OrderDetail;
