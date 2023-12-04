/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useContext, useState } from 'react';
 import { useNavigation } from '@react-navigation/native';
 import { TextInput, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
 import styles from './style';
 import HeaderComponent from '../../components/CommonScreen/NoTitleHeader'
 import { AuthContext } from '../../components/navigation/StackNavigator';
 import ModalDropdown from 'react-native-modal-dropdown';
import LoaderComponent from '../../components/CommonScreen/Loader';
const GENDER = ['Male', 'Female', 'Others'];
 const AddProfileScreen = ({route}) => {    
    const {authContext, loginState, dispatch} = useContext(AuthContext);
    const navigation = useNavigation();
    const [text, setText] = useState('');
    const mobile = route.params.mobile;

    const updateProfile = (mobile) => {
      authContext.updateProfileHandler(mobile);
    }
    if(loginState.isSpinning ) {
      return(
        <LoaderComponent />
      );
    }
  return (
    <View>
      {/* Header */}
      <HeaderComponent navigation={navigation} />
      <View style={styles.container}>        
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={styles.addressText}>Add Profile</Text>
        </View>
        <View style={styles.addressBlock}>
          <View style={internalstyles.eachFieldItem}>
            <TextInput  
              style={styles.inputText}
              onChangeText={text => setText(text)}
              placeholder="Enter your good name"
            />
          </View>
          <ModalDropdown style={styles.dropdown_6}
              options={GENDER}
              // onSelect={(idx, value) => this._dropdown_6_onSelect(idx, value)} 
              dropdownStyle={{width:'88.5%',height:'40%'}}               
              dropdownTextStyle={{backgroundColor:'#ddd',color:'#333',borderTopWidth:1,borderColor:'#fff',fontSize:15}}
            >                
          </ModalDropdown>
          <View style={internalstyles.eachFieldItem}>
            <TextInput  
              style={styles.inputText}
              onChangeText={text => setText(text)}
              placeholder="Enter your mobile number"
              value={mobile}
              disable={true}
              editable={false} 
              selectTextOnFocus={false}
            />
          </View>

          <View style={internalstyles.eachFieldItem}>
            <TextInput  
              style={styles.inputText}
              onChangeText={text => setText(text)}
              placeholder="Enter your email"
            />
          </View>    
          
          <TouchableHighlight style={internalstyles.defaultbtn} onPress={() => updateProfile(mobile)}>
            <Text style={internalstyles.defaultbtnText}>Add Profile</Text>
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
export default AddProfileScreen;
