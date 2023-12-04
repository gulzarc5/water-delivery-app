/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState,useEffect } from 'react';
 import {StyleSheet, Text, View,Image,ScrollView, TouchableOpacity} from 'react-native';
 import LinearGradient from 'react-native-linear-gradient';
 import  Mainstyles from '../../assets/style';
 import HeaderComponent from '../../components/CommonScreen/Header'
 import FixedNavbar from '../../components/CommonScreen/FixedNavbar'
import CustomText from '../../components/UI/CustomText';
import AsyncStorage from '@react-native-async-storage/async-storage';
  


 const SubscriptionScreen = ({route,navigation}) => {   
   const [plans,setPlans] = useState(route.params.subscription);
  const [auth,setAuth] = useState(false);
   const fetching = async() => {
    try {
      const user = await AsyncStorage.getItem('user');
      setAuth(user);
    } catch (error) {
     alert(error) ;
    }
  }
  console.log(route.params.planName);

  useEffect(() => {
    let mounted = true;
    fetching();
    return () => mounted = false;
  },[navigation])
  return (
    <View>
      {/* Header */}
      <HeaderComponent auth={auth} navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false} style={{height:'100%',backgroundColor:'#eee'}}>        


        <View style={Mainstyles.divider}></View>
        
        {/* Product */}      
        <View style={styles.productSection}>
          <Text style={styles.productHeading}>{route.params.planName}</Text>
          <View style={styles.productBlock}>
            
          {plans.length === 0 ? (
            <View style={styles.noCarBlock}>
              <View style={styles.noCarInner}>
                <Image 
                  style={{width:100,height:100,color:'#48BBEC',padding:10}} 
                  source= {require('../../assets/img/noItem.png')}
                />
              </View>
              <CustomText style={{color:'#333',fontSize:25,marginTop:10}}>
                No Plans Found
              </CustomText>
              <TouchableOpacity style={styles.noCartButton} onPress={() => navigation.navigate('HomeScreen')}>
                <Text style={styles.noCartText}>GO TO HOME</Text>
              </TouchableOpacity>
            </View>
            ) :(
              
              plans && plans.map((plan,index) => {
              return(<TouchableOpacity key={index} activeOpacity={.9} style={styles.productItem}  onPress={() =>navigation.navigate('SubscriptionSingle',{plan:plan})}>
              <View style={styles.productImage}>
                <Image 
                  source={{uri: plan.image }}
                  style={{width:50,height:50,resizeMode:'contain',alignSelf:'center'}}
                />
              </View>
              <View style={{paddingHorizontal: 8,paddingBottom:8,alignItems:'center'}}>
                <Text style={styles.productName}>{plan.brand_name}</Text>            
                <View style={styles.cartPrice}>
                  <Text style={[styles.itemFeature, {alignSelf:'center'}]}>Size: {plan.size_name}</Text>
                </View>
              </View>
              <LinearGradient colors={['#2c69bc', '#5b86e5']} style={styles.offer}>
              <Text style={styles.offerText}>{plan.discount}%</Text>
              <Text style={styles.offerText2}>OFF</Text>
            </LinearGradient>
            </TouchableOpacity>   )            
              })
            )}
            
          </View>
        </View>


        <View style={[Mainstyles.divider, {paddingBottom:60}]}></View>

      </ScrollView>
      <FixedNavbar navigation={navigation} style={styles.FixedNavbar} />
    </View>
  );
};
const styles = StyleSheet.create({
  header: { justifyContent: 'center', alignItems:'center', paddingLeft: 10, paddingRight:10, paddingBottom:10, backgroundColor:'#fff', shadowColor: "#000", shadowOffset: {width: 0, height: 4,}, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 10,},
  menuIcon: {fontSize:40,color:'#777',alignSelf:'flex-start', justifyContent:'center', paddingTop:10,},
  
  headerText: {fontSize:30, fontWeight:"700",color:'#fff'},
  headerRow : {flexDirection: 'row',justifyContent:'space-between',width:'100%'},
  navLogo: {width:100,height:50,resizeMode:'cover',marginRight:120},
  navIcon: {width:30,height:30,resizeMode:'contain',alignSelf:'center',alignSelf:'flex-end'},
  navUser: {width:40,height:40,resizeMode:'cover',alignSelf:'flex-end',borderWidth:1,borderRadius:50,borderColor:'#bbb',marginTop:10},
  productSection: {backgroundColor:'#eee',marginBottom:50},
  productHeading: {fontSize:16,color:'#333',padding: 10,alignSelf:'flex-start',fontWeight:'700',textTransform:'uppercase', width:'100%',paddingBottom:0},
  productBlock: {flexDirection:'row',flexWrap:'wrap',borderRadius:5, borderColor:'#eee',overflow:'hidden',backgroundColor:'#eee',justifyContent:'space-between',margin:10},
  productItem: {flexDirection:'column',width:"49%",backgroundColor:'#fff', borderWidth:1, borderColor:'#aaa',marginBottom:7,borderRadius:5,overflow:'hidden'},
  productImage: {margin: 10,},
  productName: {fontSize: 15,color:'#333',fontWeight:'700'},
  productPrice: {fontSize: 14,color:'#333', textAlign:'left'},
  cartPrice: {textAlign:'left',flexDirection:'column'},
  itemPrice: {fontSize:22,fontWeight:'700',color:'#777'},
  itemFeature: {color:'#777',fontSize:10,fontWeight:'700'},
  bestPlanTag: {position:'absolute',top:0,right:0,padding: 5,borderBottomLeftRadius:10},
  offer: {position:'absolute',top:-3, right:3,paddingHorizontal:5,paddingVertical:5,borderBottomLeftRadius:8,borderBottomRightRadius:8},
  offerText: {fontSize: 12,color:'#fff',fontWeight:'700'},
  offerText2: {fontSize: 8,color:'#fff',textAlign:'center'},
  noCarBlock:{marginTop:'35%',justifyContent: 'center', alignItems: 'center',flexDirection:'column',width: '100%'  },
  // noCarInner:{shadowColor: "#000", shadowOffset: {width: 0, height: 4,}, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 8,backgroundColor:'#fff',borderRadius:30,width:90},
  noCartButton: {padding: 10,backgroundColor:'#2c69bc',width:'50%',justifyContent:'center',marginTop:15},
  noCartText: {textAlign:'center',color:'#fff',},
})

export default SubscriptionScreen;
