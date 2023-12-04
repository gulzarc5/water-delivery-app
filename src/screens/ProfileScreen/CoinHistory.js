/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,Image,  ScrollView} from 'react-native';
import styles from '../SubscriptionScreen/style';
import  Mainstyles from '../../assets/style';
import HeaderComponent from '../../components/CommonScreen/NoTitleHeader';
import FixedNavbar from '../../components/CommonScreen/FixedNavbar';
import { ProgressDialog } from 'react-native-simple-dialogs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import NoDataFound from '../../components/NoDataFound/NoDataFound';
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 10;
  return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
};

 const CoinHistory = ({navigation}) => {  
  const [data, setData] = useState([]);
  const [coins, setCoins] = useState([]);
  const [pagination,setPagination] = useState({
    currentPage : 1,
    totalPage : 1,
  });
  const [isProgress,setIsProgress] = useState(true);
  const [progressText,setProgressText] = useState("Loading Coin History");

  const paginationCall = ()=>{
    if (pagination.totalPage != pagination.currentPage) {
      setProgressText("Loading More History");
      setIsProgress(true);
      fetchCoinHistory(1);          
    }
  }

  const fetchCoinHistory = async(status=null)=>{
    try {
      let response = [];
      let userData = await AsyncStorage.getItem('user');
      const fcmToken = await AsyncStorage.getItem('fcmToken');
      console.log("Home page",fcmToken);
      if (fcmToken && userData) {
        const modifiedUser = JSON.parse(userData);
        axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
        if (status == 1) {            
            response = await axios.get(`/user/coin/history?page=${pagination.currentPage+1}`);
        } else {
            response = await axios.get(`/user/coin/history?page=1`);            
        }
        console.log(response);
        if(response.data.status !== true) {
          setIsProgress(false);
          setIsProgressMore(false);
          alert(response.data.message);
      }
      if (response.data.status === true) {
          console.log(response.data.data);
          if (status) {
              setData([...data,...response.data.data]);                
          } else {
              setData(response.data.data);  
              setCoins(response.data.coin);
          }
          setPagination({
              currentPage: response.data.current_page,
              totalPage: response.data.total_pages,
          })
          setIsProgress(false);
      }
      }     
    } catch (error) {
      console.log(error);
      console.log("called");
    }
  }
  useEffect(() => {
    fetchCoinHistory();
  }, [])
  return (
    <View>
      {/* Header */}
      <HeaderComponent  navigation={navigation} title={'Coin History'} />
      <ScrollView showsVerticalScrollIndicator={false} style={{height:'100%'}}
         onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
                paginationCall();
            }          
          }}
          scrollEventThrottle={500}
      >
      <ProgressDialog
          visible={isProgress}
          title={progressText}
          message="Please, wait..."
      />
        {/* Divider */}
        <View style={Mainstyles.divider}></View>

        <View style={styles.container}>          
          {/* Present Plan */}        
          <View style={styles.cartItem}>
            <View style={internalstyles.cartImage}>            
              <View style={internalstyles.productBlock}>
                <Text style={[internalstyles.productName, {color:'#C99738',fontSize:35,alignItems:'center'}]}>{coins.total_coins}<Text style={internalstyles.productQuantity}>coins</Text></Text>
                <Text style={{color:'#333',fontSize:15,fontWeight:'700'}}>Total Coins earned </Text>
                
              </View>          
              <View style={internalstyles.profilePhoto}>
                <Image style={{width:50,height:50,borderRadius:50}} resizeMode="cover" source={require('../../assets/img/icon/points.png')} />
              </View>
            </View>
          </View>           

          {/* Previous Item */}        
          <Text style={styles.addressText}>Coin History</Text>
          <View style={styles.cartItem}>
            {/* Past Item */}      
            {data && data.map((history,index)=>{
              return(<View style={internalstyles.pastProductBlock} key={index}>
                <View style={{width:'85%'}}>
                  <Text style={internalstyles.pastProductName}>{history.comment}</Text>
                  <Text style={internalstyles.pastProductDate}>Date : {history.created_at}</Text>
                </View>
                <View style={{alignItems:'center',marginRight:5}}>
                  {history.type == 1 ? (
                    <Text style={{fontSize:12, fontWeight:'700',color:'red'}} >-{history.coin}</Text>
                  ):(
                    <Text style={{fontSize:12, fontWeight:'700',color:'green'}} >+{history.coin}</Text>
                  )}
                  <Text style={{fontSize:17, fontWeight:'700',marginTop:-5}} >{history.total_coin}</Text>
                </View>
              </View>)
            })} 


            {data.length == 0 && (
            <View style={internalstyles.pastProductBlock}>
            <View style={{alignItems:'center'}}>
              <Text style={{fontSize:17, fontWeight:'500',justifyContent:'center',textAlign:'center'}} >No History Found</Text>
            </View>
          </View>
            )}
          </View> 

        </View>
        {/* Divider */}
        <View style={[Mainstyles.divider, {paddingBottom:100}]}></View>

      </ScrollView>

      {/* Fixed Navbar */}
      <FixedNavbar navigation={navigation} style={styles.FixedNavbar} />
    </View>

  );
};
const internalstyles = StyleSheet.create({
  name: {fontSize:18,fontWeight:'700',color:'#333'},
  addesss: {fontSize:14,fontWeight:'500',color:'#777'},
  defaultbtn: {backgroundColor:'#48BBEC',width:'55%',alignItems:'center',paddingVertical: 10,marginVertical:8,borderRadius:3},
  addaddressbtn: {marginBottom:5,},
  defaultbtnText: {color:'#fff'},

  pointsblock: {borderWidth: 1,borderColor: '#ddd',borderRadius:10,padding: 10,width:'100%',marginBottom: 10,backgroundColor:'#fff',marginBottom:20},
  pointsText: {fontSize:15,paddingLeft:10,flexDirection:'column',color:'#fff'},

  cartSection: {backgroundColor:'#333', shadowColor: "#000", shadowOffset: {width: 0, height: 4,}, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 8},
  cartBlock: {flexDirection:'row',flexWrap:'wrap',borderRadius:5,},
  cartItem: {flexDirection:'column',width:"100%",backgroundColor:'#fff',paddingBottom:10},
  cartImage: {marginTop: 5,marginBottom:0,flexDirection:'row',justifyContent:'space-between'},
  profilePhoto: {width:65,height:65,borderWidth:1,borderColor:'#fff',backgroundColor:'#2c69bc',borderRadius:50,overflow:'hidden',alignItems:'center',paddingVertical:5, shadowColor: '#2c69bc', shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.9, shadowRadius: 50, elevation: 20,}, 
  
  productCompanyBlock: {flexWrap:'wrap',},
  productCompany: {fontSize:14,color:'#fff',paddingLeft:10,paddingRight:10, paddingBottom:0,borderRadius:15},
  productName: {fontSize: 22,color:'#333',fontWeight:'700',},
  productQuantity: {fontSize: 13,color:'green',marginBottom:5},

  pastProductBlock: {width:'100%',alignItems:'center',flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1,borderColor:'#eee',paddingVertical:10},
  pastProductName: {fontSize: 12,color:'#333',fontWeight:'500',textAlign:'justify'},
  pastProductDate: {fontSize: 9,color:'#777',fontWeight:'700',},
})

export default CoinHistory;
