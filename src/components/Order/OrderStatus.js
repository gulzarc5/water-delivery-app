import React from 'react';
import { Text,StyleSheet } from 'react-native';


export default function OrderStatus(props){
    

    if(props.status == 1){
        return <Text style={[styles.statusBtn, {color:'#c2b20a',}]}>New</Text>;
    }else if(props.status == 2){
        return <Text style={[styles.statusBtn, {color:'#008CBA',}]}>Accepted</Text>;
    }else if(props.status == 3){
         return <Text style={[styles.statusBtn, {color:'#2c69bc',}]}>Out For Delivery</Text>;
    }else if(props.status == 4){
         return <Text style={[styles.statusBtn, {color:'#4CAF50',}]}>Delivered</Text>;
    }else if(props.status == 5){
         return <Text style={[styles.statusBtn, {color:'red',}]}>Cancelled</Text>;
    }else{
        return <Text style={[styles.statusBtn, {color:'#2c69bc',}]}></Text>;
    }
}

const styles = StyleSheet.create({
    statusBtn: {fontSize:12,paddingHorizontal:10,fontWeight:'700'},
  })