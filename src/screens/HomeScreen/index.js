/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useContext, useEffect, useState } from 'react';
import { RefreshControl, StyleSheet,Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator,Modal, ImageBackground } from 'react-native';
import Mainstyles from '../../assets/style';
import HeaderComponent from '../../components/Homepage/Header'
import FixedNavbar from '../../components/CommonScreen/FixedNavbar'
import SliderComponent from '../../components/Homepage/Slider'
import BrandComponent from '../../components/Homepage/BrandList'
import SubscriptionComponent from '../../components/Homepage/Subscription'
import { styles } from './style';
import ProductList from './ProductList';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../components/navigation/StackNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoaderComponent from '../../components/CommonScreen/Loader';
import axios from 'axios';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const HomeScreen = ({ navigation }) => {
  const {authContext, loginState, dispatch} = useContext(AuthContext);
  const brands = loginState.data ? loginState.data.brands : null;
  const products = loginState.data ? loginState.data.products : null;
  const sizes = loginState.data ? loginState.data.sizes : null;
  const sliders = loginState.data ? loginState.data.sliders : null;
  const subscriptions = loginState.data ? loginState.data.subscriptions : null;
  const [auth, setAuth] = useState(loginState.token ? loginState.token : null);
  const [previousOrder, setPreviousOrder] = useState(null);
  const [previousOrderId, setPreviousOrderId] = useState(null);
  const [previousOrderCount, setPreviousOrderCount] = useState(0);
  const [loading, setIsLoading] = useState(false);
  console.log(loginState.data);

  const updateFcmToken = async()=>{
    try {
      let userData = await AsyncStorage.getItem('user');
      const fcmToken = await AsyncStorage.getItem('fcmToken');
      // console.log("Home page",fcmToken);
      if (fcmToken && userData) {
        const modifiedUser = JSON.parse(userData);
        axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
        const response = await axios.get(`fcm/token/update/${modifiedUser.id}/${fcmToken}`);
      }     
    } catch (error) {
      console.log("Fcm Token Error",error);
    }
  }
  const fetchPreviousOrder = async()=>{
    try {
      const token = loginState.token && loginState.token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const response = await axios.get('user/order/previous');
      if (response.data.status == true) {
        if (response.data.data) {
          setPreviousOrderId(response.data.data.id)
          if (response.data.data.details && response.data.data.details.length > 0) {
            setPreviousOrderCount(response.data.data.details.length);
            setPreviousOrder(response.data.data.details[0]);
          }
        }
      }
    } catch (error) {
      // alert("Something Wrong Please Close The App And Open Again");
      console.log("Previous Order Error",error);
    }
  }
  
  const reOrder = async(orderId)=>{
    setIsLoading(true);
    try {
      const token = loginState.token && loginState.token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const response = await axios.get(`cart/re/order/${orderId}`);
      if (response.data.status == true) {
        if (response.data.data) {
          setPreviousOrderId(response.data.data.id)
          if (response.data.data.details && response.data.data.details.length > 0) {
            setPreviousOrderCount(response.data.data.details.length);
            setPreviousOrder(response.data.data.details[0]);

          }
        }
        navigation.navigate('CartScreen');
        setIsLoading(false);
      }
    } catch (error) {
      // alert("Something Wrong Please Close The App And Open Again");
      setIsLoading(false);
      console.log("Re Order Error",error);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      authContext.appLoad(),
      authContext.fetchCart(),
      // authContext.fetchUserAddress(),
      authContext.fetchUserCoin(),
      updateFcmToken(),
    ]).then((response) => {
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
    })

    const willFocusSubscription = navigation.addListener('focus', () => {
      if(auth){
        fetchPreviousOrder();
      }
    });

   return willFocusSubscription;
    // return () => mounted = false;
  }, [navigation])


  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      authContext.appLoad();
      if(auth){
        fetchPreviousOrder();
      }
      setRefreshing(false)
    }, 2000);
  }, []);
  
  if (loginState.isLoading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="red"/>
        </View>
      )
  }
  if(loginState.isSpinning ) {
    return(
      <LoaderComponent />
    );
  }
  return (
    <View>
      {/* Header */}
      <HeaderComponent auth={auth}/>

      
      <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%' }} refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>

        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => {console.log('close modal')}}>
            <View style={modelStyles.modalBackground}>
                <View style={modelStyles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        animating={loading} />
                </View>
            </View>
        </Modal>

        {/* Slider */}
        <SliderComponent sliders={sliders} />

        {/* Divider */}
        <View style={Mainstyles.divider}></View>

        {/* Reorder */}
        {previousOrder && previousOrder != null &&  (
        <View style={{ marginHorizontal: 5 }}>
          <LinearGradient colors={['#36d1dc', '#5b86e5']} style={styles.pointsblock}>
            <View style={styles.reorderInner}>
              <View style={styles.reorderProduct}>
                <Text style={styles.reorderProductText}>{previousOrder.product_name}-({previousOrder.size})</Text>
                <Text style={styles.reorderProductTextMore}>{previousOrderCount > 1 ? " +"+(previousOrderCount-1)+" Item" : null}  </Text>
              </View>
              <TouchableOpacity onPress={() => reOrder(previousOrderId)}>
                <Text style={styles.reorderBtnText}>Reorder <Icon name="repeat" style={styles.reorderIcon}/></Text>
              </TouchableOpacity> 
            </View> 
          </LinearGradient>
        </View>
        )}

        {/* Divider */}
        <View style={Mainstyles.divider}></View>

        {/* Product */}
        <View style={styles.productSection}>
          <View style={styles.headerBlock}>
            <Text style={styles.productHeading}>Product List</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ProductList', { products: products,
              sizes:sizes })}>
              <Text style={styles.productSubHeading}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productBlock}>
            <ProductList
              products={products}
            />
          </View>
        </View>

        {/* Divider */}
        <View style={Mainstyles.divider}></View>

        {/* Subsription */}
        <View style={styles.subscriptionPlan}>
          <View style={styles.headerBlock}>
            <Text style={[styles.productHeading, { color: '#fff' }]}>Membership</Text>
          </View>
          <SubscriptionComponent subscriptions={subscriptions} />
        </View>

        {/* Divider */}
        <View style={Mainstyles.divider}></View>

        {/* Brand */}
        <View style={styles.productBrand}>
          <View style={styles.headerBlock}>
            <Text style={styles.productHeading}>Brand List</Text>
            {/* <TouchableOpacity onPress={() => navigation.navigate('LocationScreen')}>
              <Text style={styles.productSubHeading}>View all</Text>
            </TouchableOpacity> */}
          </View>
          <BrandComponent brands={brands} />
        </View>

        {/* Divider */}
        <View style={Mainstyles.divider}></View>

        {/* Bulk */}
        <View style={styles.homeBanner}>
          <View style={styles.homeBannerInner}>
            <ImageBackground source={require('../../assets/img/banner/home_banner1.jpg')} style={styles.bannerImage}>
              <Text style={styles.bannerImageText}>BULK ORDER</Text>
              <Text style={styles.bannerImageText2}>Order Mineral water on bulk amount of various brands, sizes and prices. Get best deal & discount on your order.</Text>
              <TouchableOpacity onPress={() => navigation.navigate('BulkScreen')}>
              {/* <TouchableOpacity onPress={() => navigation.navigate('BulkScreen')}> */}
                <Text style={styles.bannerBtnText}>Request Order</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
        
        {/* Divider */}
        <View style={[Mainstyles.divider, { paddingBottom: 120 }]}></View>
      </ScrollView>

      {/* Fixed Navbar */}
      <FixedNavbar navigation={navigation} style={styles.FixedNavbar} />

    </View>
  );
};


const modelStyles = StyleSheet.create({
  modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      height: 100,
      width: 100,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
  }
});
export default HomeScreen;
