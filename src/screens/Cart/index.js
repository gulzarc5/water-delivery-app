 import React, { useContext, useEffect, useState } from 'react';
 import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
 import Mainstyles from '../../assets/style';
 import HeaderComponent from '../../components/Cart/Header'
 import Icon from 'react-native-vector-icons/AntDesign';
 import FontAwesome from 'react-native-vector-icons/FontAwesome';
 import CustomText from '../../components/UI/CustomText';
 import CheckBox from '@react-native-community/checkbox';
 import CartSummary from './CartSummary';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { AuthContext } from '../../components/navigation/StackNavigator';
 import axios from 'axios';
 import { ProgressDialog } from 'react-native-simple-dialogs';
 const CartScreen = ({ route, navigation }) => {
   const {authContext, loginState, dispatch} = useContext(AuthContext);
   const [user, setUser] = useState(null);
   const [cartList, setCartList] = useState([]);
   const [cartTotal, setCartTotal] = useState([]);
   const [count, setCount] = useState(1);
   const [isProgress,setIsProgress] = useState(true);
   const [isUpdateProgress,setIsUpdateProgress] = useState(false);
   const [userCoin,setUserCoin] = useState(0);
   const [addressLength,setAddressLength] = useState([]);
   const removeCartHandler = async(cart, index) => {
     setIsUpdateProgress(true);
     const user = await AsyncStorage.getItem('user');
     const modifiedUser = JSON.parse(user);
     axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
     const response = await axios.get(`/cart/delete/${cart.cart_id}`);
     if(response.data.status !== true) {          
       setIsUpdateProgress(false);
       alert("Something Went Wrong Please Close The App And Try Again");
     }else if(response.data.status === true){
       removeCartItemUpdate(cart, index);
       fetchCartData();
       setIsUpdateProgress(false);
     }
   }
 
   const removeCartItemUpdate = async(cart,index)=>{
    let totalMrp = cartTotal.total_mrp-(cart.mrp*cart.quantity);
    let totalPrice = cartTotal.total_amount-(cart.price*cart.quantity);        
    let total_coin_use = cartTotal.total_coin_use;
    let coin_can_use = cartTotal.coin_can_use;
     if (cart.cart_is_jar == 1) {
         totalMrp = totalMrp-(cart.jar_mrp*cart.quantity);
         totalPrice = totalPrice-(cart.jar_price*cart.quantity);
     }
     if ((cartTotal.coin_can_use > 0) && (userCoin > 0) && (cart.coin_used > 0)) {
       if ((cartTotal.coin_can_use-(cart.coin_used*cart.quantity)) < userCoin) {
          coin_can_use = cartTotal.coin_can_use-(cart.coin_used*cart.quantity)
          total_coin_use = cartTotal.coin_can_use-(cart.coin_used*cart.quantity)
       }
     }
     setCartTotal({
       ...cartTotal,
       total_mrp:totalMrp,
       total_amount:totalPrice,
       coin_can_use:coin_can_use,
      total_coin_use:total_coin_use,
     })
     setCartList(cartList => cartList.filter((_, i) => i !== index));
     // dispatch({type: 'FETCH_CART', data: response.data.data.cart});
   }
 
   const fetchCartData = async()=>{
     try {
       const token = loginState.token && loginState.token;
       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
       const response = await axios.get('/cart/list');
       
       if (response.data.status !== true) {
         setIsProgress(false);
         alert(response.data.message);
       }
       if (response.data.status == true) {
         console.log(response.data.data.cart_total);
         console.log(response.data.data.cart);
         setCartList(response.data.data.cart);
         setCartTotal(response.data.data.cart_total);
         dispatch({ type: 'FETCH_CART', data: response.data.data });
         setIsProgress(false);
       }
     } catch (error) {
       alert("Something Wrong Please Close The App And Open Again");
     }
   }

  const fetchUserCoin = async () => {
    const user = await AsyncStorage.getItem('user');
    const modifiedUser = JSON.parse(user);
    if (modifiedUser) {
      try{
        axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
        const response = await axios.get('user/coin/');
        if(response.data.status !== true) {
          ToastAndroid.showWithGravity(
            response.data.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }
        if (response.data.status === true) {
          setUserCoin(response.data.data.total_coins);
          dispatch({ type: 'USER_COIN', coin: response.data.data});
        }
      }catch(e){
        console.log(e);
      }
    }
  }
  const checkoutHandle = cartTotal => {
    if(addressLength > 0){
      navigation.navigate('CheckoutScreen');
    }else{
      navigation.navigate('NewAddress', {isCheckout: 1});
    }
  }
 
   const updateCart = async(product, quantity,is_jar)=>{
     setIsUpdateProgress(true);
     const cartData = {
       cart_id: product.cart_id,
       quantity: quantity,
       is_jar: is_jar
     }
     const token = loginState.token;
     if (token) {
       try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const response = await axios.post('/cart/update', cartData);
        if (response.data.status !== true) {
          setIsUpdateProgress(false);
          alert(response.data.message);
        }else if (response.data.status == true) {
            setIsUpdateProgress(false);
        }         
       } catch (error) {
         console.log(error);
       }      
     } else {
      setIsUpdateProgress(false);
     }
   }
 
   const incrementCount = async(product,quantity,is_jar) => {
     updateCartItem(product,(quantity+1),is_jar,1);
     await updateCart(product, quantity+1,is_jar);
   }
   const decrementCount = async(product, quantity,is_jar) => {
     if(product.quantity === 1){      
     }else{
       updateCartItem(product,(quantity-1),is_jar,2)//type 1 = add,2 = minus
       await updateCart(product, quantity-1,is_jar);
     }
   }

   const setCartItemJar = async(cart,quantity,jar)=>{
    var index = cartList.findIndex(x=> x.cart_id === cart.cart_id);
    let EditableCartData = cartList[index]

    EditableCartData.cart_is_jar = jar ? 1 : 2;
    console.log(EditableCartData);
    cartList[index].cart_is_jar

    if (index === -1){
      alert("Please Try Again");
    }else{
      await updateCart(cart, EditableCartData.quantity, EditableCartData.cart_is_jar);
      setCartList([
        ...cartList.slice(0,index),
        EditableCartData,
        ...cartList.slice(index+1)
      ]);
      let totalMrp = 0;
      let totalPrice = 0;
      if (jar) {
        totalMrp = cartTotal.total_mrp+(cart.jar_mrp*cart.quantity);
        totalPrice = cartTotal.total_amount+(cart.jar_price*cart.quantity);
      }else{
        totalMrp = cartTotal.total_mrp-(cart.jar_mrp*cart.quantity);
        totalPrice = cartTotal.total_amount-(cart.jar_price*cart.quantity);
      }
      setCartTotal({
        ...cartTotal,
        total_mrp:totalMrp,
        total_amount:totalPrice,
      })
    }
   }
 
   const updateCartItem =(cart, quantity, is_jar,type)=> {
    // console.log(cart);
    // console.log(cartTotal);
     var index = cartList.findIndex(x=> x.cart_id === cart.cart_id);
     let EditableCartData = cartList[index]
     EditableCartData.quantity = quantity;
    //  console.log(EditableCartData);
     cartList[index].quantity
     if (index === -1){
       alert("Please Try Again");
     }else{
       setCartList([
         ...cartList.slice(0,index),
         EditableCartData,
         ...cartList.slice(index+1)
       ]);
       let totalMrp = 0;
       let totalPrice = 0;
       let total_coin_use = 0;
       let total_coin_can_use = cartTotal.coin_can_use;
       if (type === 1) {
         totalMrp = cartTotal.total_mrp+EditableCartData.mrp;
         totalPrice = cartTotal.total_amount+EditableCartData.price; 
         total_coin_use = cartTotal.coins; 
         console.log("TotalCoin",cartTotal.coins);
         if((userCoin > 0 ) && (EditableCartData.coin_used > 0)){
           if ( userCoin >= (cartTotal.coin_can_use+EditableCartData.coin_used)) {                    
              total_coin_use = cartTotal.coins+EditableCartData.coin_used;
              total_coin_can_use = cartTotal.coin_can_use+EditableCartData.coin_used;
           }else{
             total_coin_use = userCoin;
             total_coin_can_use = cartTotal.coin_can_use+EditableCartData.coin_used;
           }   
         }
       } else {        
         totalMrp = cartTotal.total_mrp-EditableCartData.mrp;
         totalPrice = cartTotal.total_amount-EditableCartData.price; 
         total_coin_use = cartTotal.coins; 
         if((userCoin > 0 ) && (EditableCartData.coin_used > 0)){
            total_coin_can_use = cartTotal.coin_can_use-EditableCartData.coin_used;
            if(total_coin_can_use < userCoin){
              total_coin_use = total_coin_can_use; 
            }
         }
       }
       if (EditableCartData.cart_is_jar == 1) {
         if (type === 1) {
           totalMrp = totalMrp+EditableCartData.jar_mrp;
           totalPrice = totalPrice+EditableCartData.jar_price;
         }else{
           totalMrp = totalMrp-EditableCartData.jar_mrp;
           totalPrice = totalPrice-EditableCartData.jar_price;
         }
       }
       setCartTotal({
         ...cartTotal,
         total_mrp:totalMrp,
         total_amount:totalPrice,
         coins:total_coin_use,
         coin_can_use:total_coin_can_use,
       })
     }
   }

   const addressFetch = async()=>{
    const user = await AsyncStorage.getItem('user');
    const modifiedUser = JSON.parse(user);
    if (modifiedUser) {
      try{
        axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
        const response = await axios.get('user/address/list');
        if(response.data.status !== true) {
          ToastAndroid.showWithGravity(
            response.data.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }
        if (response.data.status === true) {
          setAddressLength(response.data.data ? response.data.data.length : 0);
          dispatch({ type: 'FETCH_ADDRESS', coin: response.data.data});
        }
      }catch(e){
        console.log(e);
      }
    }
   }

   useEffect(() => {
    fetchCartData();
    fetchUserCoin();
    addressFetch();
    setUser(loginState.user && loginState.user);
  }, [navigation]);
   
   if(isProgress) {
     return(
       <ProgressDialog
         visible={isProgress}
         titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
         messageStyle={{color:'#333'}}
         dialogStyle={{borderRadius:10}}
         title="Loading Cart Data"
         message="Please, wait..."
       />
     );
   }else{
   return (
     <View>
       {/* Header */}
       <HeaderComponent  navigation={navigation} />
       <ProgressDialog
         visible={isUpdateProgress}
         titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
         messageStyle={{color:'#333'}}
         dialogStyle={{borderRadius:10}}
         title="Updating Cart Data"
         message="Please, wait..."
       />
       <ScrollView showsVerticalScrollIndicator={false} style={{ height:'83.3%'}}>
         {/* Divider */}
         <View style={Mainstyles.divider}></View>
 
         {/* Cart */}
         {cartList && cartList.length === 0 ? (
           <View style={styles.noCarBlock}>
             <View style={styles.noCarInner}>
               <Icon name='shoppingcart' style={{fontSize:60,color:'#48BBEC',padding:10}} />
             </View>
             <CustomText style={{color:'#333',fontSize:16,marginTop:10}}>
               No Cart Data Found
             </CustomText>
             <TouchableOpacity style={styles.noCartButton} onPress={() => navigation.navigate('HomeScreen')}>
               <Text style={styles.noCartText}>GO TO HOME</Text>
             </TouchableOpacity>
           </View>
         ) : (
             <View style={styles.cartSection}>
               <View style={styles.cartBlock}> 
                 {(
                   cartList && cartList.map((product, index) => {
                     return (
                         <View key={product.cart_id}>
 
                             <View style={styles.cartItem} >
                                 <View style={styles.cartImage}>
                                     <View style={{ alignItems: 'flex-start', width: '85%' }}>
                                         <TouchableOpacity
                                             activeOpacity={.9}
                                             onPress={() => navigation.navigate('ProductSingleScreen', { product })}
                                         >
                                             <Text style={styles.cartName}>{product.product_name} - {product.size_name}</Text>
                                         </TouchableOpacity>
                                         <View style={styles.cartPrice}>
                                             <Text style={styles.itemPrice}>
                                                 <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#aaa' }}>₹{product.mrp}
                                                 </Text> ₹{product.price} &nbsp;
                                             </Text>
                                             <View style={styles.cartPriceDiscount}>
                                                 <Text style={styles.cartPriceDiscountText}>Flat Rs. {product.mrp - product.price} off &nbsp;</Text>
                                             </View>
                                         </View>
                                     </View>
                                     <Image
                                        source={{uri: product.product_image }}
                                         style={{ width: 50, height: 50, resizeMode: 'contain', alignSelf: 'center', marginTop: -10 }}
                                     />
                                 </View>
                                 <View style={styles.qtyBlock}>
                                   <Text style={{ fontSize: 10, marginBottom: 5, color: '#333', fontWeight:'700'}}>SELECT QUANTITY</Text>
                                   <View style={{ flexDirection:'row'}}>
                                     <View style={styles.qtyInner}>
                                       <TouchableOpacity style={styles.qtyIcon}  onPress={() => decrementCount(product, product.quantity,product.cart_is_jar)}>
                                         <Icon name="minus"  style={{fontSize:15,alignSelf:'center',paddingVertical:5,color:'#fff'}} />
                                       </TouchableOpacity>
                                       <TextInput
                                          key={index}
                                          style={styles.inputText}
                                          maxLength={2}
                                          disable={true}
                                          value={`${product.quantity}`}
                                          keyboardType={'numeric'}
                                          editable={false}
                                       />
                                       <TouchableOpacity style={styles.qtyIcon} onPress={() => incrementCount(product,product.quantity,product.cart_is_jar)}>
                                         <Icon name="plus" style={{fontSize:15,alignSelf:'center',paddingVertical:5,color:'#fff'}} / >
                                       </TouchableOpacity>
                                     </View>
                                     <TouchableOpacity style={styles.cartItemBtn} onPress={() => removeCartHandler(product, index)}>
                                         <FontAwesome name="trash" style={styles.removeIcon} />
                                     </TouchableOpacity>
                                   </View>
                                 </View>
                                 {
                                   product && product.product_is_jar == 1 ?
                                   <View style={styles.addOnBlock}>
                                     <Text style={{ fontSize: 10, marginBottom: 0, color: '#333', fontWeight:'700'}}>ADD ON</Text>                              
                                     {/* <Text style={styles.addOnName}> {count} Empty Water jar Rs. {product.jar_price}</Text>
                                     <TouchableOpacity style={{paddingLeft:5,paddingTop:0}}>
                                       <Text style={{color:'red',fontSize:12}}>remove</Text>
                                     </TouchableOpacity> */}
                                     <View style={{flexDirection:'row',alignItems:'center'}}>
                                       <CheckBox
                                         disabled={false}
                                         value={ product.cart_is_jar==1 ? true : false}
                                         onValueChange={(newValue) => setCartItemJar(product,product.quantity,newValue)}
                                         style={{fontSize:20}}
                                       />
                                       <View style={{flexDirection:'column',paddingLeft:10}}>
                                         <Text>Do you want empty jar along with it ?</Text>
                                         
                                         <Text style={styles.itemPrice}>
                                            <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#aaa' }}>₹{product.jar_mrp}
                                            </Text> ₹{product.jar_price} &nbsp;
                                         </Text>
                                       </View>
                                     </View>
                                   </View>
                                   : null
                                 }
 
                             </View >
 
                             < View style={Mainstyles.divider} ></View >
                         </View>
                     )
                   })
                 )}
               </View>          
               <View style={Mainstyles.divider}></View>
               {cartTotal && (<CartSummary cartTotal={cartTotal} coupon={null} screenType={1}/>)}
             </View>
         )}
       </ScrollView>
       {cartTotal && cartList.length != 0 && (
         <View style={styles.fixedButtonBlock}>
           <View style={styles.fixedButton1}>
             <Text style={styles.fixedButton1Text}>₹ {cartTotal.total_amount - cartTotal.coins}</Text>
             <Text style={styles.fixedButton1TextOther}>Total Price</Text>
           </View>
           <TouchableOpacity style={styles.fixedButton2} onPress={() => checkoutHandle(cartTotal)}>
             <Text style={styles.fixedButton2Text}>Proceed</Text>
           </TouchableOpacity>
         </View>
       )}
     </View>
   );
   }
 };
 const styles = StyleSheet.create({
   header: { justifyContent: 'center', alignItems:'center', paddingLeft: 10, paddingRight:10, paddingBottom:10, backgroundColor:'#fff', shadowColor: "#000", shadowOffset: {width: 0, height: 4,}, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 10,},
   
   headerText: {fontSize:30, fontWeight:"700",color:'#fff'},
   headerRow : {flexDirection: 'row',justifyContent:'space-between',width:'100%'},
 
   addressBlock:{backgroundColor:'#fff',padding: 10,},
   addressHeader:{flexDirection:'row',justifyContent:'space-between'},
   addressArea:{paddingTop:5,},
 
   cartSection: {backgroundColor:'#eee', shadowColor: "#000", shadowOffset: {width: 0, height: 4,}, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 8},
   cartBlock: {flexDirection:'row',flexWrap:'wrap',borderRadius:5,},
   cartItem: {flexDirection:'column',width:"100%",backgroundColor:'#fff',},
   cartImage: {marginTop: 5,marginBottom:0,flexDirection:'row',paddingLeft:10,paddingRight:10},
   cartName: {fontSize: 18,color:'#C99738',fontWeight:'700'},
   cartPrice: {textAlign:'left',marginTop:5,marginBottom:10,flexDirection:'row'},
   itemPrice: {fontSize:18,fontWeight:'700',color:'#2c69bc'},
   // cartPriceDiscount: {backgroundColor:'green',borderRadius:15},
   cartPriceDiscountText: {fontSize: 15,fontWeight:"700",color:'green', textAlign:'left',paddingTop:3},
   
   qtyBlock: {flexDirection:'column',justifyContent:'center',alignSelf:'flex-start',marginLeft:10,borderRadius:5,marginBottom:10},
   qtyHeadText: {fontWeight:'700',justifyContent:'flex-start',paddingTop:5},
   qtyInner: {flexDirection:'row',justifyContent:'center',borderWidth:1,borderColor:'#eee',borderRadius:5,overflow:'hidden'},
   qtyIcon: {width:30,height:27,backgroundColor:'#2c69bc',},
   inputText:{backgroundColor:'#fff',height:27,padding: 0,textAlign:'center',width:40,color:'#333'},
   
   addOnBlock: {flexDirection:'column',alignContent:'flex-start',paddingLeft:10,marginBottom:10,paddingTop:10,borderTopWidth:1,borderColor:'#eee',},
   addOnName: {fontSize: 16,color:'#2c69bc',fontWeight:'700'},
   
   cartItemBtnBlock: {width:'100%',alignItems:'center',padding:8},
   cartItemBtn: {alignItems:'center',backgroundColor:'#e50000',borderRadius:5,paddingHorizontal:10,paddingVertical:5,marginLeft:5},
   removeIcon: {fontSize:18,color:'#fff',},
   cartItemBtnText: {fontSize:12,color:'#fff'},
 
   cartValueBlock: {backgroundColor:'#fff'},
   cartValueHeaderText: {fontWeight:'700',borderBottomWidth:1,borderColor:'#eee',padding:10,color:'#333'},
   cartValuePriceBlock: {padding:10,},
   cartValueInnerBlock: {flexDirection:'row',justifyContent:'space-between',paddingBottom:5},
   cartValueTotalBlock: {flexDirection:'row',justifyContent:'space-between',paddingTop:5,borderTopWidth:1,borderColor:'#eee',borderStyle:'dashed',padding:10,borderRadius: 5},
   cartValueTotalBlockText: {fontWeight:'700'},
 
   fixedButtonBlock: {flexDirection:'row',justifyContent:'space-around',backgroundColor:'#fff', shadowColor: "#000", shadowOffset: {width: 0, height: 0,}, shadowOpacity: 0.90, shadowRadius: 4.65, elevation: 500,alignSelf:'center',justifyContent:'center'},
   fixedButton1: {padding: 15,width:'50%',justifyContent:'center',backgroundColor:'#f3f3f3'},
   fixedButton1Text: {textAlign:'center',color:'#333',fontWeight:'700',marginTop:-8},
   fixedButton1TextOther: {textAlign:'center',color:'#2c69bc',fontSize:12,fontWeight:'700'},
   fixedButton2: {padding: 15,backgroundColor:'#2c69bc',width:'50%',justifyContent:'center',color:'#fff'},
   fixedButton2Text: {textAlign:'center',color:'#fff',marginTop:-11},
   
   noCarBlock:{marginTop:'45%',justifyContent: 'center', alignItems: 'center',flexDirection:'column'  },
   noCarInner:{shadowColor: "#000", shadowOffset: {width: 0, height: 4,}, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 8,backgroundColor:'#fff',borderRadius:30,width:90},
   noCartButton: {padding: 10,backgroundColor:'#2c69bc',width:'50%',justifyContent:'center',marginTop:15},
   noCartText: {textAlign:'center',color:'#fff',},
 })
 
 export default CartScreen;
 