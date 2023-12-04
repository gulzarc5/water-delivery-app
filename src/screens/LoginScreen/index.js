/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useContext, useState} from 'react';
import { ImageBackground, TextInput, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from './style';
import { AuthContext } from '../../components/navigation/StackNavigator';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ProgressDialog } from 'react-native-simple-dialogs';
const LoginScreen = ({ navigation }) => {
  const {authContext, loginState, dispatch} = useContext(AuthContext);
  const [data, setData] = useState({
    mobile: '',
    isValidMobile: true,
    check_textInputChange: false,
  });
  const textInputChange = val => {
      if (val.trim().length === 10) {
          setData({
              ...data,
              mobile: val,
              isValidMobile: true,
              check_textInputChange: true,
          });
      } else {
          setData({
              ...data,
              mobile: val,
              isValidMobile: false,
              check_textInputChange: false,
          });
      }
  };
  const handleValidMobile = val => {
      if (val.trim().length === 10) {
          setData({
              ...data,
              isValidMobile: true
          });
      } else {
          setData({
              ...data,
              isValidMobile: false
          })
      }
  };
  const sendOtpHandle = (mobile) => {
    authContext.OtpHandler(mobile, navigation);
  }
  return (
   <ScrollView style={{ backgroundColor: '#fff', height: '100%' }} >
       <ProgressDialog
        visible={loginState.isSpinning}
        titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
        messageStyle={{color:'#333'}}
        dialogStyle={{borderRadius:10}}
        title="Sending OTP"
        message="Please, wait..."
      />
      <View style={styles.container}>
          <ImageBackground source={require('../../assets/img/water-bg.jpg')} resizeMode='cover' style={{ width: '100%', minHeight: 250, }}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
                  <Icon name="angle-left" style={styles.menuIcon} />
              </TouchableOpacity>
          </ImageBackground>

          <View style={styles.InnerContainer}>
              <Image style={styles.comLogo} resizeMode="cover" source={require('../../assets/img/logo.png')} />
              <Text style={[styles.headingText,{fontSize:25}]}>Login/Register to Account</Text>

              <Text style={styles.labelText}>Phone</Text>
              <TextInput
                  style={[styles.inputText, {marginBottom:40}]}
                  placeholder="Mobile Number"
                  placeholderTextColor="#ddd"
                  keyboardType={"number-pad"}
                  maxLength = {10}
                  onChangeText={val => textInputChange(val)}
                  onEndEditing={e => handleValidMobile(e.nativeEvent.text)}
              />
              {data.check_textInputChange ? (
                  <Animatable.View animation="bounceIn" style={{position:'absolute',top:'29.6%',right:'10%'}}>
                      <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
              ) : null}
              {data.isValidMobile ? null : (
                  <Animatable.View animation="fadeInUp" duration={500} style={{position:'absolute',top:'34%'}}>
                      <Text style={styles.errorMsg}>
                          Mobile no must be 10 digits.
                      </Text>
                  </Animatable.View>
              )}
              <TouchableOpacity style={styles.button}
                  onPress={() => sendOtpHandle(data.mobile)}>
                  <Text style={styles.buttonText}>Get OTP</Text>
              </TouchableOpacity>
          </View>
      </View>
   </ScrollView>
  );
};

export default LoginScreen;
