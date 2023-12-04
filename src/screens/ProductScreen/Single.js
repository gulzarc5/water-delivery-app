/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useContext, useEffect, useState } from 'react';
 import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
 import Mainstyles from '../../assets/style';
 import CheckBox from '@react-native-community/checkbox';
 import HeaderComponent from '../../components/CommonScreen/Header'
 import CustomText from '../../components/UI/CustomText';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { AuthContext } from '../../components/navigation/StackNavigator';
 import { SliderBox } from "react-native-image-slider-box";
 import LoaderComponent from '../../components/CommonScreen/Loader';
 import { ProgressDialog } from 'react-native-simple-dialogs';
 import HTMLView from 'react-native-htmlview';
 
 
 const ProductScreen = ({ navigation, route }) => {
   const {authContext, loginState, dispatch} = useContext(AuthContext);
   const [isJar, setIsJar] = useState(false)
   const [auth, setAuth] = useState(loginState && loginState.user);
   const [location, setLocation] = useState(null);
   const [cartState, setCartState] = useState(false);
   const product = route.params.product;
   const [images, setImages] = useState([]);
   const [mountPage, setMountPage] = useState(false);
   const sliderImage = [product.image];
  //  images && images.map(image => {
  //    sliderImage.push(image.image);
  //  });
   console.log("product",sliderImage);
 
   const checkCartProduct = () => {

     let status_chk = false;
     loginState.cartData && loginState.cartData.cart && (status_chk =  loginState.cartData.cart.find(data => data.product_id === product.product_size_id));
     status_chk && setCartState(true);
   }; 

   const cartHandler = (product, isJar) => {
     if(auth && auth != null && product){
       setCartState(true);
       authContext.addToCart(product, isJar); 
     }else{
       navigation.navigate('LoginScreen');
     }
   }
 
   const cartScreenHandler = () => {
     if (auth) {
       navigation.navigate('CartScreen');
     } else {
       navigation.navigate('LoginScreen');
     }
   }
   const fetching = async () => {
    try {
      let locations = await AsyncStorage.getItem('location');
      locations = JSON.parse(locations);
      setLocation(locations);
    } catch (error) {
      // alert(error);
    }
  }
 
   useEffect(() => {
     const unsubscribe = navigation.addListener('focus', () => {
       fetching();
       if (!mountPage) {
         checkCartProduct();
         setImages(product.images);         
       }
       setMountPage(true);
     });
     return unsubscribe;
   }, [navigation])
 
   return (
     <View>
       {/* Header */}
       <HeaderComponent auth={auth} navigation={navigation} />
       <ProgressDialog
         visible={loginState.isSpinning}
         titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
         messageStyle={{color:'#333'}}
         dialogStyle={{borderRadius:10}}
         title="Adding Cart Item"
         message="Please, wait..."
       />
       <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#eee', height: '83.8%' }}>
         {/* Divider */}
         <View style={Mainstyles.divider}></View>
 
         {/* Product */}
         <View style={styles.productSection}>
           <View style={styles.productInner}>
             <View style={styles.productImage}>
               {sliderImage && sliderImage.length === 0 ? (
                 <CustomText style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                   No Product mage Found!
                 </CustomText>
               ) : (
                 <SliderBox
                   // key={ image.id }
                   sliderBoxHeight={180}
                   resizeMode={'contain'}                                        
                   images={sliderImage}
                  //  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                  disableOnPress={'false'}
                   currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
                 />
               )}
             </View>
             
             <View style={styles.productBlock}>
               <View style={styles.productCompanyBlock}>
                 <Text style={styles.productCompany}>{product.brand}</Text>
               </View>
               <Text style={[styles.productName, {color:'#C99738',}]}>{product.name}</Text>
               <Text style={styles.productQuantity}>Size {product.size_name}</Text>
               <Text style={styles.productPrice}><Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#aaa' }}>₹{product.mrp}</Text> ₹{product.price}</Text>
               <Text style={{ fontSize:10, color: '#777' }}>(incl. of all taxes)</Text>  
             </View>
           </View>
 
           {/* Divider */}
           <View style={Mainstyles.divider}></View>
 
           <View style={styles.productBlockInfo}>
             <Text style={{ fontSize: 12, marginBottom: 10, color: '#333', fontWeight:'700', letterSpacing: 2 }}>ADD ON & LOCATION</Text>
             {product.jar_available_status == 1 &&(
             <View style={{flexDirection:'row',alignItems:'center'}}>
               <CheckBox
                 disabled={false}
                 value={isJar}
                 onValueChange={(newValue) => setIsJar(newValue)}
                 style={{fontSize:20}}
               />
               <View style={{flexDirection:'column',paddingLeft:10}}>
                 <Text>Do you want empty jar along with it ?</Text>
                 <Text style={{fontSize:20,fontWeight:'700'}}>₹ {product.jar_price}</Text>
               </View>
             </View>)
             }
             <TouchableOpacity style={styles.addressBlock} onPress={() => navigation.navigate('LocationScreen')}>
               <View style={styles.addressArea}>
                 <Text style={{color:'#777',paddingLeft:10,letterSpacing:2}}>{location ? (<Text>{location.sub_location_name}, {location.main_location_name}</Text>):"Check Delivery Availiblity"}</Text> 
               </View>
               <View style={styles.addressHeader}>
                 <View style={{backgroundColor:'#2c69bc',paddingHorizontal:10}} >
                   <Text style={{fontSize:12,color:'#fff',paddingVertical:7}}>{location ? (<Text>Change</Text>) : (<Text>Check</Text>)}</Text>
                 </View>
               </View>
             </TouchableOpacity>
             {location ? (
               <Text style={{fontSize:12,color:'green',paddingLeft:10,marginTop:5}}><Text>Delivery is availible for this area</Text></Text>   
             ) : null}
           
           </View>          
 
           {/* Divider */}
           <View style={Mainstyles.divider}></View>
 
           <View style={styles.productBlockInfo}>
             <Text style={{ fontSize: 12, marginBottom: 10, color: '#333', fontWeight:'700', letterSpacing: 2 }}>DETAIL</Text>
             <HTMLView
                value={product.long_description}
                // stylesheet={styles}
              />
           </View>
 
           {/* Divider */}
           <View style={Mainstyles.divider}></View>
 
         </View>
       </ScrollView>
       <View style={styles.fixedButtonBlock}>
         <View style={styles.fixedButton1}>
           <Text style={styles.fixedButton1Text}>₹ { isJar ? product.price + product.jar_price : product.price}</Text>
           <Text style={styles.fixedButton1TextOther}>Total Price</Text>
         </View>
         {
           cartState && cartState != null ?
           <TouchableOpacity style={styles.fixedButton2} onPress={() => cartScreenHandler()}>
         <Text style={styles.fixedButton2Text}>Go To Cart</Text>
         </TouchableOpacity>
         :
         <TouchableOpacity style={styles.fixedButton2} onPress={() => cartHandler(product, isJar)}>
         <Text style={styles.fixedButton2Text}>Add To Cart</Text>
       </TouchableOpacity>
         }
       </View>
     </View>
 
   );
 };
 const styles = StyleSheet.create({
   header: { justifyContent: 'center', alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingBottom: 10, backgroundColor: '#fff', shadowColor: "#000", shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 10, },
   menuIcon: { fontSize: 40, color: '#777', alignSelf: 'flex-start', justifyContent: 'center', paddingTop: 10, },
 
   headerText: { fontSize: 30, fontWeight: "700", color: '#fff' },
   headerRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
   navLogo: { width: 100, height: 50, resizeMode: 'cover', marginRight: 120 },
   navIcon: { width: 30, height: 30, resizeMode: 'contain', alignSelf: 'flex-end' },
   navUser: { width: 40, height: 40, resizeMode: 'cover', alignSelf: 'flex-end', borderWidth: 1, borderRadius: 50, borderColor: '#bbb', marginTop: 10 },
   productSection: { backgroundColor: '#eee' },
   productInner: { backgroundColor: '#fff', marginHorizontal: 5, borderWidth: 1, borderColor: '#ddd', borderRadius: 10, overflow: 'hidden' },
   productImage: { backgroundColor: '#fff', paddingVertical: 10, },
   productBlock: { flexDirection: 'column', backgroundColor: '#fff', padding: 10, },
   productCompanyBlock: { display: 'flex', flexWrap: 'wrap', marginBottom: 10 },
   productCompany: { fontSize: 14, backgroundColor: '#2c69bc', color: '#fff', paddingLeft: 10, paddingRight: 10, paddingBottom: 3, borderRadius: 15 },
   productName: {fontSize: 22,color:'#333',fontWeight:'700', },
   productQuantity: { fontSize: 13,color:'green',marginBottom:5 },
   productPrice: {fontSize: 25,color:'#2c69bc', textAlign:'left',fontWeight:'700' },
   productBlockInfo: { backgroundColor: '#fff', padding: 10, marginHorizontal: 5, borderWidth: 1, borderColor: '#ddd', borderRadius: 10, },
   fixedButtonBlock: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', shadowColor: "#000", shadowOffset: { width: 0, height: 0, }, shadowOpacity: 0.90, shadowRadius: 4.65, elevation: 500, alignSelf: 'center', justifyContent: 'center' },
   fixedButton1: { padding: 15, width: '50%', justifyContent: 'center', backgroundColor: '#f3f3f3' },
   fixedButton1Text: { textAlign: 'center', color: '#333', fontWeight: '700', marginTop: -8 },
   fixedButton1TextOther: { textAlign: 'center', color: '#2c69bc', fontSize: 12, fontWeight: '700' },
   fixedButton2: { padding: 15, backgroundColor: '#2c69bc', width: '50%', justifyContent: 'center', color: '#fff' },
   fixedButton2Text: { textAlign: 'center', color: '#fff', marginTop: -10 },
 
   dateBlock: { fontSize: 13, marginBottom: 15, color: '#777', backgroundColor: '#eee', padding: 7, borderWidth: 1, borderColor: '#bbb', borderRadius: 5 },
   
 
   addressBlock:{backgroundColor:'#fff',flexDirection:'row',justifyContent:'space-between', borderWidth: 1, borderColor: '#ddd',marginTop:10,borderRadius:5,overflow:'hidden'},
   addressArea:{paddingTop:5,width:'80%'},
 })
 
 export default ProductScreen;
 