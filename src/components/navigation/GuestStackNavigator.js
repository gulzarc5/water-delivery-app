import React from 'react';
import LoginScreen from '../../screens/LoginScreen';
import LoginOTP from '../../screens/LoginScreen/otp';
import RegisterScreen from '../../screens/RegisterScreen';
import RegisterOTP from '../../screens/RegisterScreen/otp';
import HomeScreen from '../../screens/HomeScreen';
import MenuScreen from '../../screens/MenuScreen';
import ProductScreen from '../../screens/ProductScreen';
import ProductSingleScreen from '../../screens/ProductScreen/Single';
import Subscription from '../../screens/SubscriptionScreen';
import SubscriptionSingle from '../../screens/SubscriptionScreen/Single';
import LocationScreen from '../../screens/LoginScreen/Location';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from '../../screens/ProductScreen/ProductList';
import ProfileScreen from '../../screens/ProfileScreen/';
import Notification from '../../screens/Notification';
import AboutScreen from '../../screens/AddtionalPage/About';
import DisclamerScreen from '../../screens/AddtionalPage/Disclamer';
import TermsConditionScreen from '../../screens/AddtionalPage/TermsCondition';
import RefundScreen from '../../screens/AddtionalPage/Refund';
import PrivacyScreen from '../../screens/AddtionalPage/Privacy';
import ContactScreen from '../../screens/AddtionalPage/Contact';
import BulkScreen from '../../screens/BulkScreen/';

const GuestStackNavigator = () => {
    const GuestStack = createStackNavigator();
    return (
        <GuestStack.Navigator initialRouteName="HomeScreen" headerMode='none'>
            <GuestStack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Pyaas' }} />
            <GuestStack.Screen name="MenuScreen" component={MenuScreen} options={{ title: 'Pyaas' }} />
            <GuestStack.Screen name="ProductScreen" component={ProductScreen} options={{ title: 'Product List' }} />
            <GuestStack.Screen name="ProductList" component={ProductList} options={{ title: 'Product List' }} />
            <GuestStack.Screen name="ProductSingleScreen" component={ProductSingleScreen} options={{ title: 'Product Detail' }} />
            <GuestStack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
            <GuestStack.Screen name="LoginScreen" component={LoginScreen} />
            <GuestStack.Screen name="LoginOTP" component={LoginOTP} />
            <GuestStack.Screen name="RegisterScreen" component={RegisterScreen} />
            <GuestStack.Screen name="RegisterOTP" component={RegisterOTP} />
            {/* New */}
            <GuestStack.Screen name="Subscription" component={Subscription} />
            <GuestStack.Screen name="SubscriptionSingle" component={SubscriptionSingle} />
            <GuestStack.Screen name="LocationScreen" component={LocationScreen} />
            <GuestStack.Screen name="Notification" component={Notification} />
            <GuestStack.Screen name="AboutScreen" component={AboutScreen} />
            <GuestStack.Screen name="DisclamerScreen" component={DisclamerScreen} />
            <GuestStack.Screen name="TermsConditionScreen" component={TermsConditionScreen} />
            <GuestStack.Screen name="PrivacyScreen" component={PrivacyScreen} />
            <GuestStack.Screen name="ContactScreen" component={ContactScreen} />
            <GuestStack.Screen name="BulkScreen" component={BulkScreen} />
        </GuestStack.Navigator>
    )
}

export default GuestStackNavigator
