

import React, { useContext, useMemo, useReducer, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground, TextInput, AppRegistry, StyleSheet, Text, View, TouchableOpacity, Image, Button, ToastAndroid, ScrollView } from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { AuthContext } from '../../components/navigation/StackNavigator';
import LoaderComponent from '../../components/CommonScreen/Loader';
import { ProgressDialog } from 'react-native-simple-dialogs';
import CountDown from 'react-native-countdown-component';
import OTPInputView from '@twotalltotems/react-native-otp-input';


const Otp = ({ route }) => {
  const { authContext, loginState, dispatch } = useContext(AuthContext);
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const mobile = route.params.mobile;
  const mobileStr = "xxxxxxx" + mobile.slice(-3);
  const [resendVisibility, setResendVisibility] = useState(false);
  const [counter, setcounter] = useState(30);
  const [dialogTitle, setDialogTitle] = useState('Verifying OTP');
  const verifyOtpHandle = (otp) => {
    setDialogTitle('Verifying OTP')
      authContext.verifyOtp(navigation, mobile, otp);
  }
  const sendOtpHandle = (mobile) => {
    setDialogTitle('Resending OTP')
    authContext.OtpHandler(mobile, navigation);
    setcounter(10);
    setResendVisibility(false);
  }

  return (
    <ScrollView style={{ backgroundColor: '#fff', height: '100%' }} >
      <ProgressDialog
        visible={loginState.isSpinning}
        titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
        messageStyle={{color:'#333'}}
        dialogStyle={{borderRadius:10}}
        title={dialogTitle}
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
          <Text style={[styles.headingText, {marginBottom:20}]}>Verify Your Number</Text>
          <Text style={styles.subHeading}>We have send you an otp on <Text style={styles.span}>{mobileStr}</Text> </Text>

           <OTPInputView
            style={{ width: '80%', height: 50, alignSelf: 'center',backgroundColor:'#fff',marginBottom:20}}
            pinCount={5}
            onCodeChanged = {text =>  setText(text)}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            keyboardType={"number-pad"}            
            onCodeFilled = {(text => {
              verifyOtpHandle(text);
            })}
          />
          <TouchableOpacity style={styles.button} onPress={() => verifyOtpHandle(text)}>
              <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>

          {
            resendVisibility ? (
            <TouchableOpacity onPress={() => sendOtpHandle(mobile)} style={{marginTop:30}}>
              <Text style={{color:'red',fontSize:16,fontWeight:'700'}}>resend otp <Icon name='repeat' color='red' /></Text>
            </TouchableOpacity>
            ) :(
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <CountDown
                until={counter}             
                digitStyle={{backgroundColor: '#fff'}}
                digitTxtStyle={{color: '#2c69bc'}}
                timeToShow={['S']}
                timeLabels={{m: null, s: null}}
                onFinish={() => setResendVisibility(true)}
                size={20}
              />
              <Text style={{marginLeft:-10,fontSize:12,fontWeight:'700',color: '#2c69bc',paddingTop:6}}>Sec</Text>
            </View>
            )
          }
          
            
            
        </View>
      </View>
    </ScrollView>
  );
};

export default Otp;
