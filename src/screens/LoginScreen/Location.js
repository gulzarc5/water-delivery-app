import React, { useState,useEffect } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import {  Dropdown} from 'sharingan-rn-modal-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import IocIcon from 'react-native-vector-icons/Ionicons';

import DropDownPicker from "react-native-custom-dropdown";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ProgressDialog } from 'react-native-simple-dialogs';
import ModalSelector from 'react-native-modal-selector-searchable'
import { color } from 'react-native-reanimated';


const LocationScreen = ({navigation}) => {
  const [subArea, setSubArea] = useState([]);
  const [areas, setAreas] = useState([]);
  const [isProgress,setIsProgress] = useState(true);

  const [data , setData] = useState({
    main_location_name: '',
    sub_location_name: '',
  })

  const selectArea = (item) => {
    setData({
      ...data,
      main_location_name: item.label
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
      sub_location_name: item.label
    });
  }

  const setLocationData = async () =>{
    if (data.main_location_name && data.sub_location_name) {
      AsyncStorage.setItem('location', JSON.stringify(data));
      navigation.goBack();
    }else{
      alert("Please Select Location");
    }
  }

  const fetchLocations = async() => {
    const response = await axios.get('/location/list');
    if(response.data.status === true) {
      let area_data = []
      response.data.data && response.data.data.map(location => {
        area_data.push({'key': location.id, 'label': location.name, 'sub_area': location.sub_area,'component': <View><Text styles={styles.locationOption}><IocIcon name='md-location-outline'  style={styles.locationIcon} />{location.name}</Text></View>,});
        }); 
        setAreas(area_data);
      setIsProgress(false);
    }else{
      setData({...data, errors: ''})  
      setIsProgress(false);
      alert("Something Went Wrong Please Try Again");
    }
  }
  

  useEffect(() => {
    fetchLocations();
  }, [navigation])

  if (isProgress) {
    return(
      <ProgressDialog
        visible={isProgress}
        titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
        messageStyle={{color:'#333'}}
        dialogStyle={{borderRadius:10}}
        title="Loading Locations"
        message="Please, wait..."
      />
    )
  } else {
    return (
      <View
        style={{
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <ScrollView style={{backgroundColor:'#eee'}}>          
          <TouchableOpacity onPress={() => navigation.goBack()} style={{padding:5}}>
            <Icon name="angle-left" style={styles.menuIcon}/>
          </TouchableOpacity>
          <Image style={{ width: 100, height: 100, marginTop: 100,zIndex:99,alignSelf:'center' }} resizeMode="cover" source={require('../../assets/img/location.png')} />
          <View style={styles.MainBlock}>
            
            <Text style={styles.headingText}>Select Location</Text>
            <View style={styles.dropdownBlock}>
              <Text style={styles.labelText}>Select Area</Text>
              <ModalSelector
                  data={areas}
                  initValue="Click To Select Main Area"
                  onChange={item => selectArea(item)}
                  openButtonContainerAccessible={true}
                  searchText="Search Main Area"
                  initValueTextStyle={{color:'#aaa',paddingLeft:110,textAlign:'left'}}
                  selectTextStyle={{color:'#333',paddingLeft:110,textAlign:'left'}}
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
            </View>
            <View style={styles.dropdownBlock}>
              <Text style={styles.labelText}>Select Locality</Text>
              <ModalSelector
                  data={subArea}
                  initValue="Click To Select Locality"
                  onChange={item => selectSubArea(item)}
                  openButtonContainerAccessible={true}
                  searchText="Search Locality"
                  initValueTextStyle={{color:'#aaa',paddingLeft:110,textAlign:'left'}}
                  selectTextStyle={{color:'#333',paddingLeft:110,textAlign:'left'}}
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
            </View>
            <TouchableOpacity style={styles.button}
              onPress={() => setLocationData()}>
              <Text style={styles.buttonText}>Set Location</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );    
  }
};
const styles = StyleSheet.create({
  MainBlock: {
    justifyContent: 'center',padding: 10,margin: 10,paddingTop:60,backgroundColor:'#fff',borderWidth: 1,borderColor: '#ddd',borderRadius:10,position:'relative',marginTop: -50,},
  image: {  flex: 2,  resizeMode: "contain",  justifyContent: "center"},
  inputText:{
    width:"100%",  borderRadius:5,  marginBottom:20,  padding:5,  paddingLeft:80,  color:'#333',  textAlign:'left',  borderColor: '#ddd',  borderWidth: 1,      },
  headingText:{  marginBottom:20,  padding:5,  color:'#48BBEC',  fontSize: 30,  fontWeight:"700",  alignSelf: 'center',  fontFamily: "Cochin"},
  dropdownBlock:{  marginBottom:20,},
  buttonView: { display: 'flex',  justifyContent: 'center',  flexDirection: 'row',  marginTop: 10,},
  buttonText: {  fontSize: 18,  color: 'white',  alignSelf: 'center',  fontWeight: '700'},
  button: {  height: 36,  backgroundColor: '#48BBEC',  borderColor: '#48BBEC',  borderWidth: 1,  borderRadius: 8,  marginBottom: 10,  alignSelf: 'center',  justifyContent: 'center',  width: '90%'},
  topText: { width: 250, backgroundColor:"#ffffff00", alignSelf:"flex-end"},
  labelText:{
    position:'absolute',
    top:'30%',
    left:10,
    color: '#48BBEC',
    width:100,
    borderRightWidth:1,
    borderRightColor:'#ddd'
  },
  bottomText: {
    fontSize: 14,
    marginBottom:30,
  },
  span:{      
    color:'#48BBEC',
  },
  subHeading: {
    color:'#333',
    marginTop: -20,
    marginBottom:30,
  },
  errorMsg: {
    color:'red'
  },
  menuIcon: {
    fontSize:30,
    color:'#48BBEC',
    alignSelf:'flex-start', 
    justifyContent:'center', 
    backgroundColor:'#fff',
    paddingHorizontal:10,
    borderRadius:50,
  },
  locationOption:{flexDirection:'row',color:'#48BBEC',paddingLeft:20},
  locationIcon: {
    fontSize:20,
    color:'#777',
  },
})
export default LocationScreen;