
import React, { useContext, useEffect, useState } from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../navigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ProgressDialog } from 'react-native-simple-dialogs';

const HeaderComponent = ({navigation}) => {   
  const {authContext, loginState, dispatch} = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [isProgress,setIsProgress] = useState(true);

  const userProfileFetch = async()=>{
    try {
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
      const response = await axios.get('/user/profile/fetch');
      
      if (response.data.status !== true) {
        setIsProgress(false);
        alert(response.data.message);
      }
      if (response.data.status == true) {
        setUser(response.data.data);
        setIsProgress(false);
      }
    } catch (error) {
      console.log(error);
      alert("Something Wrong Please Close The App And Open Again");
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      userProfileFetch();
    });
    return unsubscribe;
  },[]);

    return (
     <LinearGradient colors={['#2c69bc', '#5b86e5']} style={styles.header}>
       <View style={styles.headerRow}>
       <ProgressDialog
      visible={isProgress}
      titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
      messageStyle={{color:'#333'}}
      dialogStyle={{borderRadius:10}}
      title="Loading Profile Data"
      message="Please, wait..."
    /> 
         {/* Back Button */}
         <TouchableOpacity activeOpacity={.9} style={{width:'10%'}} onPress={() => navigation.goBack()}>
             <Icon name="angle-left" style={styles.menuIcon}/>
         </TouchableOpacity>
         <View style={styles.topProfileBox}>      
           
           <View style={styles.topProfileInfo}>
             <View style={styles.headingTextBlock}>
               <Text style={styles.headingText}>{user ? user.name : 'Guest'}</Text>
               
              <TouchableOpacity activeOpacity={.9} style={styles.editProfileBtn} onPress={() => navigation.navigate('EditProfileScreen', {user})}>
                  <Entypo name='edit' style={styles.editProfileBtnText} />
              </TouchableOpacity>
             </View>  
             <View>
              </View>  
             {
               user ? <Text style={styles.subHeading}>{user.mobile}</Text> : null
             }            
           </View>  
           {
           user ?              
           <View style={styles.profilePhoto}>
             <Image style={{width:35,height:35,borderRadius:50}} resizeMode="cover" source={require('../../assets/img/icon/points.png')} />
             <Text style={{fontSize:25,color:'#fff',fontWeight:'bold',marginTop:-2}}>{loginState.coin ?loginState.coin.total_coins : 0}</Text>
             <Text style={{fontSize:8,color:'#fff',fontWeight:'500',marginTop:-5}}>Points</Text>
           </View>
           : null
           }
         </View>
        
       </View>
       <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-between'}}>
         <TouchableOpacity style={styles.headBtn} onPress={() => navigation.navigate('CartScreen')}>
           <View style={styles.headBtnInner}>
               <Feather name='shopping-cart' style={styles.headBtnIcon} />
               <Text style={styles.headBtnText}>Cart</Text>
           </View>
         </TouchableOpacity>
         <TouchableOpacity style={styles.headBtn} onPress={() => navigation.navigate('OrderScreen')}>
           <View style={styles.headBtnInner}>
             <Entypo name='list' style={styles.headBtnIcon} />
             <Text style={styles.headBtnText}>Order History</Text>
           </View>
         </TouchableOpacity>
       </View>
     </LinearGradient>
   );
}

const styles = StyleSheet.create({
  header: {padding: 10},
  headerText: {fontSize:20, fontWeight:"500",color:'#fff', paddingTop:11,},
  headerRow : {flexDirection: 'column',justifyContent:'flex-start',width:'100%'},
  menuIcon: {fontSize:40,color:'#fff',alignSelf:'flex-start', justifyContent:'center', paddingTop:5,},
  navLogo: {width:100,height:50,resizeMode:'cover',marginRight:120},
  navIcon: {width:30,height:30,resizeMode:'contain',alignSelf:'flex-end'},
  navUser: {width:40,height:40,resizeMode:'cover',alignSelf:'flex-end',borderWidth:1,borderRadius:50,borderColor:'#fff',marginTop:10},
  headIcon: {fontSize:40,color:'#777',alignSelf:'flex-start', justifyContent:'center', paddingTop:10, paddingLeft:10,},
  headingTextBlock: {flexDirection:'row',alignItems:'center'},
  headingText: {fontSize:30, fontWeight:"700",color:'#fff'},
  subHeading: {fontSize:15, fontWeight:"500",color:'#eee'},
  topProfileBox: {justifyContent: 'center', alignItems:'center', padding: 10, paddingTop:0, flexDirection:'row' },
  topProfileInfo: {width:'75%',paddingTop:25},
  profilePhoto: {width:'25%',borderWidth:1,borderColor:'#fff',backgroundColor:'#2c69bc',borderRadius:50,overflow:'hidden',alignItems:'center',paddingVertical:5, shadowColor: '#2c69bc', shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.9, shadowRadius: 50, elevation: 20,},
  editProfileBtn:{paddingLeft:5},
  editProfileBtnText:{color:'#fff',fontSize:20},
  headBtn: {backgroundColor:'#ddd',width:'48.5%',padding: 10,borderRadius:3},
  headBtnInner: {flexDirection:'row',},
  headBtnIcon: {color:'#48BBEC',fontSize:18,marginRight:10},
  headBtnText: {color:'#48BBEC',fontSize:14,fontWeight:'700'},
})
 
 export default HeaderComponent;