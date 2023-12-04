import React, { useEffect, useReducer } from 'react';
import { ToastAndroid} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GuestStackNavigator from './GuestStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import SplashScreen from './SplashScreen';
export const AuthContext = React.createContext();
import axios from 'axios';
axios.defaults.baseURL = 'https://pyaas.in/api';

const MainStackNavigator = () => {
  // Context API
  const initialState = {
    isLoading: true,
    isAddressLoading: true,
    user: '',
    token: '',
    cartData: '',
    address: '',
    data: '',
    placeOrderLoading: false,
    isModalOpen: false,
    isSpinning: false,
    orders: '',
    appUpdate:true
  }
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'APP_UPDATE':
        return {
          ...prevState,
          appUpdate: action.appUpdate,
        }
      case 'SEND_OTP':
        return {
          ...prevState,
          isLoading: false,
          data: action.data,
        }
      case 'VERIFY_OTP':
        return {
          ...prevState,
          isLoading: false,
          user: action.user,
          token: action.token
        }
      case 'RETRIEVE_USER':
        return {
          ...prevState,
          isLoading: false,
          user: action.user,
          token: action.token
        }
      case 'FETCH_ADDRESS':
        return {
          ...prevState,
          isAddressLoading: false,
          address: action.address,
        }
      case 'APP_LOAD':
        return {
          ...prevState,
          isLoading: false,
          data: action.data,
        }
      case 'PLACE_ORDER':
        return {
          ...prevState,
          placeOrderLoading: action.placeOrderLoading,
      }
      case 'FETCH_CART':
        return {
          ...prevState,
          isLoading: false,
          cartData: action.data,
      }
      case 'LOGIN':
        return {
          ...prevState,
          isLoading: false,
          user: action.user,
          token: action.token
        }
      case 'SPINNER':
        return {
          ...prevState,
          isSpinning: action.isSpinning
      }
      case 'LOGOUT':
        return {
          ...prevState,
          user: null,
          token: null,
          isLoading: false,
        }
        case 'MODAL':
          return {
            ...prevState,
            isModalOpen: action.isModalOpen,
        }
        case 'ADD_ADDRESS':
          return {
            ...prevState,
            address: [action.data],
        }
        case 'FETCH_ORDERS':
          return {
            ...prevState,
            orders: action.orders,
        }
        case 'USER_COIN':
          return {
            ...prevState,
            coin: action.coin,
        }
      default:
        return prevState;
    }
  }
  const [loginState, dispatch] = useReducer(loginReducer, initialState);
  const authContext = React.useMemo(() => ({
    appLoad: async () => {
      try {
        const response = await axios.get(`/app/load/api`);
        // console.log(response.data.data);
        dispatch({ type: 'APP_LOAD', data: response.data.data })
      } catch (err) {
        alert(err);
      }
    },
    fetchUserFromLocalStorage: async() => {
      let user;
      user = null;
      try {
        user = await AsyncStorage.getItem('user');
        const modifiedUser = JSON.parse(user);
        dispatch({ type: 'RETRIEVE_USER', user: modifiedUser, token: modifiedUser.api_token });
      } catch (e) {
        console.log(e);
      }
    },
    OtpHandler: async (mobile, navigation) => {
      try {
        dispatch({type: 'SPINNER', isSpinning: true});
        const response = await axios.post(`user/otp/send`, { mobile: mobile });
        dispatch({ type: 'SEND_OTP', data: response.data.data })
        if (response.data.status == true) {
          dispatch({type: 'SPINNER', isSpinning: false});
          ToastAndroid.showWithGravity(
            response.data.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          navigation.navigate('LoginOTP', { mobile: mobile });
        } else {
          dispatch({type: 'SPINNER', isSpinning: false});
          alert(response.data.message)
        }
      } catch (err) {
        dispatch({type: 'SPINNER', isSpinning: false});
        alert(err);
      }
      // dispatch({ type: 'LOGIN', user: username, token: token });
    },
    verifyOtp: async (navigation, mobile, otp) => {
      try {
        dispatch({type: 'SPINNER', isSpinning: true});
        const response = await axios.post(`user/otp/verify`, { mobile: mobile, otp: otp });
        if (response.data.message === 'Otp Is Invalid') {
          dispatch({type: 'SPINNER', isSpinning: false});
          ToastAndroid.showWithGravity(
            response.data.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        } else if (response.data.status === false) {
          dispatch({type: 'SPINNER', isSpinning: false});
          ToastAndroid.showWithGravity(
            response.data.error_message.otp[0],
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        } else if (response.data.status === true) {
          if (response.data.data.api_token) {
            dispatch({type: 'SPINNER', isSpinning: false});
            dispatch({ type: 'VERIFY_OTP', user: response.data.data, token: response.data.data.api_token });
            AsyncStorage.setItem('user', JSON.stringify(response.data.data));
          } else {
            dispatch({type: 'SPINNER', isSpinning: false});
            navigation.navigate('RegisterScreen', { response: response.data.data });
          }
        }
      } catch (err) {
        alert(err);
      }
    },
    createProfileHandle: async (data) => {
      const gender =  data.gender.key == 1 ? 'M' : 'F';
      try {
        dispatch({type: 'SPINNER', isSpinning: true});
        const response = await axios.post(`user/registration/detail/update`, {mobile: data.mobile, otp: data.otp, name: data.name, gender: gender});
        if (response.data.status === true) {
          dispatch({type: 'SPINNER', isSpinning: false});
          ToastAndroid.showWithGravity(
            response.data.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          dispatch({ type: 'VERIFY_OTP', user: response.data.data, token: response.data.data.api_token });
          AsyncStorage.setItem('user', JSON.stringify(response.data.data));
        } else {
          dispatch({type: 'SPINNER', isSpinning: false});
          alert(response.data.message);
        }
      } catch (err) {
        dispatch({type: 'SPINNER', isSpinning: false});
        alert(err);
      }
    },
    signOut: () => {
      AsyncStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
      dispatch({ type: 'USER_COIN',coin:null });
      dispatch({ type: 'FETCH_CART',cartData:null });
    },
    fetchUser: () => {
      dispatch({ type: 'FETCH_USER', user: 'saddam' });
    },
    fetchCart: async() => {
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      if (modifiedUser) {
          try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
            const response = await axios.get('/cart/list');
            
            if (response.data.status !== true) {
              ToastAndroid.showWithGravity(
                response.data.message,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
            }
            const resData = response.data.data;
            if (response.data.status == true) {
              dispatch({ type: 'FETCH_CART', data: resData });
            }
          } catch (error) {
            dispatch({type: 'SPINNER', isSpinning: false});
            console.log("Cart Error",error);
          }
      }
    },
    fetchCartData: async(navigation) => {
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      if (modifiedUser) {    
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
          dispatch({type: 'SPINNER', isSpinning: true});
          const response = await axios.get('/cart/list');
          
          if (response.data.status !== true) {
            // console.warn(response.data.status);
            dispatch({type: 'SPINNER', isSpinning: false});
            ToastAndroid.showWithGravity(
              response.data.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          }
          const resData = response.data.data;
          if (response.data.status == true) {
            dispatch({type: 'SPINNER', isSpinning: false});
            dispatch({ type: 'FETCH_CART', data: resData });
            navigation.push('CartScreen',{cartList : resData});
          }
        } catch (error) {
            console.log(error);
        }
      }
    },
    addToCart: async (product, isJar) => {
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      if (modifiedUser) { 
        console.log(product);
        try {
          const data = {
              product_id: product.product_size_id,
              quantity: 1,
              is_jar: isJar ? 1 : 2,
          }
          axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
          dispatch({type: 'SPINNER', isSpinning: true});
          const response = await axios.post('/cart/add', data);
          if (response.data.status !== true) {
            dispatch({type: 'SPINNER', isSpinning: false});
            ToastAndroid.showWithGravity(
              response.data.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          }
          if (response.data.status == true) {
            await authContext.fetchCart();
            dispatch({type: 'SPINNER', isSpinning: false});
            // dispatch({type: 'FETCH_CART', data: response.data.data.cart});
              ToastAndroid.showWithGravity(
                  response.data.message,
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
              );
          }
        } catch (error) {
          dispatch({type: 'SPINNER', isSpinning: false});
            console.log(error);
        }
      }
    },
    updateCart: async(product, quantity,is_jar) => {
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      if (modifiedUser) {
        const cartData = {
            cart_id: product.cart_id,
            quantity: quantity,
            is_jar: is_jar
        }
        try{
          axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
          const response = await axios.post('/cart/update', cartData);
          if (response.data.status !== true) {
            ToastAndroid.showWithGravity(
              response.data.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          }
          if (response.data.status == true) {
              ToastAndroid.showWithGravity(
                  response.data.message,
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
              );
          }
        }catch(e){
          console.log(e);
        }
     
      }
    },
    removeFromCart: async(product) => {
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      if (modifiedUser) {
        try{
          axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
          const response = await axios.get(`/cart/delete/${product.cart_id}`);
          if(response.data.status !== true) {          
              ToastAndroid.showWithGravity(
                response.data.message,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
          }else if(response.data.status === true){
            dispatch({type: 'SPINNER', isSpinning: false});
          }
        }catch(e){
          dispatch({type: 'SPINNER', isSpinning: false});
        }
        
      }
    },
    fetchUserAddress: async() => {
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      if (modifiedUser) {   
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
            const response = await axios.get('user/address/list');
            if (response.data.status !== true) {
              ToastAndroid.showWithGravity(
                response.data.message,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
            }
            const resData = response.data.data;
            if (response.data.status == true) {
              dispatch({ type: 'FETCH_ADDRESS', address: resData });
              dispatch({type: 'SPINNER', isSpinning: false});
              return resData;
            }
          } catch (error) {
            return false;
            dispatch({type: 'SPINNER', isSpinning: false});
            console.log(error);
          }
      }
    },
    removeAddressHandle: async (id) => {
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      if (modifiedUser) {   
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
          const response = await axios.get(`user/address/delete/${id}`);
          if(response.data.status !== true) {
            authContext.fetchUserAddress();
            ToastAndroid.showWithGravity(
              response.data.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          }
        } catch (error) {
          console.log(error);
        }
      }
        
    },
    updateAddressHandle: async (id) => {
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      if (modifiedUser) {    
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
          const response = await axios.get(`user/address/update/${id}`);
          if(response.data.status !== true) {
            authContext.fetchUserAddress();
            ToastAndroid.showWithGravity(
              response.data.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          }
        } catch (error) {
          console.log(error);
        }
      }   
    },
    addAddress: async(data, navigation) => {
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      if (modifiedUser) {   
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
          dispatch({type: 'SPINNER', isSpinning: true});
          const response = await axios.post('user/address/add', data);
          if(response.data.status !== true) {
            dispatch({type: 'SPINNER', isSpinning: false});
            ToastAndroid.showWithGravity(
              response.data.error_message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
              );
            }
            if(response.data.status === true) {
              dispatch({type: 'SPINNER', isSpinning: false});
              authContext.fetchUserAddress();
              dispatch({type: 'FETCH_ADDRESS', address: response.data.data});
              ToastAndroid.showWithGravity(
                response.data.message,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
          }
        } catch (error) {
          dispatch({type: 'SPINNER', isSpinning: false});
          console.log(error);
        }
      }else{
        dispatch({type: 'SPINNER', isSpinning: false});
      }
    },
    placeOrderHandle: async (data, navigation) => {
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      if (modifiedUser) {
        try {
          dispatch({type: 'PLACE_ORDER', placeOrderLoading: true});
          axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
          const response = await axios.post('/order/place', data);
          if(response.data.status !== true) {
            ToastAndroid.showWithGravity(
              response.data.error_message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          }
          if(response.data.status == true) {
            dispatch({type: 'PLACE_ORDER', placeOrderLoading: false});
            navigation.navigate('ConfirmScreen', {data: response.data.data});
            ToastAndroid.showWithGravity(
              response.data.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    openModal: () => {
      dispatch({type: 'MODAL', isModalOpen: true});
    },
    closeModal: () => {
      dispatch({type: 'MODAL', isModalOpen: false});
    },
    fetchMyOrders: async () => {
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      if (modifiedUser) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
          const response = await axios.get('user/order/list');
          if(response.data.status !== true) {
            ToastAndroid.showWithGravity(
              response.data.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          }
          const resData = response.data.data;
          if (response.data.status === true) {
            dispatch({ type: 'FETCH_ORDERS', orders: resData });
          } 
        } catch (error) {
          console.log(error);
        }
      }
    },
    fetchUserCoin: async () => {
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
          // console.log(response.data.data);
          if (response.data.status === true) {
            dispatch({ type: 'USER_COIN', coin: response.data.data});
          }
        }catch(e){
          console.log(e);
        }
      }
    },
    updateFcmToken : async()=>{
      try {
        let userData = await AsyncStorage.getItem('user');
        const fcmToken = await AsyncStorage.getItem('fcmToken');
        if (fcmToken && userData) {
          const modifiedUser = JSON.parse(userData);
          axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
          const response = await axios.get(`fcm/token/update/${modifiedUser.id}/${fcmToken}`);
        }     
      } catch (error) {
        console.log(error);
        console.log("called");
      }
    }

  }), []);
  // Context API

  useEffect(() => {
    setTimeout(() => {
    authContext.fetchUserFromLocalStorage();
    authContext.appLoad();
    authContext.fetchCart();
    
    // authContext.fetchUserAddress();
    // authContext.fetchUserCoin();
    // authContext.updateFcmToken();
    }, 1000);
  }, []);
  if (loginState.isLoading || loginState.appUpdate) {
    return (
      <SplashScreen  loginState={loginState} dispatch = {dispatch} authContext= {authContext}/>
    )
  }
  return (
    <AuthContext.Provider value={{
      loginState: loginState,
      dispatch: dispatch,
      authContext: authContext
    }}>
      <NavigationContainer>
        {loginState.token ? <AuthStackNavigator /> : <GuestStackNavigator />}
      </NavigationContainer >
    </AuthContext.Provider>
  );
}


export default MainStackNavigator;