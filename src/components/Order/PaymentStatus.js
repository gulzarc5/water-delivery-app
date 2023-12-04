import React from 'react';
import { Text,StyleSheet } from 'react-native';


export default function PaymentStatus(props){

    if(props.paymentType == 1){
        if (props.paymentStatus == 1) {
            return <Text style={[styles.statusBtn, {color:'#c2b20a',}]}>Pending</Text>;
        }else if (props.paymentStatus == 2) {
            return <Text style={[styles.statusBtn, {color:'#e7e7e7',}]}>Failed</Text>;
        }else if (props.paymentStatus == 3) {
            return <Text style={[styles.statusBtn, {color:'#4CAF50',}]}>Paid</Text>;
        }
        
    }else if(props.paymentType == 2){
        return <Text style={[styles.statusBtn, {color:'#008CBA',}]}>COD</Text>;
    }else if(props.paymentType == 3){
         return <Text style={[styles.statusBtn, {color:'#4CAF50',}]}>Subscription</Text>;
    }else{
        return <Text style={[styles.statusBtn, {color:'#2c69bc',}]}></Text>;
    }
}

const styles = StyleSheet.create({
    statusBtn: {fontSize:12,paddingHorizontal:10,fontWeight:'700'},
  })