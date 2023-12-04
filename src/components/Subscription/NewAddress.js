/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useContext,useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Scrollview} from 'react-native';
import styles from './style';

import { AuthContext } from '../navigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AddressRadioButton from '../RadioButton/addressRadioButton';
import { useNavigation } from '@react-navigation/native';
import { ProgressDialog } from 'react-native-simple-dialogs';
import IocIcon from 'react-native-vector-icons/Ionicons';
import ModalSelector from 'react-native-modal-selector-searchable';
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
const NewAddressComponent = ({onAddressAdd}) => {     
  const navigation = useNavigation();
  const {authContext, loginState,dispatch} = useContext(AuthContext);
  const [isProgress,setIsProgress] = useState(false);
  const area_data = [];
  loginState.data && loginState.data.locations.map(location => {
    area_data.push({'key': location.id, 'label': location.name,'sub_area':location.sub_area,'component': <View><Text styles={styles.locationOption}><IocIcon name='md-location-outline'  style={styles.locationIcon} />{location.name}</Text></View>});
  }); 
  const [areas, setAreas] = useState(area_data);
  const [subAreas, setSubAreas] = useState([]);

  // const [area, setArea] = useState('');
  // const [subArea, setSubArea] = useState('');

  const [data , setData] = useState({
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
  const [selectedOption, setSelectedOption] = useState({});
  const onSelect = (item) => {    
    setSelectedOption(item);
    setData({...data,address_status:item.key});
  };

  // const init =  async()=>{  
  //   await authContext.fetchUserAddress();
  //   navigation.navigate('CheckoutScreen');
  // }
  // const initSubscriptionCheckout =  async()=>{  
  //   //only used for subscription
  //   const data = route.params.data ? route.params.data : null;
  //   const plan = route.params.plan ? route.params.plan : null;
  //   await authContext.fetchUserAddress();
  //   navigation.navigate('SCheckout',{plan,data})
  // }


  const newAddress = async() => {
    try{
      setIsProgress(true);
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
      const response = await axios.post('user/address/add', data);
      if(response.data.status === true) {
        setData({...data, errors: ''})  
        onAddressAdd(response.data.data);
        console.log(response)
        setIsProgress(false);
      }else if(response.data.error_code){
        setIsProgress(false);
        setData({...data, errors: response.data.error_message})   
      }else{
        setIsProgress(false);
        alert("Something Went Wrong Please Try Again");
      }
    }catch(e){
      console.log(e);
      setIsProgress(false);
    }

  }
  const selectArea = (item) => {
    // setArea(item);
    setData({
      ...data,
      main_location_id: item.key
    })
    let sub_area_data = []
    item.sub_area && item.sub_area.map(sub_location => {
      sub_area_data.push({'key': sub_location.id, 'label': sub_location.name,'component': <View><Text styles={styles.locationOption}><IocIcon name='md-location-outline' style={styles.locationIcon} />{sub_location.name}</Text></View>,});
    }); 
    item && item != null ? setSubAreas(sub_area_data) : setSubAreas(null);
  }
  const selectSubArea = (item) => {
    setData({
      ...data,
      sub_location_id: item.key
    });
  }

  

  return (  
      <View style={styles.container}>
        <ProgressDialog
          visible={isProgress}
          titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
          messageStyle={{color:'#333'}}
          dialogStyle={{borderRadius:10}}
          title="Address Add Request Sent"
          message="Please, wait..."
        />
        <View >
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
                  style={{padding:0,paddingVertical:0,marginBottom:15,backgroundColor:'#fff'}}
                  initValueTextStyle={{color:'#777',textAlign:'left',padding:10,fontSize:14,paddingVertical:3,}}
                  selectTextStyle={{color:'#333',textAlign:'left',padding:10,fontSize:14,paddingVertical:3,}}
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
                  data={subAreas}
                  initValue="Click To Select Sub Area"
                  onChange={item => selectSubArea(item)}
                  openButtonContainerAccessible={true}
                  searchText="Search Sub Area"
                  style={{padding:0,paddingVertical:0,marginBottom:15,backgroundColor:'#fff'}}
                  initValueTextStyle={{color:'#777',textAlign:'left',padding:10,fontSize:14,paddingVertical:3,}}
                  selectTextStyle={{color:'#333',textAlign:'left',padding:10,fontSize:14,paddingVertical:3,}}
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
              
        </View>
        <View style={{flexDirection:'row',alignSelf:'center'}}>
          <TouchableOpacity style={[internalstyles.defaultbtn,{backgroundColor:'#48BBEC'}]} onPress={() =>newAddress()}>
            <Text style={{color:'#fff',fontSize:17}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};
const internalstyles = StyleSheet.create({  
  name: {fontSize:17,fontWeight:'700',color:'#444',letterSpacing:1},
  addesss: {fontSize:14,fontWeight:'500',color:'#777',backgroundColor:'#333'},
  outerCircle:{position:'absolute',top:'50%',left:15,backgroundColor:'#ddd',zIndex:2,padding: 2,borderRadius: 7,},
  checkedCircle: {width: 10,height: 10,borderRadius: 7,backgroundColor: '#2c69bc',},
  addressAll: {paddingBottom:10},
  defaultbtn: {width:'100%',alignItems:'center',paddingVertical: 5,paddingHorizontal:10,marginVertical:8,marginHorizontal:2,borderRadius:3,borderColor: '#48BBEC',borderWidth:1,},
  addaddressbtn: {marginBottom:5,},
  eachFieldItem: {flexDirection:'column'},
  locationOption:{flexDirection:'row',color:'#48BBEC',paddingLeft:20},
  locationIcon: {
    fontSize:20,
    color:'#777',
  },
})
export default NewAddressComponent;