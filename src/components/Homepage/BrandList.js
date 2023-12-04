
import React from 'react';
import { useNavigation} from '@react-navigation/native';
import { View,Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import CustomText from '../UI/CustomText';
//  import DrawerNavigator from "../navigation/DrawerNavigator";

const BrandComponent = ({ brands }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.productBrandList}>
      { brands && brands.length === 0 ? (
        <CustomText style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          No Brand Found!
        </CustomText>
      ) : (
        brands && brands.map(brand => {
          return (
            <TouchableOpacity key={brand.id} style={styles.productBrandItem} activeOpacity={.9} onPress={() => navigation.navigate('ProductScreen', {brand})}>
              <Image
                source={{uri: brand.image}}
                style={styles.BrandImage}
              />
              <Text style={styles.BrandName}>{brand.name}</Text>
            </TouchableOpacity>
          )
        })
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  productBrandList: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  productBrandItem: { width: '33.3%', marginBottom: 20 },
  // productBrandItem: {width:'33.3%',marginBottom:20},
  BrandImage: { width: 80, height: 80, resizeMode: 'cover', borderWidth: 2, borderColor: '#2c69bc', borderRadius: 50, alignSelf: 'center', marginBottom: 5 },
  BrandName: { fontSize: 16, color: '#333', fontWeight: '500', alignSelf: 'center' },
})


export default BrandComponent;