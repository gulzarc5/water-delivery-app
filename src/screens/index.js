/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { ImageBackground, TextInput, AppRegistry, StyleSheet, Text, View, TouchableHighlight, Image, Button, ScrollView, TouchableOpacity, Icon } from 'react-native';
//  import styles1 from './style';
import Mainstyles from '../assets/style';



const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Image
        source={require('src/assets/img/splash.png')}
        style={styles.bannerImage}
      />
      <Image
        source={require('src/assets/img/logo.png')}
        style={styles.bannerImage}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  header: { justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: '#fff', },
  headerText: { fontSize: 30, fontWeight: "700", color: '#fff' },
  pagination: { flexDirection: 'row', position: 'absolute', bottom: -20, alignSelf: 'center', },
  paginationText: { color: '#888', fontSize: 50, },
  paginationActiveText: { color: '#fff', fontSize: 50, },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  navLogo: { width: 100, height: 50, resizeMode: 'cover', marginRight: 120 },
  navIcon: { width: 30, height: 30, resizeMode: 'contain', alignSelf: 'flex-end' },
  navUser: { width: 40, height: 40, resizeMode: 'cover', alignSelf: 'flex-end', borderWidth: 1, borderRadius: 50, borderColor: '#bbb', marginTop: 10 },

  productBrand: { backgroundColor: '#fff', shadowColor: "#000", shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 8, },

  homeBanner: { backgroundColor: '#eee', shadowColor: "#000", shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 8, },
  homeBannerInner: { margin: 5, borderRadius: 10, overflow: 'hidden' },
  bannerImage: { width: '100%', height: 160, resizeMode: 'cover', },

  subscriptionPlan: { backgroundColor: '#2c69bc', shadowColor: "#000", shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 8, },

  productSection: { backgroundColor: '#eee', shadowColor: "#000", shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 8, marginBottom: 40 },
  headerBlock: { flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, marginBottom: 10 },
  productHeading: { fontSize: 16, color: '#333', alignSelf: 'center', fontWeight: '700', marginTop: 10, textTransform: 'uppercase' },
  productSubHeading: { fontSize: 12, color: '#fff', paddingLeft: 10, paddingRight: 10, padding: 2, marginTop: 10, alignSelf: 'center', borderWidth: 1, borderRadius: 50, borderColor: '#bbb', backgroundColor: '#2c69bc' },
  productBlock: { flexDirection: 'row', flexWrap: 'wrap', borderRadius: 5, borderWidth: 1, borderColor: '#eee', overflow: 'hidden', borderBottomWidth: 0, backgroundColor: '#eee', justifyContent: 'space-between' },
  productItem: { flexDirection: 'column', width: "49.8%", alignItems: 'center', backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee', },
  productImage: { margin: 10, },
  productName: { fontSize: 15, color: '#333', fontWeight: '500' },
  productQuantity: { fontSize: 13, color: 'red', },
  productPrice: { fontSize: 15, color: '#333' },

  cartPrice: { textAlign: 'left', marginBottom: 10, flexDirection: 'row' },
  itemPrice: { fontSize: 15, fontWeight: '700' },
  // cartPriceDiscount: {backgroundColor:'green',borderRadius:15},
  cartPriceDiscountText: { fontSize: 15, fontWeight: "700", color: 'green', textAlign: 'left' },
})

export default HomeScreen;
