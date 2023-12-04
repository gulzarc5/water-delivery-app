
import React, { useContext, useEffect, useState } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Modal, Image } from 'react-native';
import  Mainstyles from '../../assets/style';
import styles from './style';
import HeaderComponent from '../../components/CommonScreen/NoTitleHeader'
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../../components/navigation/StackNavigator';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ProgressDialog } from 'react-native-simple-dialogs';
import ModalSelector from 'react-native-modal-selector-searchable';
import IocIcon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
const BulkScreen = ({route}) => {     
  const navigation = useNavigation();
  const {authContext, loginState,dispatch} = useContext(AuthContext);
  const [isProgress,setIsProgress] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
 
  // const [subArea, setSubArea] = useState([]);
  // const [areas, setAreas] = useState([]);
 
  const [brand, setBrand] = useState([]);
  const [size, setSize] = useState([]);
  // const [isCheckout,setIsCheckout] = useState(route.params ? route.params.isCheckout : null);  

  const [data , setData] = useState({
    name: '',
    mobile: '',
    brand_id: '',
    size_id: '',
    quantity: '',
    address : '',
    errors: '',
  })

  const fetchBrand = async() => {
    const response = await axios.get('bulk/order/brand/size/fetch');
    console.log(response.data.data);
    if(response.data.status === true) {
      let brands_data = []
      response.data.data.brands && response.data.data.brands.map(brands => {
        brands_data.push({'key': brands.id, 'label': brands.name, 'component': <View><Text styles={internalstyles.locationOption}><IocIcon name='water-sharp' style={internalstyles.brandIcon} />  {brands.name}</Text></View>});
      }); 
      let sizes_data = []
      response.data.data.sizes && response.data.data.sizes.map(sizes => {
        sizes_data.push({'key': sizes.id, 'label': sizes.name, 'component': <View><Text styles={internalstyles.locationOption}><IocIcon name='apps' style={internalstyles.sizeIcon} /> {sizes.name}</Text></View>,});
      }); 
      setBrand(brands_data);
      setSize(sizes_data);
      setIsProgress(false);
    }else{
      setData({...data, errors: ''})  
      setIsProgress(false);
      alert("Something Went Wrong Please Try Again");
    }
  }

  const selectBrand = (item) => {
    setData({
      ...data,
      brand_id: item.key
    });
  }

  const selectSize = (item) => {
    setData({
      ...data,
      size_id: item.key
    });
  }
  
  const submitBulkOrder = async() => {
    setIsProgress(true);   
    const response = await axios.post('bulk/order/place', data);
    console.log(data);
    if(response.data.status === true) {
      setData({...data, errors: ''})
      setModalVisible(true);  
    }else if(response.data.error_code){
      setIsProgress(false);
      setData({...data, errors: response.data.error_message}) 
    }else{
      alert("Something Went Wrong Please Try Again");
    }
    setIsProgress(false);
  }

  useEffect(() =>{
    fetchBrand();
  },[])

  return (
    <View>
      {/* Header */}
      <HeaderComponent navigation={navigation} title={'Bulk Order'} />
      <ScrollView>
        <ProgressDialog
          visible={isProgress}
          titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
          messageStyle={{color:'#333'}}
          dialogStyle={{borderRadius:10}}
          title="Address Submited"
          message="Please, wait..."
        />
        <View style={styles.container}>    
          <View style={styles.addressBlock}>
            <Text style={styles.addressText}>Various brand is available of 500 ml, 1L, 2L, 5L, 10L and 20L pack sizes. Pyaas delivers package drinking water direct to your home, office, conference and etc throught guwahati.</Text>
            <Text style={styles.addressTextPt}>1. Order before 12hours of delivery.</Text>
            <Text style={[styles.addressTextPt, {marginBottom:10}]}>2. Minimum Order 10 items.</Text>
            <View style={internalstyles.eachFieldItem}>
              <TextInput  
                style={[styles.inputText,{marginBottom:30,color:'#333'}]}
                placeholder="Name" 
                placeholderTextColor="#777"
                onChangeText={val => setData({...data, name: val})}     
                value = {data.name}
              />
              {data.errors.name && (<Text style={internalstyles.errorLine}>{data.errors.name}</Text>)}
            </View>
            <View style={internalstyles.eachFieldItem}>
              <TextInput  
                style={[styles.inputText,{marginBottom:30,color:'#333'}]}
                placeholder="Mobile Number" 
                placeholderTextColor="#777"
                keyboardType={"number-pad"}
                maxLength = {10}
                onChangeText={val => setData({...data, mobile: val})}        
                value = {data.mobile && data.mobile}
                />
                {data.errors.mobile && (<Text style={internalstyles.errorLine}>{data.errors.mobile}</Text>)}
            </View>

            <View style={internalstyles.eachFieldItem}>              
              <ModalSelector
                data={brand}
                initValue="Select Brand"
                onChange={item => selectBrand(item)}
                openButtonContainerAccessible={true}
                searchText="Search Brand"
                style={{padding:0,paddingVertical:0,marginBottom:30,backgroundColor:'#f3f3f3'}}
                initValueTextStyle={{color:'#777',textAlign:'left',padding:20,paddingVertical:3,}}
                selectTextStyle={{color:'#333',textAlign:'left',padding:20,paddingVertical:3,}}
                overlayStyle=	{{ backgroundColor: '#393939a6' }}
                fullHeight={true}
                searchStyle={{backgroundColor:'#f3f3f3',marginVertical:10,borderBottomWidth:3,borderRightWidth:3}}
                searchTextStyle={{color:'#333',padding:5}}
                cancelStyle={{backgroundColor:'#48BBEC',color:'#fff'}}
                cancelTextStyle={{textTransform:'capitalize',color:'#fff'}}
                optionStyle={{borderBottomColor:'#eee',paddingVertical:5}}
                optionTextStyle={{color:'#48BBEC',textAlign:'left'}}
                optionContainerStyle={{backgroundColor:'#fff'}} 
              />
              {data.errors.brand_id && (<Text style={internalstyles.errorLine}>{data.errors.brand_id}</Text>)}  
            </View>

            <View style={internalstyles.eachFieldItem}>              
              <ModalSelector
                data={size}
                initValue="Select Size"
                onChange={item => selectSize(item)}
                openButtonContainerAccessible={true}
                searchText="Search Size"
                style={{padding:0,paddingVertical:0,marginBottom:30,backgroundColor:'#f3f3f3'}}
                initValueTextStyle={{color:'#777',textAlign:'left',padding:20,paddingVertical:3,}}
                selectTextStyle={{color:'#333',textAlign:'left',padding:20,paddingVertical:3,}}
                overlayStyle=	{{ backgroundColor: '#393939a6' }}
                fullHeight={true}
                searchStyle={{backgroundColor:'#f3f3f3',marginVertical:10,borderBottomWidth:3,borderRightWidth:3}}
                searchTextStyle={{color:'#333',padding:5}}
                cancelStyle={{backgroundColor:'#48BBEC',color:'#fff'}}
                cancelTextStyle={{textTransform:'capitalize',color:'#fff'}}
                optionStyle={{borderBottomColor:'#eee',paddingVertical:5}}
                optionTextStyle={{color:'#48BBEC',textAlign:'left'}}
                optionContainerStyle={{backgroundColor:'#fff'}}
              />  
              { data.errors.size_id && (<Text style={internalstyles.errorLine}>{data.errors.size_id}</Text>)} 
            </View>

            <View style={internalstyles.eachFieldItem}>
              <TextInput  
                style={[styles.inputText,{marginBottom:30,color:'#333'}]}
                placeholder="Quantity(min 10)" 
                placeholderTextColor="#777"
                keyboardType={"number-pad"}
                maxLength = {3}
                onChangeText={(val) => setData({...data, quantity: val})} value={data.quantity}
              /> 
              { data.errors.quantity && (<Text style={internalstyles.errorLine}>{data.errors.quantity}</Text>)} 
            </View>

            <View style={internalstyles.eachFieldItem}>

              <TextInput  
                style={[styles.inputText,{marginBottom:30,color:'#333'}]}
                multiline
                numberOfLines={5}
                placeholder="Complete Address (house no., street name, locality, pincode)" 
                placeholderTextColor="#777"
                onChangeText={(val) => setData({...data, address: val})} value={data.address} 
              />
 
            </View>     
            
            
            <TouchableHighlight style={internalstyles.defaultbtn} onPress={() => submitBulkOrder() }>
              <Text style={internalstyles.defaultbtnText}>Send Order</Text>
            </TouchableHighlight>

          </View>
        </View>
        
        {/* Divider */}
        <View style={[Mainstyles.divider, {marginBottom:45}]}></View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}
        >
          <View style={internalstyles.centeredView}>
            <View style={internalstyles.modalView}>                        
              <Image
                source={require('../../assets/img/logo.png')}
                style={{ width: '30%', height: 100,resizeMode: 'contain',alignSelf:'center' }}
              />
              <View>
                <Text style={{fontSize:27,fontWeight:'700',textAlign:'center',color:'#2c69bc',marginBottom:10}}>Order Successfull</Text>
                <Text style={{fontSize:15,color:'#777',marginBottom:10}}>Your Order is placed. Our excutive will call your in few hours and confirm more details</Text>
              </View>
              <View style={{flexDirection:'row',justifyContent:'flex-end',width:'100%',marginRight:20}}>
                  <TouchableOpacity                  
                  onPress={() => navigation.navigate('HomeScreen')}
                  >
                  <Text style={internalstyles.buttonClose}>Go To Home</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </View>
      </Modal> 
    </View>
  );
};
const internalstyles = StyleSheet.create({
  name: {fontSize:18,fontWeight:'700',color:'#333'},
  addesss: {fontSize:14,fontWeight:'500',color:'#777'},
  defaultbtn: {backgroundColor:'#48BBEC',alignItems:'center',paddingVertical: 7,marginVertical:8,borderRadius:3},
  addaddressbtn: {marginBottom:5,},
  defaultbtnText: {color:'#fff'},
  eachFieldItem: {flexDirection:'column'},
  brandIcon: {color:'#48BBEC',fontSize:16},
  sizeIcon: {color:'#48BBEC',fontSize:16},
  errorLine: {position:'absolute',color:'red',bottom:10},
  
  centeredView: {flex: 1,justifyContent: "center",alignItems: "center",backgroundColor: "#434246a3",},
  modalView: {position:'absolute',top:'25%',width:'100%',backgroundColor: "white",padding: 20,},
  buttonClose: {color: "#000",fontWeight:'700',fontSize:18,marginLeft:10},
  textStyle: {color: "white",fontWeight: "bold",textAlign: "center"},
  modalText: {marginBottom: 15,textAlign: "center"},
})
export default BulkScreen;
