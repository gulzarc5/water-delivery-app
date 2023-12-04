
import React, { useContext,useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TextInput, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import styles from './style';
import HeaderComponent from '../../components/CommonScreen/NoTitleHeader'
import { AuthContext } from '../../components/navigation/StackNavigator';
import RadioButton from '../../components/RadioButton/GenderRadioButton';
import { ProgressDialog } from 'react-native-simple-dialogs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const gender = [
  {
    key: 'M',
    text: 'Male',
  },
  {
    key: 'F',
    text: 'Female',
  },
];


const EditProfileScreen = ({route}) => {    
  const {authContext, loginState, dispatch} = useContext(AuthContext);
  const navigation = useNavigation();
  const [user,setUser ]= useState(route.params.user);
  const [selectedGender,setSelectedGender]= useState({key: 'M', text: 'Male'});
  const [isProgress,setIsProgress] = useState(false);
  const [errors,setErrors] = useState(false);
  
  const [data, setData] = useState({
    name : user.name,
    mobile : '',
    email : user.email,
    gender : user.gender,
  });

  const genderHandle = item => {
    setData({
      ...data,
      gender: item.key
    })
    setSelectedGender(item);
  }
  const checkGender = ()=>{
    if (user) {
      if (user.gender == 'M') {
        setSelectedGender({key: 'M', text: 'Male'});
      } else if (user.gender == 'F'){
        setSelectedGender({key: 'F', text: 'Male'});        
      }
    }
  }

  const userProfileUpdate = async()=>{
    setIsProgress(true);
    try {
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
      const response = await axios.post('/user/profile/update',data);
      
      if (response.data.status !== true) {
        setIsProgress(false);
        setErrors('');
        if (response.data.error_code) {
          setErrors(response.data.error_message);
        } else {          
          alert(response.data.message);
        }
      }
      if (response.data.status == true) {
        setErrors('');
        setIsProgress(false);
        alert(response.data.message);
      }
    } catch (error) {
      setIsProgress(false);
      console.log(error);
      alert("Something Wrong Please Close The App And Open Again");
    }
  }


  useEffect(() => {
    checkGender();
  }, [])
return (
  <View>
    {/* Header */}
    <HeaderComponent navigation={navigation} />
    <ProgressDialog
        visible={isProgress}
        titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
        messageStyle={{color:'#333'}}
        dialogStyle={{borderRadius:10}}
        title="Loading Your Profile"
        message="Please, wait..."
      />
    <View style={styles.container}>        
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={styles.addressText}>Add Profile</Text>
      </View>
      <View style={styles.addressBlock}>
        <View style={internalstyles.eachFieldItem}>
          <TextInput  
            style={styles.inputText}
            onChangeText={text => setData({...data,name:text})}
            value={data.name ? data.name :  user.name}
            placeholder="Enter your good name"
          />
        </View>
        
        <View style={internalstyles.eachFieldItem}>
          <TextInput  
              style={styles.inputText}
              value={user ? user.mobile : null}
              placeholder="Enter your Mobile Number"
              disabled={true}
              editable={false}
            />
        </View>

        <View style={internalstyles.eachFieldItem}>
          <TextInput  
            style={styles.inputText}
            onChangeText={text => setData({...data,email:text})}
            value={user ? user.email : null}
            placeholder="Enter your email"
          />
        </View>    

        <View>
        <RadioButton
            selectedOption={selectedGender}
            onSelect={genderHandle}
            options={gender}
          />
        </View>
        
        <TouchableHighlight style={internalstyles.defaultbtn} onPress={() => userProfileUpdate()}>
          <Text style={internalstyles.defaultbtnText}>Update Profile</Text>
        </TouchableHighlight>
      </View>

    </View>

  </View>
);
};
const internalstyles = StyleSheet.create({
  name: {fontSize:18,fontWeight:'700',color:'#333'},
  addesss: {fontSize:14,fontWeight:'500',color:'#777'},
  defaultbtn: {backgroundColor:'#48BBEC',alignItems:'center',paddingVertical: 7,marginVertical:8,borderRadius:3},
  addaddressbtn: {marginBottom:5,},
  defaultbtnText: {color:'#fff'},
  eachFieldItem: {flexDirection:'column'}
})
export default EditProfileScreen;
