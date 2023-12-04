
 import React from 'react';
 import { StyleSheet, Text, View, TouchableOpacity,ScrollView} from 'react-native';
 import styles from './style';

const Address = ({data,onselectAddress,selectedAddress,setModalVisible,setAddressAddModalVisible}) => {   
  const setNewModalShow = () => {
    setAddressAddModalVisible(true);

    setModalVisible(false);
  };

  return (    
    <View>   
      <ScrollView>        
      <View style={styles.container}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={styles.addressText}>Select Address</Text>
        </View>
        <View style={internalstyles.addressAll}>
          
          {/* Address 1 */}
          {data && data.map(addr => {
          return(<TouchableOpacity style={styles.addressBlock} key={addr.id} onPress={() =>onselectAddress(addr)}>
            <View style={internalstyles.outerCircle} >
              {selectedAddress.id == addr.id ? (<View style={internalstyles.checkedCircle} />) : (<View/>)}
              
            </View>
            <View style={{paddingLeft:30}}>
              <Text style={{color:'#2c69bc',fontWeight:'700',fontSize:15,marginBottom:2}}>{addr.name}</Text>
              <Text style={{fontSize:12,marginBottom:-2,color:'#777'}}>{addr.flat_no}, {addr.main_location_name} , {addr.main_location_name} - {addr.pin}</Text>
              <Text style={{fontSize:12,marginBottom:-2,color:'#777'}}>{addr.address_one}, {addr.land_mark}</Text>
              <Text style={{fontSize:12,marginBottom:-2,color:'#777'}}>{addr.mobile}</Text>
            </View>
          </TouchableOpacity>)
          })}
        </View>

        <View style={{alignSelf:'center'}}>
          <TouchableOpacity style={internalstyles.defaultbtn} onPress={setNewModalShow}>
            <Text style={internalstyles.defaultbtnText}>Add New Address</Text>
          </TouchableOpacity>
     
        </View>
      </View>
      </ScrollView>
    </View>
  );
};
const internalstyles = StyleSheet.create({
  name: {fontSize:17,fontWeight:'700',color:'#444',letterSpacing:1},
  addesss: {fontSize:14,fontWeight:'500',color:'#777',backgroundColor:'#333'},
  outerCircle:{position:'absolute',top:'50%',left:15,backgroundColor:'#f3f3f3',zIndex:2,borderRadius: 7,width: 14,height: 14,borderColor: '#ddd',borderWidth:2,},
  checkedCircle: {width: 10,height: 10,borderRadius: 7,backgroundColor: '#2c69bc',},
  addressAll: {borderBottomColor: '#eee',borderBottomWidth:1,paddingBottom:10},
  defaultbtn: {backgroundColor:'#48BBEC',width:'55%',alignItems:'center',paddingVertical: 2,paddingHorizontal:10,marginVertical:8,borderRadius:3},
  addaddressbtn: {marginBottom:5,},
  defaultbtnText: {color:'#fff'},

  centeredView: {flex: 1,justifyContent: "center",alignItems: "center",marginTop: 0,backgroundColor: "#434246a3",},
  modalView: {position:'absolute',bottom:0,width:'100%',height:'100%',backgroundColor: "white" },
  buttonClose: {backgroundColor: "#fff",position:'absolute',top:-10,right:10,paddingHorizontal:15,paddingVertical:5,borderTopStartRadius: 10,borderTopEndRadius: 10 },
  textStyle: { color: "white", fontWeight: "bold", textAlign: "center" },
  modalText: {marginBottom: 15,textAlign: "center" },
  
  header: { justifyContent: 'center', alignItems:'center', padding: 10, backgroundColor:'#2c69bc',  },
  headerText: {fontSize:20, fontWeight:"500",color:'#fff', paddingTop:11,},
  headerRow : {flexDirection: 'row',justifyContent:'flex-start',width:'100%'},
  menuIcon: {fontSize:40,color:'#fff',alignSelf:'flex-start', justifyContent:'center', paddingTop:5,},
})
export default Address;