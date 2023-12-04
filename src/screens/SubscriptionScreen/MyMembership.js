
 import React,{ useEffect,useState } from 'react';
 import { StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
 import  Mainstyles from '../../assets/style';
 import HeaderComponent from '../../components/CommonScreen/NoTitleHeader';
 import FixedNavbar from '../../components/CommonScreen/FixedNavbar';
 import SubscriptionStatus from '../../components/Subscription/SubscriptionStatus';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import {ProgressDialog } from 'react-native-simple-dialogs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import NoDataFound from '../../components/NoDataFound/NoDataFound';

 const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 10;
  return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };


 const CheckoutScreen = ({navigation}) => {  
  const [isProgress,setIsProgress] = useState(true);
  const [isProgressMore,setIsProgressMore] = useState(false);
  const [orders, setOrders] = useState([]);
  const [pagination,setPagination] = useState({
      currentPage : 1,
      totalPage : 1,
  });
  const paginationCall = ()=>{
      if (pagination.totalPage != pagination.currentPage) {
          setIsProgressMore(true);
          fetchOrders(1);          
      }
  }

  const fetchOrders= async (status=null) => {
    try{let response = [];
      const user = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.api_token}`
      if (status == 1) {            
          response = await axios.get(`user/subscription/list?page=${pagination.currentPage+1}`);
      } else {
          response = await axios.get(`user/subscription/list?page=1`);            
      }
      if(response.data.status !== true) {
          setIsProgress(false);
          setIsProgressMore(false);
          alert(response.data.message);
      }
      if (response.data.status === true) {
        console.log('Status: ', response.data.data)
          if (status) {
              setOrders([...orders,...response.data.data]);                
          } else {
              setOrders(response.data.data);  
          }
          setPagination({
              currentPage: response.data.current_page,
              totalPage: response.data.total_pages,
          })
          setIsProgress(false);
          setIsProgressMore(false);
      }
    }catch (error) {
      console.log(error);
    }
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchOrders();
      setRefreshing(false)
    }, 2000);
  }, []);

  useEffect(() => {
      fetchOrders();
  }, [navigation])
  return (
    <View>
      {/* Header */}
      <HeaderComponent  navigation={navigation} title={'My Membership'} />
      <ScrollView showsVerticalScrollIndicator={false} style={{height:'100%',backgroundColor:'#eee'}}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
              paginationCall();
          }
        }}        
        scrollEventThrottle={500}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <ProgressDialog
          visible={isProgressMore}
          titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
          messageStyle={{color:'#333'}}
          dialogStyle={{borderRadius:10}}
          title="Loading More Memberships"
          message="Please, wait..."
        />
        <ProgressDialog
          visible={isProgress}
          titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
          messageStyle={{color:'#333'}}
          dialogStyle={{borderRadius:10}}
          title="Loading Memberships"
          message="Please, wait..."
        />
        {/* Divider */}
        <View style={Mainstyles.divider}></View>

        <View style={internalstyles.cartSection}>  
          <View style={internalstyles.cartBlock}>     
          {/* Present Plan */}     
          {!isProgress && orders.length == 0 && (
            <NoDataFound/>
          )} 
          {orders && orders.map((membership,index)=>{
            return(
              <View style={internalstyles.cartItem} key={index}>
                <TouchableOpacity
                  activeOpacity={.9}
                  onPress={() =>navigation.navigate('MyMembershipDetail',{orderId:membership.id})} style={internalstyles.cartImage}
                >            
                  <View style={internalstyles.productBlock}>
                    <View style={internalstyles.productCompanyBlock}><Text style={[internalstyles.productCompany, {backgroundColor:'#C99738',}]}>{membership.plan_name}</Text></View>
                    <Text style={[internalstyles.productName, {color:'#C99738',}]}>{membership.brand} - {membership.size}</Text>
                    <Text style={internalstyles.productQuantity}>Duration {membership.plan_duration} Days</Text>
                    <Text style={{fontSize: 12,fontWeight:"700",color:'#000', alignSelf:'flex-start'}}>1st Delivered on {membership.plan_start_date} &nbsp;|&nbsp; {(membership.frequency == 1)?"Daily":"Alernative Delivery"} </Text>
                  </View> 
                  <Icon name='angle-right' style={internalstyles.arrow} />
                  <SubscriptionStatus status={membership.status} paymentStatus={membership.payment_status}/>              
                </TouchableOpacity>
              </View>
              )
            })}
            </View>
          </View>

        
        {/* Divider */}
        <View style={[Mainstyles.divider, {paddingBottom:100}]}></View>

      </ScrollView>

      {/* Fixed Navbar */}
      <FixedNavbar navigation={navigation} />
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

  cartSection: {backgroundColor:'#eee'},
  cartBlock: {flexDirection:'column',borderRadius:5,},
  cartItem: {flexDirection:'column',backgroundColor:'#fff',paddingBottom:10, marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,marginBottom:5,},
  cartImage: {marginTop: 5,marginBottom:0,flexDirection:'row',paddingLeft:10,paddingRight:10,justifyContent:'space-between'},
  arrow: {position:'absolute',top: '35%', right: 5,fontSize:30},
  
  
  productCompanyBlock: {display:'flex',flexWrap:'wrap',},
  productCompany: {fontSize:14,color:'#fff',paddingLeft:10,paddingRight:10, paddingBottom:0,borderRadius:15},
  productName: {fontSize: 22,color:'#333',fontWeight:'700',},
  productQuantity: {fontSize: 13,color:'green',marginBottom:5},

  pastProductBlock: {width:'100%',alignItems:'center',flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1,borderColor:'#eee',paddingVertical:10},
  pastProductName: {fontSize: 18,color:'#333',fontWeight:'700',},
  pastProductDate: {fontSize: 10,color:'#333',fontWeight:'700',},
})

export default CheckoutScreen;
