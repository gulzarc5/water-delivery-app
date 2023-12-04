
import React, { useContext, useEffect,useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TextInput, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import { Checkbox } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './style';
import  Mainstyles from '../../assets/style';
import HeaderComponent from '../../components/CommonScreen/NoTitleHeader'
import { AuthContext } from '../../components/navigation/StackNavigator';
import DropDownPicker from "react-native-custom-dropdown";
import AddressRadioButton from '../../components/RadioButton/addressRadioButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ConfirmDialog,ProgressDialog } from 'react-native-simple-dialogs';
import ModalSelector from 'react-native-modal-selector-searchable';
import IocIcon from 'react-native-vector-icons/Ionicons';
  
 
const EditScreen = ({route}) => {  
const navigation = useNavigation();  
const {authContext, loginState, dispatch} = useContext(AuthContext);
const [address,setAddress] = useState(route.params.address_data ? route.params.address_data : null );
const [areas,setAreas] = useState([]);
const [selectedArea,setSelectedArea] = useState(null);
const [subAreas,setSubAreas] = useState([]);
const [selectedSubArea,setSelectedSubArea] = useState(null);
const [errors,setErrors] = useState(null);
const [isProgress,setIsProgress] = useState(false);

const [checked, setChecked] = React.useState(false);
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



const selectArea = (item) => {
  setAddress({
    ...address,
    main_location_id: item.key
  })
  if(item && item != null && item.sub_area){
    let subAreaData = [];
    item.sub_area && item.sub_area.map(sub => {
      // subAreaData.push({'label': sub.name, 'value': sub.id});
      subAreaData.push({'key': sub.id, 'label': sub.name, 'component': <View><Text styles={styles.locationOption}><IocIcon name='md-location-outline'  style={styles.locationIcon} />{sub.name}</Text></View>,});
    })
    setSubAreas(subAreaData);
  }
}
const selectSubArea = (item) => {
  setAddress({
    ...address,
    sub_location_id: item.key
  });
}

const [selectedOption, setSelectedOption] = useState({});
const onSelect = (item) => {
  setSelectedOption(item);
  setAddress({...address,address_status:item.key});
};

const updateAddress = async(id) => {
  if(checked){
    setIsProgress(true);
    const user = await AsyncStorage.getItem('user');
    const modifiedUser = JSON.parse(user);
    axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
    const response = await axios.put(`user/address/update/${id}`, address);
    console.log(response);
    if(response.data.status === true) {
      setErrors(null);
      setIsProgress(false);
      // alert("Address Updated Successfully");
      navigation.goBack();
    }else if(response.data.error_code){
      setIsProgress(false);
      setErrors(response.data.error_message)   
    }else{
      setIsProgress(false);
      alert("Something Went Wrong Please Try Again");
    }
  }else{
    alert("Please Agree Our Terms And Conditions");
  }
}



const fetchLocations = async() => {
  const response = await axios.get('/location/list');
  if(response.data.status === true) {
    let area_data = []
    response.data.data && response.data.data.map(location => {
      area_data.push({'key': location.id, 'label': location.name, 'sub_area': location.sub_area,'component': <View><Text styles={styles.locationOption}><IocIcon name='md-location-outline'  style={styles.locationIcon} />{location.name}</Text></View>,});
        if (address.main_location_id == location.id) {
          let subAreaData = [];
          location.sub_area && location.sub_area.map(sub => {
            subAreaData.push({'key': sub.id, 'label': sub.name, 'component': <View><Text styles={styles.locationOption}><IocIcon name='md-location-outline'  style={styles.locationIcon} />{sub.name}</Text></View>,});
          })
          setSubAreas(subAreaData);
          setSelectedSubArea(address.sub_location_id)
        }
      }); 
      setAreas(area_data);
      setSelectedArea(address.main_location_id);
      setIsProgress(false);
  }else{
    setData({...data, errors: ''})  
    setIsProgress(false);
    alert("Something Went Wrong Please Try Again");
  }
}

// const areaArray = () => {
// let areaData=[];
// loginState.data && loginState.data.locations.map(location => {
//   areaData.push({'label': location.name, 'value': location.id, 'sub_area': location.sub_area});
//   if (address.main_location_id == location.id) {
//     let subAreaData = [];
//     location.sub_area && location.sub_area.map(sub => {
//       subAreaData.push({'label': sub.name, 'value': sub.id});
//     })
//     setSubAreas(subAreaData);
//     setSelectedSubArea(address.sub_location_id)
//   }
// });
// setAreas(areaData);
// setSelectedArea(address.main_location_id)
// }

useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    fetchLocations();
    if (address && address.address_status) {
      address.address_status == 1 ? (
        setSelectedOption({
          key: 1,
          text: 'Home',
        })
      ):(
        setSelectedOption({
          key: 2,
          text: 'Office',
        })
      )
    }
  });
  return unsubscribe;
}, [navigation]);

  return (
    <View>
      {/* Header */}
      <HeaderComponent navigation={navigation} />
      <ProgressDialog
            visible={isProgress}
            titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
            messageStyle={{color:'#333'}}
            dialogStyle={{borderRadius:10}}
            title="Updating Address"
            message="Please, wait..."
      />
      <ScrollView>
        <View style={styles.container}>        
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          { address ?
            <Text style={styles.addressText}>Edit Address</Text> : <Text style={styles.addressText}>Add Address</Text> }
          </View>
          <View style={styles.addressBlock}>
            <View style={internalstyles.eachFieldItem}>
              <TextInput  
                style={styles.inputText}
                onChangeText={text => setAddress({...address,name:text})}
                value={address ? address.name : ''}
                placeholder="Enter Name"
              />
            </View>

            <View style={internalstyles.eachFieldItem}>
              <TextInput  
                style={styles.inputText}
                onChangeText={val => setAddress({...address,mobile:val})}
                value={address ? address.mobile : ''}
                keyboardType={"number-pad"}
                placeholder="Enter Mobile"
                maxLength = {10}
              />
            </View>

            <View style={internalstyles.eachFieldItem}>
                {/*  */}
                {errors && errors.main_location_id && (<Text style={{color:'red'}}>{errors.main_location_id}</Text>)}
                {/* <DropDownPicker
                  items={areas}
                  placeholder="--Select Area--"
                  style={[styles.inputText, {padding: 10,width:'100%',height:'100%'}]}
                  searchable={true}
                  searchablePlaceholder="Search for an item"
                  searchablePlaceholderTextColor="gray"
                  seachableStyle={{}}
                  searchableError={() => <Text>Not Found</Text>}
                  itemStyle={{
                      justifyContent: 'flex-start'
                  }}
                  defaultValue={selectedArea}
                  dropDownStyle={{backgroundColor: '#f3f3f3'}}
                  onChangeItem={item => selectArea(item)}
              /> */}

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
                  selectedKey={selectedArea}
              />    
            </View>
            
            <View style={internalstyles.eachFieldItem}>
                {/*  */}
                {errors && errors.sub_location_id && (<Text style={{color:'red'}}>{errors.sub_location_id}</Text>)}
                {/* <DropDownPicker
                  items={subAreas}
                  placeholder={"--Select Sub Area--"}
                  style={[styles.inputText, {padding: 10,width:'100%',height:'100%'}]}
                  searchable={true}
                  searchablePlaceholder="Search for an item"
                  searchablePlaceholderTextColor="gray"
                  seachableStyle={{}}
                  searchableError={() => <Text>Not Found</Text>}
                  itemStyle={{
                      justifyContent: 'flex-start'
                  }}
                  defaultNull={address.sub_location_id === null}
                  defaultValue={selectedSubArea}
                  dropDownStyle={{backgroundColor: '#f3f3f3'}}
                  onChangeItem={item => selectSubArea(item)}
              /> */}
                <ModalSelector
                  data={subAreas}
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
                  selectedKey={selectedSubArea}
              />   
            </View>
            
            <View style={internalstyles.eachFieldItem}>            
              <TextInput  
                style={styles.inputText}
                placeholder="House /Flat No." 
                placeholderTextColor="#888"
                onChangeText={text => setAddress({...address,flat_no:text})}
                value={address ? address.flat_no : ''}
              />
              <TextInput  
                style={styles.inputText}
                placeholder="Street Name and Apartment Name" 
                placeholderTextColor="#888"
                onChangeText={text => setAddress({...address,address_one:text})}
                value={address ? address.address_one : ''}
              />
              <TextInput  
                style={styles.inputText}
                placeholder="Land Mark" 
                placeholderTextColor="#888"
                onChangeText={text => setAddress({...address,landmark:text})}
                value={address ? address.landmark : ''}
              />
              <TextInput  
                style={styles.inputText}
                placeholder="PIN No" 
                placeholderTextColor="#888"
                keyboardType={"number-pad"}
                onChangeText={(val) => setAddress({...address, pin: val})} 
                maxLength = {6}
                value={address ? address.pin : ''}
              />
            </View>   
            
            { errors && errors.address_status && (<Text style={{color:'red'}}>{errors.address_status}</Text>)} 
              <View style={{alignItems:'flex-start',flexDirection:'row'}}>
                <AddressRadioButton
                  selectedOption={selectedOption}
                  onSelect={onSelect}
                  options={shiftOptions}
                />
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
          
            <TouchableHighlight style={internalstyles.defaultbtn} onPress={()=> updateAddress(address.id)}>
              <Text style={internalstyles.defaultbtnText}>Update address</Text>
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
  delView: {position:'relative'},
  delIconView: {position:'absolute',top:2,},
  delIcon: {color:'red',fontSize:17},
  delText: {color:'#333',fontSize:14,paddingLeft:20},
})


export default EditScreen;
