/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState } from 'react';
 import { useNavigation } from '@react-navigation/native';
 import { ImageBackground, TextInput, AppRegistry, StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Image, Button,  } from 'react-native';
 import styles from './style';
 import  Mainstyles from '../../assets/style';
 import HeaderComponent from '../../components/CommonScreen/ProfileHeader'

 function NotificationsScreen() {
   const navigation = useNavigation(); 
   // return(
   //   <Button style={styles.topText}
   //    onPress={() => navigation.navigate('../RegisterScreen')}
   //    title="Go to notifications"
   //  />
   // );
 }

 const LoginScreen = ({navigation}) => {    
 const [text, setText] = useState('');
   
  return (
    <View>
      {/* Header */}
      <HeaderComponent navigation={navigation} />

      <View style={styles.container}>
        <Text style={styles.headingText}>Edit Your Profile</Text>

        <Text style={styles.labelText}>Name</Text>
        <TextInput  
          style={styles.inputText}
          placeholder="First Name" 
          placeholderTextColor="#ddd"
          onChangeText={text => setText(text)}
          value="Vishal Nag"
        />

        <Text style={styles.labelText}>Phone</Text>
        <TextInput  
          style={styles.inputText}
          placeholder="Mobile Number" 
          placeholderTextColor="#ddd"
          onChangeText={text => setText(text)}
          value="9436590120"
        />

        <Text style={styles.labelText}>Email</Text>
        <TextInput  
          style={styles.inputText}
          placeholder="Email" 
          placeholderTextColor="#ddd"
          onChangeText={text => setText(text)}
          value="imvishalnag@gmail.com"
        />       
        <Text style={styles.addressText}>Primary Address</Text>
        <View style={styles.addressBlock}>
          <Text>56/1, Greenwood Lane, Lalganesh, Guwahati-34, Assam</Text>
          <Text style={styles.span}>edit this address</Text>
        </View>
        
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText}>Save & Exit</Text>
        </TouchableHighlight>

      </View>
      
    </View>

  );
};

export default LoginScreen;
