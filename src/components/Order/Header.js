
 import React from 'react';
 import {View, Text, TouchableOpacity, StyleSheet,} from 'react-native';

 import Icon from 'react-native-vector-icons/FontAwesome';

const HeaderComponent = ({navigation}) => {
   return (
    <View style={styles.header}>
        <View style={styles.headerRow}>
        {/* Back Button */}
        <TouchableOpacity activeOpacity={.9} style={{width:'10%'}} onPress={() => navigation.goBack()}>
            <Icon name="angle-left" style={styles.menuIcon}/>
        </TouchableOpacity>
        <Text style={styles.headerText}>My Orders</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { justifyContent: 'center', alignItems:'center', padding: 10, backgroundColor:'#2c69bc',  },
  headerText: {fontSize:20, fontWeight:"500",color:'#fff', paddingTop:11,},
  headerRow : {flexDirection: 'row',justifyContent:'flex-start',width:'100%'},
  menuIcon: {fontSize:40,color:'#fff',alignSelf:'flex-start', justifyContent:'center', paddingTop:5,},
  navLogo: {width:100,height:50,resizeMode:'cover',marginRight:120},
  navIcon: {width:30,height:30,resizeMode:'contain',alignSelf:'flex-end'},
  navUser: {width:40,height:40,resizeMode:'cover',alignSelf:'flex-end',borderWidth:1,borderRadius:50,borderColor:'#fff',marginTop:10},
  headIcon: {fontSize:40,color:'#777',alignSelf:'flex-start', justifyContent:'center', paddingTop:10, paddingLeft:10,},
  headingText: {fontSize:30, fontWeight:"700",color:'#333'},
  subHeading: {fontSize:15, fontWeight:"500",color:'#2c69bc'},
  topProfileBox: {justifyContent: 'center', alignItems:'center', padding: 10, paddingTop:0, flexDirection:'row' },
  topProfileInfo: {width:'75%',paddingTop:25},
  profilePhoto: {width:'25%',borderWidth:1,borderColor:'#2c69bc',borderRadius:50,overflow:'hidden',padding: 2,backgroundColor:'#fff'},
})
 
 export default HeaderComponent;