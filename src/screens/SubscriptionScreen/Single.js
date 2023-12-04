/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState,useEffect,useContext } from 'react';
 import { Image,StyleSheet, Text, View, Pressable,ScrollView, TouchableOpacity, TextInput} from 'react-native';
 import CheckBox from '@react-native-community/checkbox';
 import  Mainstyles from '../../assets/style';
 import HeaderComponent from '../../components/CommonScreen/Header'
 import DateTimePickerModal from "react-native-modal-datetime-picker";
 import RadioButton from '../../components/RadioButton/FrequencyRadioButton';
 import LinearGradient from 'react-native-linear-gradient';
 import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../components/navigation/StackNavigator';
import HTMLView from 'react-native-htmlview';
import { ProgressDialog } from 'react-native-simple-dialogs';

const paymentOptions = [
  {
    key: 1,
    text: 'Daily',
    label: '( 30 Bottles / Month )',
  },
  {
    key: 2,
    text: 'Alternative Day',
    label: '( 15 Bottles / Month )',
  },
];

 const SubscriptionSingle = ({route,navigation}) => {   
  const {authContext, loginState, dispatch} = useContext(AuthContext);
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [selectedFrequency, setSelectedFrequency] = useState({key: 1});
  const [minus,setMinus] = useState(false);
  const [isProgress,setIsProgress] = useState(false);
  const [auth,setAuth] = useState(loginState.token ? loginState.token : null);
  const [data,setData] = useState({
    quantity : 1,
    frequency : 1,
    jar : 2,
  });
  const plan = route.params.plan;

  const checkoutHandle= async(plan,data) => {
    if(auth && auth != null){
      setIsProgress(true);
      let address_data = await authContext.fetchUserAddress();
      if(address_data && address_data.length > 0){
        setIsProgress(false);
        navigation.navigate('SCheckout',{plan,data})
      }else{
        navigation.navigate('NewAddress', {isCheckout: 2,plan:plan,data:data});
      }
    }else{
      navigation.navigate('LoginScreen');
    }
  }

  const checkJar = (isJar)=>{
    setToggleCheckBox(isJar);
    setData({
      ...data,
      jar: isJar ? 1 : 2
    })
  }

  const quantityChange = async(type)=>{
    if (type === 1 && data.quantity > 1) {
      setMinus(false);
      setData({
        ...data,
        quantity : (data.quantity - 1),
      })
      if (data.quantity-1 === 1) {        
        setMinus(true);
      }
    } else if(type === 2){
      setMinus(false);
      setData({
        ...data,
        quantity : (data.quantity + 1),
      })
    }
  }

  const onSelect = (item) => {
    setSelectedFrequency(item);
    setData({...data,frequency:item.key});
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);



  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  
  return (
    <View>
      {/* Header */}
      <HeaderComponent  navigation={navigation} auth={auth}/>
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'#eee',height:'83.8%'}}>
      <ProgressDialog
         visible={isProgress}
         titleStyle={{color:'#2c69bc',fontWeight:'700',marginBottom:-5}}
         messageStyle={{color:'#333'}}
         dialogStyle={{borderRadius:10}}
         title="We Are Processing Your Request"
         message="Please, wait..."
       />
        {/* Divider */}
        <View style={Mainstyles.divider}></View>
        
        {/* Product */}      
        <View style={styles.productSection}>
          <View style={styles.productBlock}>
            <View style={styles.productCompanyBlock}><Text style={[styles.productCompany, {backgroundColor:'#C99738',}]}>{plan.plan_name}</Text></View>
            <Text style={[styles.productName, {color:'#C99738',}]}>{plan.brand_name}</Text>
            <Text style={styles.productQuantity}>Duration {plan.duration} Days</Text>
            <Text style={styles.productPrice}><Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#aaa' }}>₹{plan.mrp}</Text> ₹{plan.price} <Text style={{color:'#aaa',fontWeight:'500'}}>/ Bottle</Text></Text>
            
            <Text style={{ fontSize:10, color: '#777' }}>(incl. of all taxes)</Text>  

            {/* <Text style={styles.productFeatureItem}>{plan.description}</Text> */}
            <HTMLView
                value={plan.description}
                // stylesheet={styles}
              />
          </View>   
        </View>

        {/* Divider */}
        <View style={Mainstyles.divider}></View>


        <View style={styles.productBlockInfo}>
          <View style={{flexDirection:'column',}}>
            <Text style={{ fontSize: 10, marginBottom: 5, color: '#333', fontWeight:'700'}}>SELECT QUANTITY</Text>
            {/* Quantity */}
            <View style={styles.qtyInner}>
              <TouchableOpacity style={styles.qtyIcon} onPress={() => quantityChange(1)} disabled={minus}>
                <Icon name="minus"  style={{fontSize:15,alignSelf:'center',paddingVertical:5,color:'#fff'}} />
              </TouchableOpacity>
              <TextInput
                  style={styles.inputText}
                  maxLength={2}
                  disable={true}
                  value={`${data.quantity}`}
                  keyboardType={'numeric'}
                  editable={false}
              />
              <TouchableOpacity style={styles.qtyIcon} onPress={() => quantityChange(2)}>
                <Icon name="plus" style={{fontSize:15,alignSelf:'center',paddingVertical:5,color:'#fff'}} / >
              </TouchableOpacity>
            </View>

            {/* Frequency */}
            <View style={{alignItems:'flex-start',marginTop:15}}>
              <Text style={{ fontSize: 10, marginBottom: 5, marginTop: 0, color: '#333', fontWeight:'700'}}>DELIVERY FREQUENCY</Text>
              <RadioButton
                selectedOption={selectedFrequency}
                onSelect={onSelect}
                options={paymentOptions}
              />
            </View>             
          </View>

          <View>
            <Text style={{ fontSize: 10, marginBottom: 0, marginTop: 5, color: '#333', fontWeight:'700'}}>ADD ON</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => checkJar(newValue)}
                style={{fontSize:20}}
              />
              <View style={{flexDirection:'column',paddingLeft:10}}>
                <Text>Do you want empty Bottle along with it ?</Text>
                <Text style={[styles.productPrice, {fontSize:15,}]}><Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#aaa' }}>₹{plan.jar_mrp}</Text> ₹{plan.jar_price} <Text style={{color:'#aaa',fontWeight:'500'}}>/ Quantity</Text></Text>
              </View>
            </View>
          </View>
        </View>  

        {/* Divider */}
        <View style={Mainstyles.divider}></View>
        
        {/* Cart Value */}
        <View style={styles.cartValueBlock}>
          <Text style={styles.cartValueHeaderText}>Price Detail</Text>
          <View style={styles.cartValuePriceBlock}>
            <View style={[styles.cartValueInnerBlock, {alignItems:'center'}]}>
              <Text>
                Item Value <Text style={{ fontSize:12, color: '#333' }}>( {data.frequency == 1 ? plan.duration : (plan.duration/2)} Bottle x ₹{plan.mrp} x {data.quantity} quantity)</Text>  {'\n'}
                <Text style={{ fontSize:10, color: '#777' }}>(incl. of all taxes)</Text>  
              </Text>
              <Text>₹ {((data.frequency == 1 ? plan.duration : (plan.duration/2)) * plan.mrp) * data.quantity}</Text>
            </View>
            <View style={styles.cartValueInnerBlock}>
              <Text>Discount</Text>
              <Text style={{color:'green'}}>- ₹ {(((data.frequency == 1 ? plan.duration : (plan.duration/2)) * plan.mrp) * data.quantity)-(((data.frequency == 1 ? plan.duration : (plan.duration/2)) * plan.price) * data.quantity)}</Text>
            </View>
            {toggleCheckBox && (
              <View style={styles.cartValueInnerBlock}>
                <Text>Jar Price</Text>
                <Text style={{color:'#333'}}>+₹ {plan.jar_price*data.quantity}</Text>
              </View>
            )}
            <View style={[styles.cartValueInnerBlock, {paddingBottom:0, }]}>
              <Text>Delivery Charges</Text>
              <Text style={{color:'green'}}>Free</Text>
            </View>
          </View>
          <View style={styles.cartValueTotalBlock}>
            <Text style={styles.cartValueTotalBlockText}>Total Amount</Text>
            <Text style={styles.cartValueTotalBlockText}>₹ {(((data.frequency == 1 ? plan.duration : (plan.duration/2)) * plan.price) * data.quantity)+(toggleCheckBox?(plan.jar_price*data.quantity):0)}</Text>
          </View>
        </View>
          
        {/* Divider */}
        <View style={Mainstyles.divider}></View>
        
      </ScrollView>

      {/* Button */}
      <View style={styles.fixedButtonBlock}>
        <View style={styles.fixedButton1}>
          <Text style={styles.fixedButton1Text}>₹ {(((data.frequency == 1 ? plan.duration : (plan.duration/2)) * plan.price) * data.quantity)+(toggleCheckBox?(plan.jar_price*data.quantity):0)}</Text>
          <Text style={styles.fixedButton1TextOther}>Total Amount</Text>
        </View>
        <TouchableOpacity style={styles.fixedButton2} onPress={() =>checkoutHandle(plan,data)}>
          <Text style={styles.fixedButton2Text}>Proceed To Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};
