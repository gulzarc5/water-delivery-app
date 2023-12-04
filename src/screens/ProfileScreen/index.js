/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import HeaderComponent from '../../components/CommonScreen/ProfileHeader';
import FixedNavbar from '../../components/CommonScreen/FixedNavbar';
import { ScrollView } from 'react-native-gesture-handler';
  // import validator from 'validator';

const LoginScreen = ({ route }) => {
  const navigation = useNavigation();
  const initiateCall = () => {
    let url =
      'tel:' + 6003737738;
    Linking.openURL(url)
    .then((data) => {
      // console.log('Phone Opened');
    })
    .catch(() => {
      alert('Make sure Phone installed on your device');
    });
  };
  
  return (
    <View>
      {/* Header */}
      <HeaderComponent navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false} style={{height:'79.5%'}} >

        <View style={styles.listContainer}> 

            <TouchableOpacity activeOpacity={.6} style={styles.listItem} onPress={() => navigation.navigate('MyMembership')}>
              <Text style={styles.listItemText}>My Membership</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={.6} style={styles.listItem} onPress={() => navigation.navigate('CoinHistory')}>
              <Text style={styles.listItemText}>Coin History</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={.6} style={styles.listItem} onPress={() => navigation.navigate('CartScreen')}>
              <Text style={styles.listItemText}>My Cart</Text>
            </TouchableOpacity>
            
            <TouchableOpacity activeOpacity={.6} style={styles.listItem} onPress={() => navigation.navigate('AddressScreen')}>
              <Text style={styles.listItemText}>My Address</Text>
            </TouchableOpacity>
            
            {/* <TouchableOpacity activeOpacity={.6} style={styles.listItem} onPress={() => navigation.navigate('Subscription')}>
              <Text style={styles.listItemText}>Notification</Text>
            </TouchableOpacity> */}
            
            <TouchableOpacity activeOpacity={.6} style={styles.listItem} onPress={() => navigation.navigate('HelpDesk')}>
              <Text style={styles.listItemText}>Need Help</Text>
            </TouchableOpacity>
            
            
            <TouchableOpacity activeOpacity={.6} style={[styles.listItem, {borderBottomWidth:0}]} onPress={() => navigation.navigate('Faq')}>
              <Text style={styles.listItemText}>FAQ</Text>
            </TouchableOpacity>            
            
            <TouchableOpacity activeOpacity={.6} style={styles.listItem} onPress={initiateCall} >
              <Text style={styles.listItemText}>Call Customer Care</Text>
            </TouchableOpacity>
        </View>

        {/* Divider */}
        {/* <View style={[Mainstyles.divider, {paddingBottom:120}]}></View> */}
      </ScrollView>

      {/* Fixed Navbar */}
      <FixedNavbar navigation={navigation} style={styles.FixedNavbar} />
    </View>

  );
};
const styles = StyleSheet.create({
  listContainer: {backgroundColor:'#fff',marginTop:10,padding:10, marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,},
  listItem: {borderBottomWidth:1,borderColor:'#eee',paddingVertical: 10,},
  listItemText: {color:'#777',fontWeight:'700',fontSize:13},
})

export default LoginScreen;
