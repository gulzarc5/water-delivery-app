
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, ActivityIndicator, ScrollView} from 'react-native';
import styles from './style';
import HeaderComponent from '../../components/CommonScreen/NoTitleHeader'
import { AuthContext } from '../../components/navigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ConfirmDialog,ProgressDialog } from 'react-native-simple-dialogs';
 
 const AddressScreen = ({route,navigation}) => {    
  const {authContext, loginState, dispatch} = useContext(AuthContext);
  const greeting = 'Welcome to Pias';
  const [selectedAddress, setSelectedAddress] = useState(route.params ? route.params.address : null);
  const [address, setAddress] = useState([]);
  const [isProgress,setIsProgress] = useState(true);
  const [isUpdateProgress,setIsUpdateProgress] = useState(false);

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
        setAddress(address.filter((address) => address.id !== id));
        setIsUpdateProgress(false);
      }
    } catch (error) {
      setIsUpdateProgress(false)
      alert("Something Went Wrong Please Close The App And Try Again");
    }
  }

  const fetchUserAddress = async() => {
    try {
        const user = await AsyncStorage.getItem('user');
        const modifiedUser = JSON.parse(user);
        axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
        const response = await axios.get('user/address/list');
        if (response.data.status !== true) {
          alert(response.data.message);
          setIsProgress(false)
        }
        if (response.data.status == true) {
          setAddress(response.data.data)
          dispatch({ type: 'FETCH_ADDRESS', address: response.data.data });
          setIsProgress(false)
        }
      } catch (error) {
        setIsProgress(false)
      }
  }

  const goToCheckout = (addr)=>{
    route.params.onChangeAddress(addr);
    navigation.goBack();
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserAddress();
    });
    return unsubscribe;
  }, [navigation]);

  if(isProgress){
    return (
      <ProgressDialog
        visible={isProgress}
        titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
        messageStyle={{color:'#333'}}
        dialogStyle={{borderRadius:10}}
        title="Loading Address List"
        message="Please, wait..."
      />
    )
  }
  return (
    <ScrollView>
      {/* Header */}
      <HeaderComponent props={greeting} navigation={navigation} />
      <ProgressDialog
        visible={isUpdateProgress}
        titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
        messageStyle={{color:'#333'}}
        dialogStyle={{borderRadius:10}}
        title="Removing Address"
        message="Please, wait..."
      />
      <View style={styles.container}>        
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={styles.addressText}>Address</Text>
          <TouchableOpacity style={[internalstyles.addaddressbtn]} onPress={() => navigation.navigate('NewAddress', {flag: 1})}>
            <Text style={{color:'#48BBEC',fontWeight:'700'}}>Add New Address</Text>
          </TouchableOpacity>
        </View>

        {address.length === 0 ? (
          <Text style={{color:'#333',fontSize:18,fontWeight:'700'}}>No Address Added</Text>
        ) : (
          address && address.map(addr => {
            return (
              <View style={styles.addressBlock} key={addr.id}>
                <Text style={internalstyles.name}>{addr.name}</Text>
                <Text style={internalstyles.addesss}>{addr.address_one}</Text>
                <Text style={internalstyles.addesss}>{addr.address_two}</Text>
                <Text style={internalstyles.addesss}>Flat No- {addr.flat_no}</Text>
                <Text style={internalstyles.addesss}>House No- {addr.house_no}</Text>
                <Text style={internalstyles.addesss}>Landmark- {addr.landmark}</Text>
                {(selectedAddress && (selectedAddress.id === addr.id)) ? null  :  (
                  <View>
                    <TouchableHighlight style={internalstyles.defaultbtn} onPress={() => goToCheckout(addr)}>
                      <Text style={internalstyles.defaultbtnText}>Deliver to this address</Text>
                    </TouchableHighlight>
                    <View style={{flexDirection:'row',borderTopWidth:1,borderColor:'#eee',paddingTop:5,textAlign: 'center'}}>
                      <TouchableOpacity style={{width:'100%',alignItems:'center'}} onPress={() => removeAddress(addr.id)}>
                        <Text style={[styles.span, {color:'red'}]}>remove this address</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                
                
              </View>
            )
          })
        )}
      </View>

    </ScrollView>
  );
};
const internalstyles = StyleSheet.create({
  name: {fontSize:18,fontWeight:'700',color:'#333'},
  addesss: {fontSize:14,fontWeight:'500',color:'#777'},
  defaultbtn: {backgroundColor:'#48BBEC',width:'55%',alignItems:'center',paddingVertical: 2,marginVertical:8,borderRadius:3},
  addaddressbtn: {marginBottom:5,},
  defaultbtnText: {color:'#fff'},
})
export default AddressScreen;
