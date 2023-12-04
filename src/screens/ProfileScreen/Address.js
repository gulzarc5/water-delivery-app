/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Dimensions, ActivityIndicator, Modal, ScrollView} from "react-native";
import styles from './style';
import HeaderComponent from '../../components/CommonScreen/NoTitleHeader'
import { AuthContext } from '../../components/navigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LoaderComponent from '../../components/CommonScreen/Loader';
import { ConfirmDialog,ProgressDialog } from 'react-native-simple-dialogs';
import NoDataFound from '../../components/NoDataFound/NoDataFound';


 
const AddressScreen = ({navigation}) => {   
const { authContext, loginState, dispatch } = useContext(AuthContext);
const greeting = 'Welcome to React';
const [address, setAddress] = useState([]);
const [loading,setLoading] = useState(true);
const [isUpdateProgress,setIsUpdateProgress] = useState(false);
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
        setLoading(false)
      }
      if (response.data.status == true) {
        setAddress(response.data.data)
        dispatch({ type: 'FETCH_ADDRESS', address: response.data.data });
      }
      setLoading(false)
    } catch (error) {
      console.warn(error);
    }
}

const removeAddress = async(id) => {
  setIsUpdateProgress(true);
  try {
    const user = await AsyncStorage.getItem('user');
    const modifiedUser = JSON.parse(user);
    axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
    const response = await axios.get(`user/address/delete/${id}`);
    if(response.data.status !== true) {
      setIsUpdateProgress(false);
      alert(response.data.message);
    }else{
      authContext.fetchUserAddress();
      setAddress(address.filter((address) => address.id !== id));
      setIsUpdateProgress(false);
    }
  } catch (error) {
    setIsUpdateProgress(false)
    alert("Something Went Wrong Please Close The App And Try Again");
  }
}

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true)
      fetchUserAddress();
    });
    return unsubscribe;
  }, [navigation]);


  if(loading) {
    return(
      // <LoaderComponent />
      <View>
      <ProgressDialog
            visible={loading}
            titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
            messageStyle={{color:'#333'}}
            dialogStyle={{borderRadius:10}}
            title="Updating Address List"
            message="Please, wait..."
      />
      </View>
    );
  }else{
    if(address.length === 0){
      return (
        <View>
          <HeaderComponent navigation={navigation} title={'Address'} />
          <View style={styles.container}>        
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={styles.addressText}> </Text>
              <TouchableOpacity style={[internalstyles.addaddressbtn]} onPress={() => navigation.navigate('NewAddress')}>
                <Text style={{color:'#48BBEC',fontWeight:'700'}}>Add New Address</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
              <NoDataFound/>
          </View>
        </View>        
      );
    }else{
      
      return (
        <View>
          {/* Header */}
          <HeaderComponent navigation={navigation} title={'Address'} />
          <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'#eee',height:'83.8%'}}>
          <View style={styles.container}>        
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={styles.addressText}>Primary </Text>
              <TouchableOpacity style={[internalstyles.addaddressbtn]} onPress={() => navigation.navigate('NewAddress')}>
                <Text style={{color:'#48BBEC',fontWeight:'700'}}>Add New Address</Text>
              </TouchableOpacity>
            </View>

            {
              address && address.map((address_data, index) => {
                return (
                <View style={styles.addressBlock} key={address_data.id}>
                  <Text style={internalstyles.name}>{address_data.name}</Text>
                  {address_data.address_status == 1 && (<Text style={{color:'#48BBEC',fontWeight:'700',fontSize:12,paddingHorizontal:3}}>HOME</Text>)}
                  {address_data.address_status == 2 && (<Text style={{color:'#48BBEC',fontWeight:'700',fontSize:12,paddingHorizontal:3}}>OFFICE</Text>)}
                  {address_data.address_status == 3 && (<Text style={{color:'#48BBEC',fontWeight:'700',fontSize:12,paddingHorizontal:3}}>OTHER</Text>)}
                  <Text style={internalstyles.addesss}>{address_data.house_no}/{address_data.flat_no}, {address_data.main_location_name}, {address_data.sub_location_name}, {address_data.address_one}, {address_data.address_two},{address_data.land_mark} {'\n'}{address_data.mobile} </Text>
                  
                  
                  <View style={{flexDirection:'row',borderTopWidth:1,borderColor:'#eee',paddingTop:5}}>
                    <TouchableOpacity style={{width:'50%',alignItems:'center',borderRightWidth:1,borderColor:'#ddd'}}  onPress={() => navigation.navigate('EditAddressScreen', {address_data})}><Text style={styles.span}>edit this address</Text></TouchableOpacity>
                    <TouchableOpacity style={{width:'50%',alignItems:'center'}} onPress={() => removeAddress(address_data.id)}><Text style={[styles.span, {color:'red'}]}>remove this address</Text></TouchableOpacity>
                  </View>
                </View>
                )
              })
            }
          </View>
          </ScrollView>
        </View>
      );
    }
  }
};
const internalstyles = StyleSheet.create({
  name: {fontSize:18,fontWeight:'700',color:'#333'},
  addesss: {fontSize:14,fontWeight:'500',color:'#777'},
  defaultbtn: {backgroundColor:'#48BBEC',width:'60%',alignItems:'center',paddingVertical: 2,marginVertical:8,borderRadius:3},
  addaddressbtn: {marginBottom:5,},
  defaultbtnText: {color:'#fff'},
  iconBlock: {padding:10,backgroundColor:'#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.9, shadowRadius: 50, elevation: 20,borderRadius:10,},
})
export default AddressScreen;
