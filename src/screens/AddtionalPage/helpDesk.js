
 import React, { useState } from 'react';
 import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
 import  Mainstyles from '../../assets/style';
 import HeaderComponent from '../../components/CommonScreen/NoTitleHeader';
 import FixedNavbar from '../../components/CommonScreen/FixedNavbar';
 import AntDesign from 'react-native-vector-icons/AntDesign';

 const options = [
  {
    key: 1,
    text: 'HOW DO I REACH THE CUSTOMER SUPPORT/HELP DESK?',
    label: 'YOU CAN ALWAYS REACH OUR CUSTOMER SUPPORT/ HELPDESK @ +91 60037 37738 that is available 24/7.',
  },
  {
    key: 2,
    text: 'WHAT SHOULD I DO IF MY ORDER IS GETTING DELAYED?',
    label: 'We never would want that you face a situation like this. But in case you do you can always call our customer support/helpdesk to get the things sorted out.',
  },
  {
    key: 3,
    text: 'WHERE CAN I MAKE A COMPLAINT REGARDING THE SERVICES?',
    label: 'We really care for our customers and we strive harder to not have any complaint from your end but in case you have any complaint you can call our customer support/helpdesk or write to as @webinfotech014@gmail.com .',
  },
  {
    key: 4,
    text: 'CAN I GIVE SUGGESTIONS FOR SERVICE IMPROVEMENT?',
    label: 'We would love to hear from you and acknowledge your feedback. You can write your suggestions for service improvement @ webinfotech014@gmail.com.',
  },
];
 
 const AboutScreen = ({navigation}) => {  
  const [selectedOption, SetSelectedOption] = useState({key: 1});
  const onSelect = (item) => {
    SetSelectedOption(item);
  };

  return (
    <View>
      {/* Header */}
      <HeaderComponent  navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false} style={{height:'100%'}}>

        {/* Divider */}
        <View style={Mainstyles.divider}></View>
        
        {/* Notification */}      
        <View style={styles.cartSection}>
          <View style={styles.cartBlock}>

            {/* About */}
            <View style={styles.cartItem}>               
              <Text style={styles.head}>HELP DESK</Text>
              {options.map((item) => {
                return (
                  <View key={item.key} style={styles.buttonContainer}>     
                    <TouchableOpacity
                      style={styles.questionBlock}
                      onPress={() => {
                          onSelect(item);
                    }}>
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.sectioHeader}>{item.text}</Text>
                        <AntDesign name="down" style={styles.menuIcon}/>
                      </View>
                      {selectedOption && selectedOption.key === item.key && (
                        <View><Text style={styles.sectioPara}>{item.label}</Text></View>
                      )}
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>          

            {/* Divider */}
            <View style={Mainstyles.divider}></View>

          </View>
          
        </View>
      </ScrollView>

      {/* Fixed Navbar */}
      <FixedNavbar navigation={navigation} style={styles.FixedNavbar} />

    </View>

  );
};
const styles = StyleSheet.create({
  header: { justifyContent: 'center', alignItems:'center', paddingLeft: 10, paddingRight:10, paddingBottom:10, backgroundColor:'#fff', shadowColor: "#000", shadowOffset: {width: 0, height: 4,}, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 10,},
  
  headerText: {fontSize:30, fontWeight:"700",color:'#fff'},
  headerRow : {flexDirection: 'row',justifyContent:'space-between',width:'100%'},

  cartSection: {backgroundColor:'#eee', shadowColor: "#000", shadowOffset: {width: 0, height: 4,}, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 8},
  cartBlock: {flexDirection:'row',flexWrap:'wrap',borderRadius:5,paddingHorizontal:5},
  cartItem: {flexDirection:'column',width:"100%",backgroundColor:'#fff',padding:10, borderWidth: 1, borderColor: '#ddd', borderRadius:10,},
  cartPointText: {fontSize:8,color:'green',fontWeight:'700',marginBottom:-3},
  head: {fontSize: 18,color:'#333',fontWeight:'700',marginBottom:8},
  para: {fontSize: 11,fontWeight:"500",color:'#000', textAlign:'justify',marginBottom:5},
  
  cartItemBtnBlock: {marginVertical:5, flexDirection:'row',alignItems:'center'},
  statusHeader: {fontSize:12,color:'#333',fontWeight:'700'},
  statusBtn: {fontSize:12,paddingHorizontal:10,fontWeight:'700'},

  questionBlock: {marginBottom:10,paddingBottom:10},
  sectioHeader: {fontSize:16,fontWeight:'700',color:'#2c69bc',marginBottom:5,width:'97%'},
  menuIcon: {fontSize:18,color:'#2c69bc',position:'absolute',top:10,right:-10},
  sectioPara: {fontSize:14,color:'#333'},

})

export default AboutScreen;
