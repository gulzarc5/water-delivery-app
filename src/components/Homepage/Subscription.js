
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView,StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from '../UI/CustomText';

const SubscriptionComponent = ({ subscriptions }) => {
  const navigation = useNavigation();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.productBrandList}
    >
      {subscriptions && subscriptions.length === 0 ? (
        <CustomText style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          No Membership Found!
        </CustomText>
      ) : (
        subscriptions && subscriptions.map(subscription => {
          return (
            <TouchableOpacity key={subscription.id} style={[styles.productBrandItem, { borderColor: '#C99738' }]} activeOpacity={.9} onPress={() => navigation.navigate('Subscription',{ subscription: subscription.plan_list,planName:subscription.plan_name })}>
              <View style={styles.BrandNameBlock}>
                <Text style={[styles.BrandName, { color: '#C99738' }]}>{subscription.plan_name}</Text>
                <Text style={styles.BrandNameSpam}>Membership</Text>
              </View>
              <View style={styles.PriceBlock}>
                <Text style={styles.PriceText}>Duration</Text>
                <View style={{flexDirection:'row',alignItems:'flex-end'}}>
                  <Text style={styles.Price}>{subscription.duration}</Text>
                  <Text style={[styles.Price, {color:'#777',fontSize:17,paddingLeft:3,transform: [{ translateY: -5 }] }]}>Days</Text>
                </View>
              </View>
              <View style={[styles.subscriptionBtn, { backgroundColor: '#C99738' }]}><Text style={styles.subscriptionBtnText}>View Brands</Text></View>
            </TouchableOpacity>
          )
        })
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  productBrandList: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, paddingLeft: 10, paddingRight: 100 },
  productBrandItem: { width: 150, marginBottom: 20, borderWidth: 2, borderRadius: 10, marginRight: 13, backgroundColor: '#eee', overflow: 'hidden', padding: 10,alignItems:'center' },
  // productBrandItem: {width:'33.3%',marginBottom:20},
  BrandImage: { width: 150, height: 150, resizeMode: 'cover', alignSelf: 'center', marginBottom: 5 },
  BrandNameBlock: { flexDirection: 'column', borderBottomWidth: 1, borderColor: '#fff', paddingBottom: 3, width: '100%',alignItems:'center' },
  BrandName: { fontSize: 18, color: '#333', fontWeight: '700', flexDirection: 'column', marginBottom: -5 },
  BrandNameSpam: { fontSize: 14, color: '#333', fontWeight: '500' },

  PriceBlock: { flexDirection: 'column', borderBottomWidth: 1, borderColor: '#fff', marginBottom: 5, paddingTop: 3, width: '100%',alignItems:'center'  },
  PriceText: { fontSize: 10, marginBottom: -7 },
  Price: { fontSize: 30, fontWeight: '700', color: '#2c69bc', marginBottom: -1 },

  subscriptionBtn: { alignSelf: 'center', borderRadius: 10 },
  subscriptionBtnText: { alignSelf: 'center', color: '#fff', padding: 7, paddingTop: 0, paddingBottom: 2, fontSize: 10 },
})


export default SubscriptionComponent;