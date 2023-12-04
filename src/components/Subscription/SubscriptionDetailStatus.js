
 import React from 'react';
 import { StyleSheet, Text, View} from 'react-native';


const SubscriptionDetailStatus = ({status,paymentStatus}) => {    
  let statusBtnColor = null;
  let statuStext = null;
  if (paymentStatus == 1) {
    statusBtnColor = styles.pendingBtn;
    statuStext = "Payment Pending";
  }else if (paymentStatus == 2) {
    statusBtnColor = styles.failedBtn;
    statuStext = "Payment Failed";
  }else if (status== 1) {
    statusBtnColor = styles.inActiveBtn;
    statuStext = "Inactive";
  } else if (status== 2) {
    statusBtnColor = styles.activeBtn;
    statuStext = "Active";
  } else if (status== 3) {
    statusBtnColor = styles.expiredBtn;
    statuStext = "Expired";
  }else if (status== 4) {
    statusBtnColor = styles.cancelledBtn;
    statuStext = "Cancelled";
  }
  return (    
    <View style={{position:'absolute',top:0,right:0}}>            
      <View style={[styles.statusBtn,statusBtnColor]}> 
        <Text style={styles.statusBtnText}>{statuStext}</Text>
      </View>
    </View>)
};
const styles = StyleSheet.create({
  statusBtn: { paddingVertical: 2,paddingHorizontal:5,borderRadius:5},
  statusBtnText: {color:'#fff',fontSize:11 },
  inActiveBtn: {backgroundColor:'#c2b20a',},
  activeBtn: {backgroundColor:'green',},
  expiredBtn: {backgroundColor:'#3f4545',},
  cancelledBtn: {backgroundColor:'red',},
  pendingBtn: {backgroundColor:'#c2b20a',},
  failedBtn: {backgroundColor:'red',},

})
export default SubscriptionDetailStatus;
