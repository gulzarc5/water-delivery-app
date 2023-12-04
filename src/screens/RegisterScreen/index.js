/**
   * Sample React Native App
   * https://github.com/facebook/react-native
   *
   * @format
   * @flow strict-local
   */

 import React, { useContext, useState } from 'react';
 import { useNavigation } from '@react-navigation/native';
 import { ImageBackground, TextInput, Text, View, TouchableOpacity, Image, ScrollView,} from 'react-native';
 import styles from './style';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import validator from 'validator';
 import * as Animatable from 'react-native-animatable';
 import { AuthContext } from '../../components/navigation/StackNavigator';
 import Feather from 'react-native-vector-icons/Feather';
 import RadioButton from '../../components/RadioButton/GenderRadioButton';
import LoaderComponent from '../../components/CommonScreen/Loader';
 const gender = [
  {
    key: 1,
    text: 'Male',
  },
  {
    key: 2,
    text: 'Female',
  },
];
 const RegisterScreen = ({route}) => {    
   const {authContext, loginState, dispatch} = useContext(AuthContext);
   const navigation = useNavigation();
   const response = route.params.response;
   const createProfile = () => {
     authContext.createProfileHandle(data);
   }

   const [data, setData] = useState({
     name: '',
     isValidName: false,
     check_textInputChangeName: false,
     check_textInputChangeGender: false,
     otp: response.otp,
     mobile: response.mobile,
     gender: {key: 1, text: 'Male'}
   });
   const nameData = val => {
     if (val.trim().length >= 1) {
       setData({
         ...data,
         name: val,
         check_textInputChangeName: true,
         isValidName: true,
       });
     } else {
       setData({
         ...data,
         username: val,
         check_textInputChangeName: false,
         isValidName: false,
       });
     }
   };
   const handleValidName = val => {
     if (val.trim()) {
       setData({
         ...data,
         isValidName: true,
       });
     }
   };
   const genderHandle = item => {
    if(data.gender && data.gender.key === item.key){
      setData({
        ...data,
        gender: null
      })
    }else{
      setData({
        ...data,
        gender: item
      })
    }
   }

   if(loginState.isSpinning ) {
    return(
      <LoaderComponent />
    );
  }
   return (

     <ScrollView style={{ backgroundColor: '#fff', height: '100%' }} >
       
       <View style={styles.container}>        
         <ImageBackground source={require('../../assets/img/water-bg.jpg')} resizeMode='cover' style={{width:'100%',minHeight:250,}}>          
           <TouchableOpacity onPress={() => navigation.goBack()} style={{padding:5}}>
             <Icon name="angle-left" style={styles.menuIcon}/>
           </TouchableOpacity>
         </ImageBackground>
         
         <View style={styles.InnerContainer}>

           <Image style={{width:180,height:65,marginBottom:20}} resizeMode="cover" source={require('../../assets/img/logo.png')} />
           <Text style={styles.headingText}>Create Profile</Text>

           <Text style={styles.labelText}>Phone</Text>
           <TextInput  
             style={styles.inputText}
             placeholder="Mobile Number" 
             placeholderTextColor="#bbb"
             value={response.mobile}
             disable={true}
             editable={false} 
             selectTextOnFocus={false}
           />

           <Text style={styles.labelText}>Name</Text>
           <TextInput  
             style={[styles.inputText, {marginBottom:30}]}
             placeholder="Your good name" 
             placeholderTextColor="#bbb"
             onChangeText={val => nameData(val)}
             onEndEditing={e => handleValidName(e.nativeEvent.text)}
           />
           {data.check_textInputChangeName ? (
                 <Animatable.View animation="bounceIn" style={{position:'absolute',top:'31.6%',right:'10%'}} >
                     <Feather name="check-circle" color="green" size={20}/>
                 </Animatable.View>
             ) : null}
             {data.isValidName ? null : (
                 <Animatable.View animation="fadeInLeft"duration={500} style={{position:'absolute',top:'35%'}}>
                     <Text style={{color: 'red'}} >
                         Name is required
                     </Text>
                 </Animatable.View>
             )}
             <RadioButton
              selectedOption={data.gender}
              onSelect={genderHandle}
              options={gender}
            />
           <TouchableOpacity style={[styles.button, {marginTop:20}]} onPress={() => createProfile()}>
             <Text style={styles.buttonText}>Continue</Text>
           </TouchableOpacity>
         </View>
       
       </View>

     </ScrollView>
   );
 };

 export default RegisterScreen;