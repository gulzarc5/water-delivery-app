/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState } from 'react';
 import { useNavigation } from '@react-navigation/native';
 import { ImageBackground, TextInput, AppRegistry, StyleSheet, Text, View, TouchableHighlight, Image, Button, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
//  import styles from './style';
 import  Mainstyles from '../../assets/style/main';
  
  const {width} = Dimensions.get("window");
  const height = 200;
  const images = [
    'https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://lh3.googleusercontent.com/proxy/Tco0Ki0f0BvhLE-A1oGnGp7UrogEHUgP_v2qCtuO8V5oAU4WDUmwIEVxnwx83dCmGyqnCCUsa_78kouocThef5E_8-BQlkqegMyySbutxbpFghvF5l7Fy10mrKVJKSwLM6HKzCozv6t3NJsceNb0TCdE',
    'https://hdfreewallpaper.net/wp-content/uploads/2020/08/City-Wallpaper-For-PC.jpg'
  ]

 const HomeScreen = ({navigation}) => {    
   
   state = {
     active : 0
   }

  //  change = ({nativeEvent}) => {
  //   const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurment.width);
  //   if(slide !== this.state.active){
  //     this.setState({active: slide})
  //   }
  //  }

    return (
      <View>
        <ScrollView 
          pagingEnabled 
          horizontal
          // onScroll={this.change} 
          showsHorizontalScrollIndicator={false}
          style={{width, height}}
        >
          {
            images.map((images, index) =>(
              <Image 
                key= {index}
                source={{uri: images}}
                style={{width, height, resizeMode:'cover'}}
              />                
            ))
          }
        </ScrollView>
        <View style={styles.pagination}>
          {
            images.map((i,k) => (                  
              <Text key={k} style={k==this.state.active ? styles.paginationActiveText : styles.paginationText}>•</Text>
            ))
          }
        </View>

      </View>

    );
}
const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems:'center',
    padding: 10,
    backgroundColor:'#aaa',
  },
  pagination: {flexDirection:'row',position:'absolute',bottom:-20,alignSelf:'center',},
  paginationText: {color:'#888',fontSize:50,},
  paginationActiveText: {color:'#fff',fontSize:50},
})

export default HomeScreen;