const styles = StyleSheet.create({
  header: { justifyContent: 'center', alignItems:'center', paddingLeft: 10, paddingRight:10, paddingBottom:10, backgroundColor:'#fff', shadowColor: "#000", shadowOffset: {width: 0, height: 4,}, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 10,},
  menuIcon: {fontSize:40,color:'#777',alignSelf:'flex-start', justifyContent:'center', paddingTop:10,},
  
  headingText: {fontSize:12, fontWeight:"700",color:'#333'},
  headerRow : {flexDirection: 'row',justifyContent:'space-between',width:'100%'},
  navLogo: {width:100,height:50,resizeMode:'cover',marginRight:120},
  navIcon: {width:30,height:30,resizeMode:'contain',alignSelf:'flex-end'},
  navUser: {width:40,height:40,resizeMode:'cover',alignSelf:'flex-end',borderWidth:1,borderRadius:50,borderColor:'#bbb',marginTop:10},
  productSection: {marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,overflow:'hidden'},
  productBlock: {flexDirection:'column',padding: 10,backgroundColor:'#fff',},
  productCompanyBlock: {display:'flex',flexWrap:'wrap',marginBottom:10},
  productCompany: {fontSize:14,color:'#fff',paddingLeft:10,paddingRight:10, paddingBottom:1,borderRadius:15},
  productName: {fontSize: 22,color:'#333',fontWeight:'700',},
  productQuantity: {fontSize: 13,color:'green',marginBottom:5},
  productPrice: {fontSize: 25,color:'#2c69bc', textAlign:'left',fontWeight:'700'},
  productBlockInfo:{padding: 10,backgroundColor:'#fff', marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,},
  productFeatureItem:{fontSize:12,color:'#777', textAlign:'justify',marginTop:5},
  
  dateSelectionBlock: {width:'95%', height:'50%',position:'absolute',bottom:0,zIndex:99, backgroundColor:"#fff",alignSelf:'center',paddingLeft:10,paddingRight:10,borderTopStartRadius:30,borderTopEndRadius:30,borderWidth:1,borderColor:'#bbb',borderBottomWidth:0},
  headIconBlock: {flexDirection:'row', flexWrap:'wrap',alignSelf:'flex-end'},
  headIcon: {fontSize:20, color:'#777', marginRight:-10, marginTop:-10,backgroundColor:'#ddd',padding:10,borderRadius:5,overflow:'hidden'},

  dateBlock: { fontSize: 13, marginBottom: 15, color: '#777', backgroundColor: '#eee', padding: 7, borderWidth: 1, borderColor: '#bbb', borderRadius: 5,width:'69%',marginRight:'1%'},  
  
  qtyInner: {flexDirection:'row',justifyContent:'flex-start',borderWidth:1,borderColor:'#eee',borderRadius:5,overflow:'hidden',width:'46.2%'},
  qtyIcon: {width:35,height:27,backgroundColor:'#2c69bc',},
  inputText:{backgroundColor:'#fff',height:27,padding: 0,textAlign:'center',width:80,color:'#333'},
  
  datePickerContainer: {borderWidth:1,borderColor:'#ddd',marginTop:10,marginBottom:10,borderRadius:15,overflow:'hidden'},
  
  orderButton: {padding: 5,paddingHorizontal: 50,backgroundColor:'#2c69bc',width:'70%',color:'#fff',borderRadius:25,alignSelf:'center',marginTop:20},
  orderButtonText: {textAlign:'center',color:'#fff'},

  checkboxContainer: {flexDirection:'row'},
  label: {paddingTop:5},

  cartValueBlock: {backgroundColor:'#fff', marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,},
  cartValueHeaderText: {fontWeight:'700',borderBottomWidth:1,borderColor:'#eee',padding:10,color:'#333'},
  cartValuePriceBlock: {padding:10,},
  cartValueInnerBlock: {flexDirection:'row',justifyContent:'space-between',paddingBottom:5},
  cartValueTotalBlock: {flexDirection:'row',justifyContent:'space-between',paddingTop:5,borderTopWidth:1,borderColor:'#eee',borderStyle:'dashed',padding:10,borderRadius: 5},
  cartValueTotalBlockText: {fontWeight:'700'},
  points: {flexDirection:'row',alignItems:'center',paddingHorizontal:5,paddingVertical:3,borderRadius:10,marginTop:3,width:150},

  
  fixedButtonBlock: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', shadowColor: "#000", shadowOffset: { width: 0, height: 0, }, shadowOpacity: 0.90, shadowRadius: 4.65, elevation: 500, alignSelf: 'center', justifyContent: 'center' },
  fixedButton1: { padding: 15, width: '50%', justifyContent: 'center', backgroundColor: '#eee' },
  fixedButton1Text: { textAlign: 'center', color: '#333', fontWeight: '700', marginTop: -8 },
  fixedButton1TextOther: { textAlign: 'center', color: '#2c69bc', fontSize: 12, fontWeight: '700' },
  fixedButton2: { padding: 15, backgroundColor: '#2c69bc', width: '50%', justifyContent: 'center', color: '#fff' },
  fixedButton2Text: { textAlign: 'center', color: '#fff',marginTop:-10},
})

export default SubscriptionSingle;
