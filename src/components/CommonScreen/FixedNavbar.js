
 import React from 'react';
 import {View, Text, TouchableOpacity, StyleSheet,Linking } from 'react-native';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import LinearGradient from 'react-native-linear-gradient';

const FixedNavbar = ({navigation}) => {   
  const initiateWhatsApp = () => {
    let url =
      'whatsapp://send?'+
      'phone=91' + 6003737738;
    Linking.openURL(url)
    .then((data) => {
      console.log('WhatsApp Opened');
    })
    .catch(() => {
      alert('Make sure Whatsapp installed on your device');
    });
  };

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
    <View style={styles.fixedNavbar}>
      <LinearGradient colors={['#ddd', '#fff']} style={styles.fixedNavbarInner}>

        {/* Whatsapp Button */}
        <TouchableOpacity activeOpacity={.9} style={styles.navBtn} onPress={initiateWhatsApp} >
            <Icon name="whatsapp" style={styles.menuIcon}/>
            <Text style={styles.menuIconText}>Order on Whatsapp</Text>
        </TouchableOpacity>

        {/* Home Button */}
        <TouchableOpacity activeOpacity={.9} style={styles.navBtn} onPress={() => navigation.navigate('HomeScreen')}>
            <Icon name="home" style={styles.homeMenuIcon}/>
            <Text style={styles.homeMenuIconText}>Home</Text>
        </TouchableOpacity>

        {/* Call Button */}
        <TouchableOpacity activeOpacity={.9} style={styles.navBtn} onPress={initiateCall} >
            <Icon name="phone" style={styles.menuIcon}/>
            <Text style={styles.menuIconText}>Call to Order</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  fixedNavbar: { position:'absolute',bottom:'8%',padding: 5,paddingBottom:0,paddingTop:10},
  fixedNavbarInner : {flexDirection: 'row',justifyContent:'space-between',width:'100%',borderTopLeftRadius:20,borderTopRightRadius:20,paddingTop:5,paddingBottom:5},
  navBtn: {width:'33.3%',alignItems:'center'},
  menuIcon: {fontSize:25,color:'#2c69bc',justifyContent:'center', paddingBottom:5,},
  menuIconText: {fontSize:12,color:'#333',justifyContent:'center',fontWeight:'700'},

  homeMenuIcon: {justifyContent:'center',marginTop:-30,fontSize:40,backgroundColor:'#2c69bc',color:'#fff',width:60,height:60,borderRadius:50,padding:11},
  homeMenuIconText: {fontSize:12,color:'#333',justifyContent:'center',fontWeight:'700',marginTop:2},

  navLogo: {width:100,height:50,resizeMode:'cover',marginRight:120},
  navIcon: {width:30,height:30,resizeMode:'contain',alignSelf:'flex-end'},
  navUser: {width:40,height:40,resizeMode:'cover',alignSelf:'flex-end',borderWidth:1,borderRadius:50,borderColor:'#fff',marginTop:5},
  headIcon: {fontSize:40,color:'#777',alignSelf:'flex-start', justifyContent:'center', paddingTop:10, paddingLeft:10,},
  headingText: {fontSize:30, fontWeight:"700",color:'#333'},
  subHeading: {fontSize:15, fontWeight:"500",color:'#2c69bc'},
  topProfileBox: {justifyContent: 'center', alignItems:'center', padding: 10, paddingTop:0, flexDirection:'row' },
  topProfileInfo: {width:'75%',paddingTop:25},
  profilePhoto: {width:'25%',borderWidth:1,borderColor:'#2c69bc',borderRadius:50,overflow:'hidden',padding: 2,backgroundColor:'#fff'},
})
 
 export default FixedNavbar;