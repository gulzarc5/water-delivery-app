
 import React from 'react';
 import { useNavigation} from '@react-navigation/native';
 import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const NoDataFound = () => {   
  const navigation = useNavigation();
   return (   
    <View style={styles.noCarBlock}>
      <View style={styles.noCarInner}>
        <Image 
          source={require('../../assets/img/no-data-found.jpg')}
          style={{width:350,height:350,resizeMode:'contain',}} 
        />
      </View>
      <TouchableOpacity style={styles.noCartButton} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.noCartText}>GO TO HOME</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  noCarBlock:{marginTop:'5%',justifyContent: 'center', alignItems: 'center',flexDirection:'column'  },
  noCarInner:{shadowColor: "#000", shadowOffset: {width: 0, height: 4,}, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 8,backgroundColor:'#f7f7f7',borderRadius:30,alignItems: 'center'},
  noCartButton: {padding: 10,backgroundColor:'#2c69bc',width:'50%',justifyContent:'center',marginTop:25},
  noCartText: {textAlign:'center',color:'#fff',},
})
 
 export default NoDataFound;
