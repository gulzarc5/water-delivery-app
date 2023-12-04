
import React, { useContext, useEffect, useState } from 'react';
import {View,ActivityIndicator, StyleSheet} from 'react-native';
import { AuthContext } from '../navigation/StackNavigator';

const LoaderComponent = ({navigation}) => {   
  const {authContext, loginState, dispatch} = useContext(AuthContext);
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(loginState.user);
  },[]);
   return (
    <View style={styles.loaderContainer}>      
      <ActivityIndicator size="large" color="#0000ff" style={styles.iconBlock}/>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {flex:1,justifyContent:'center',alignItems:'center',position:'absolute',bottom:0,width:'100%',height:'100%'},
  iconBlock: {padding:10,backgroundColor:'#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.9, shadowRadius: 50, elevation: 20,borderRadius:10},
})
 
 export default LoaderComponent;