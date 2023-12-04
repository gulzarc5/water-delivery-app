
import React, { useContext, useEffect, useState } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableHighlight, ToastAndroid } from 'react-native';
import  Mainstyles from '../../assets/style';
import { Checkbox } from 'react-native-paper';
import styles from './style';
import HeaderComponent from '../../components/CommonScreen/NoTitleHeader'
import { ScrollView } from 'react-native-gesture-handler';
import AddressRadioButton from '../../components/RadioButton/addressRadioButton';
import { AuthContext } from '../../components/navigation/StackNavigator';
import DropDownPicker from "react-native-custom-dropdown";
import LoaderComponent from '../../components/CommonScreen/Loader';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ProgressDialog } from 'react-native-simple-dialogs';
import ModalSelector from 'react-native-modal-selector-searchable';
import IocIcon from 'react-native-vector-icons/Ionicons';
const shiftOptions = [
    {
      key: 1,
      text: 'Home',
    },
    {
      key: 2,
      text: 'Office',
    },
];
const NewAddress = ({route}) => {     
  const navigation = useNavigation();
  const {authContext, loginState,dispatch} = useContext(AuthContext);
  const [isProgress,setIsProgress] = useState(false);
 
  const [subArea, setSubArea] = useState([]);
  const [areas, setAreas] = useState([]);
  const [isCheckout,setIsCheckout] = useState(route.params ? route.params.isCheckout : null);  

  const [checked, setChecked] = React.useState(false);

  const [data, setData] = useState({
    name: '',
    mobile: '',
    flat_no: '',
    address_one: '',
    landmark: '',
    main_location_id: '',
    sub_location_id: '',
    pin: '',
    address_status : '',
    errors: '',
  })

  const fetchLocations = async() => {
    const response = await axios.get('/location/list');
    if(response.data.status === true) {
      let area_data = []
      response.data.data && response.data.data.map(location => {
        area_data.push({'key': location.id, 'label': location.name, 'sub_area': location.sub_area,'component': <View><Text styles={styles.locationOption}><IocIcon name='md-location-outline'  style={styles.locationIcon} />{location.name}</Text></View>,});
        }); 
        console.log(area_data);
        setAreas(area_data);
      setIsProgress(false);
    }else{
      setData({...data, errors: ''})  
      setIsProgress(false);
      alert("Something Went Wrong Please Try Again");
    }
  } 

  const [selectedOption, setSelectedOption] = useState({});
  const onSelect = (item) => {    
    setSelectedOption(item);
    setData({...data,address_status:item.key});
  };

  const init =  async()=>{  
    await authContext.fetchUserAddress();
    navigation.navigate('CheckoutScreen');
  }
  const initSubscriptionCheckout =  async()=>{  
    //only used for subscription
    const data = route.params.data ? route.params.data : null;
    const plan = route.params.plan ? route.params.plan : null;
    await authContext.fetchUserAddress();
    navigation.navigate('SCheckout',{plan,data})
  }

  const addAddress = async() => {
    if(checked){
      setIsProgress(true);
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
      const response = await axios.post('user/address/add', data);
      if(response.data.status === true) {
        setData({...data, errors: ''})  
        if(isCheckout == 1){
          await init();
          setIsProgress(false);
        }else if(isCheckout == 2){
          await initSubscriptionCheckout();
          setIsProgress(false);
        }else{
          setIsProgress(false);
          navigation.goBack();
        }
      }else if(response.data.error_code){
        setIsProgress(false);
        setData({...data, errors: response.data.error_message})   
      }else{
        setIsProgress(false);
        alert("Something Went Wrong Please Try Again");
      }
    }else{
      alert("Please Agree Our Terms And Conditions");
    }
  }

  const selectArea = (item) => {
    setData({
      ...data,
      main_location_id: item.key
    })
    if (item) {
      let sub_area_data = []
      item.sub_area && item.sub_area.map(sub_location => {
        sub_area_data.push({'key': sub_location.id, 'label': sub_location.name,'component': <View><Text styles={styles.locationOption}><IocIcon name='md-location-outline' style={styles.locationIcon} />{sub_location.name}</Text></View>,});
      }); 
      sub_area_data ? setSubArea(sub_area_data) : setSubArea([]);
    }
  }

  const selectSubArea = (item) => {
    setData({
      ...data,
      sub_location_id: item.key
    });
  }

  useEffect(() =>{
    fetchLocations();
  },[])

  return (
    <View>
      {/* Header */}
      <HeaderComponent navigation={navigation} title={'Add New Address'} />
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
            <View style={internalstyles.eachFieldItem}>

              {data.errors.name && (<Text style={{color:'red'}}>{data.errors.name}</Text>)}
              <TextInput  
                style={[styles.inputText,{color:'#333'}]}
                placeholder="Name" 
                placeholderTextColor="#777"
                onChangeText={val => setData({...data, name: val})}     
                value = {data.name}
              />
            </View>
            <View style={internalstyles.eachFieldItem}>
              {data.errors.mobile && (<Text style={{color:'red'}}>{data.errors.mobile}</Text>)}
              <TextInput  
                style={[styles.inputText,{color:'#333'}]}
                placeholder="Mobile Number" 
                placeholderTextColor="#777"
                keyboardType={"number-pad"}
                maxLength = {10}
                onChangeText={val => setData({...data, mobile: val})}        
                value = {data.mobile && data.mobile}
              />
            </View>

            <View style={internalstyles.eachFieldItem}>
              {/*  */}
              {data.errors.main_location_id && (<Text style={{color:'red'}}>{data.errors.main_location_id}</Text>)}
              <ModalSelector
                  data={areas}
                  initValue="Click To Select Main Area"
                  onChange={item => selectArea(item)}
                  openButtonContainerAccessible={true}
                  searchText="Search Main Area"
                  style={{padding:0,paddingVertical:0,marginBottom:15,backgroundColor:'#f3f3f3'}}
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
            { data.errors.sub_location_id && (<Text style={{color:'red'}}>{data.errors.sub_location_id}</Text>)}       
              
            <ModalSelector
                  data={subArea}
                  initValue="Click To Select Sub Area"
                  onChange={item => selectSubArea(item)}
                  openButtonContainerAccessible={true}
                  searchText="Search Sub Area"
                  style={{padding:0,paddingVertical:0,marginBottom:15,backgroundColor:'#f3f3f3'}}
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
            {/* <DropDownPicker
              items={(sub_areas && sub_areas.length > 0) ? sub_areas : ([])}
              // defaultValue={state.country}
              placeholder="--Select Sub Area--"
              style={styles.inputText}
              searchable={true}
              searchablePlaceholder="Search for an item"
              searchablePlaceholderTextColor="gray"
              seachableStyle={{}}
              searchableError={() => <Text>Not Found</Text>}
              itemStyle={{
                  justifyContent: 'flex-start'
              }}
              dropDownStyle={{backgroundColor: '#f3f3f3'}}
              onChangeItem={item => selectSubArea(item)}
            /> */}
            { data.errors.address_one && (<Text style={{color:'red'}}>{data.errors.address_one}</Text>)} 
              <TextInput  
                style={[styles.inputText,{color:'#333'}]}
                placeholder="House No / Flat No" 
                placeholderTextColor="#777"
                onChangeText={(val) => setData({...data, flat_no: val})} value={data.flat_no} />

              
              <TextInput  
                style={[styles.inputText,{color:'#333'}]}
                placeholder="Street Name and Apartment Name"  
                placeholderTextColor="#777"
                onChangeText={(val) => setData({...data, address_one: val})} value={data.address_one} />

              { data.errors.landmark && (<Text style={{color:'red'}}>{data.errors.landmark}</Text>)} 
              <TextInput  
                style={[styles.inputText,{color:'#333'}]}
                placeholder="Landmark" 
                placeholderTextColor="#777"
                onChangeText={(val) => setData({...data, landmark: val})} value={data.landmark} />

              { data.errors.pin && (<Text style={{color:'red'}}>{data.errors.pin}</Text>)} 
              <TextInput  
                style={[styles.inputText,{color:'#333'}]}
                placeholder="Pin" 
                placeholderTextColor="#777"
                keyboardType={"number-pad"}
                maxLength = {6}
                onChangeText={(val) => setData({...data, pin: val})} value={data.pin} />  

              { data.errors.address_status && (<Text style={{color:'red'}}>{data.errors.address_status}</Text>)} 
              <View style={{alignItems:'flex-start',flexDirection:'row'}}>
                <AddressRadioButton
                  selectedOption={selectedOption}
                  onSelect={onSelect}
                  options={shiftOptions}
                />
              </View>
            </View>   

            <View>
              <Text style={{ fontSize: 12, color: '#333', fontWeight:'700', letterSpacing: 2, marginBottom:5 }}>DELIVERY INSTRUCTION</Text>
              <View style={internalstyles.delView}>
                <Text style={internalstyles.delIconView}><IocIcon name='information' style={internalstyles.delIcon} /></Text>
                <Text style={internalstyles.delText}>Dear Customer, we endeavour to serve you within 24 hours of the scheduled date.</Text>
              </View>
              <View style={internalstyles.delView}>
                <Text style={internalstyles.delIconView}><IocIcon name='information' style={internalstyles.delIcon} /></Text>
                <Text style={internalstyles.delText}>At the time of refill we only accept same brand jar in exchange.</Text>
              </View>
              <View style={internalstyles.delView}>
                <Text style={internalstyles.delIconView}><IocIcon name='information' style={internalstyles.delIcon} /></Text>
                <Text style={internalstyles.delText}>At any point of time, to ensure sanity and security our delivery partners will not enter your house to delivery your order.</Text>
              </View>
              <View style={internalstyles.delView}>
                <Text style={internalstyles.delIconView}><IocIcon name='information' style={internalstyles.delIcon} /></Text>
                <Text style={internalstyles.delText}>No additional charges till 1st Floor. In case your building doesn’t have a lift you will be charged on number of floors and number of jars by Rs 5/-.</Text>
              </View>
              <View style={internalstyles.delView}>
                <Text style={internalstyles.delIconView}><IocIcon name='information' style={internalstyles.delIcon} /></Text>
                <Text style={internalstyles.delText}>OThe additional delivery charges should be handed over to the executive during the time of Delivery.</Text>
              </View>

            </View>

            <View style={{flexDirection:'row',alignItems:'center',justifyContent: 'center'}}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
              />  
              <Text>I Agree </Text>
            </View>
            
            
            <TouchableHighlight style={internalstyles.defaultbtn} onPress={() => addAddress() }>
              <Text style={internalstyles.defaultbtnText}>Save address</Text>
            </TouchableHighlight>

          </View>
        </View>
        
        {/* Divider */}
        <View style={[Mainstyles.divider, {marginBottom:45}]}></View>
      </ScrollView>
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
  delView: {position:'relative'},
  delIconView: {position:'absolute',top:2,},
  delIcon: {color:'red',fontSize:17},
  delText: {color:'#333',fontSize:14,paddingLeft:20},
})
export default NewAddress;
