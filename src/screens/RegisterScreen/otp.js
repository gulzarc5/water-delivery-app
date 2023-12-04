/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

  import React, { useState } from 'react';
  import { useNavigation } from '@react-navigation/native';
  import { ImageBackground, TextInput, AppRegistry, StyleSheet, Text, View, TouchableOpacity, Image, Button  } from 'react-native';
  import styles from '../LoginScreen/style';
  import  Mainstyles from '../../assets/style';

  function NotificationsScreen() {
    const navigation = useNavigation(); 
    // return(
    //   <Button style={styles.topText}
    //    onPress={() => navigation.navigate('../RegisterScreen')}
    //    title="Go to notifications"
    //  />
    // );
  }

  const Otp = ({navigation}) => {    
  const [text, setText] = useState('');
    
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image style={{width:30,height:30,marginTop:10,alignSelf:'flex-start'}} resizeMode="cover" source={require('../../assets/img/icon/back.png')} />
      </TouchableOpacity>
      <View style={styles.container}>        
        <Image style={{width:140,height:70,marginBottom:50}} resizeMode="cover" source={require('../../assets/img/logo.png')} />
        <Text style={styles.headingText}>Verify Your Number</Text>
        <Text style={styles.subHeading}>We have send you an otp on <Text style={styles.span}>XXXXXXX145</Text> </Text>

        <Text style={styles.labelText}>OTP</Text>
        <TextInput  
          style={styles.inputText}
          placeholder="X X X X X X" 
          placeholderTextColor="#ddd"
          onChangeText={text => setText(text)}
        />
        
        <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
 };
 
 export default Otp;
 