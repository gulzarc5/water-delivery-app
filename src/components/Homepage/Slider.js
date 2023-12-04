
import React from 'react';
import { View, Image, ScrollView, Dimensions, StyleSheet } from 'react-native';
import CustomText from '../UI/CustomText';
import { SliderBox } from "react-native-image-slider-box";

const { width } = Dimensions.get("window");
const height = 150;


const SliderComponent = ({ sliders }) => {
  console.log(sliders);
  const sliderImage = [];
   sliders && sliders.map(image => {
     sliderImage.push(image.image);
   });
  const state = {
    active: 0
  }
  // const change = ({ nativeEvent }) => {
  //   const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurment.width);
  //   if (slide !== this.state.active) {
  //     this.setState()
  //   }
  // }
  return (
    <View style={sliderstyles.container}>      
      {sliders && sliders.length === 0 ? (
        <CustomText style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          No Slider Found!
        </CustomText>
      ) : (
        <SliderBox
          // key={ image.id }
          sliderBoxHeight={180}
          resizeMode={'contain'}                                        
          images={sliderImage}
          //  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
          disableOnPress={'false'}
          autoplay={true}
          circleLoop
          // currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
        />
      )}
    </View>
  );
}

const sliderstyles = StyleSheet.create({
  container: { paddingTop: 3, shadowColor: "#000", shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 8, },
  sliderImage: { width: 300, height: '100%', resizeMode: 'cover', marginRight: 5 },
  'sliderImage:last-child': { paddingRight: 10 }
})

export default SliderComponent;