import React from 'react';
import CartScreen from '../../screens/Cart';
import CheckoutScreen from '../../screens/Checkout';
import Subscription from '../../screens/SubscriptionScreen';
import SubscriptionSingle from '../../screens/SubscriptionScreen/Single';
import OrderScreen from '../../screens/Order';
import OrderDetail from '../../screens/Order/detail';
import ProfileScreen from '../../screens/ProfileScreen/';
import AddressScreen from '../../screens/ProfileScreen/Address';
import NewAddress from '../../screens/ProfileScreen/NewAddress';
import EditAddressScreen from '../../screens/ProfileScreen/EditAddress';
import HomeScreen from '../../screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ProductScreen from '../../screens/ProductScreen';
import ProductSingleScreen from '../../screens/ProductScreen/Single';
// New
import MyMembership from '../../screens/SubscriptionScreen/MyMembership';
import MyMembershipDetail from '../../screens/SubscriptionScreen/MyMembershipDetail';
import CouponScreen from '../../screens/Checkout/Coupon';
import CheckoutAddressScreen from '../../screens/Checkout/Address';
import ConfirmScreen from '../../screens/Checkout/Confirm';
import SCheckout from '../../screens/SubscriptionScreen/Checkout';
import SConfirm from '../../screens/SubscriptionScreen/Confirm';
import EditProfileScreen from '../../screens/ProfileScreen/EditProfile';
import MenuScreen from '../../screens/MenuScreen';
import ProductList from '../../screens/ProductScreen/ProductList';
import LocationScreen from '../../screens/LoginScreen/Location';
import Notification from '../../screens/Notification';
import CoinHistory from '../../screens/ProfileScreen/CoinHistory';
import AboutScreen from '../../screens/AddtionalPage/About';
import DisclamerScreen from '../../screens/AddtionalPage/Disclamer';
import TermsConditionScreen from '../../screens/AddtionalPage/TermsCondition';
import RefundScreen from '../../screens/AddtionalPage/Refund';
import PrivacyScreen from '../../screens/AddtionalPage/Privacy';
import ContactScreen from '../../screens/AddtionalPage/Contact';
import BulkScreen from '../../screens/BulkScreen/';
import HelpDesk from '../../screens/AddtionalPage/helpDesk';
import Faq from '../../screens/AddtionalPage/faq';


const AuthStackNavigator = () => {
    const AuthStack = createStackNavigator();
    return (
        <AuthStack.Navigator initialRouteName="HomeScreen" headerMode='none'>
            <AuthStack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Product List' }} />
            <AuthStack.Screen name="MenuScreen" component={MenuScreen} options={{ title: 'Pyaas' }} />
            <AuthStack.Screen name="ProductScreen" component={ProductScreen} options={{ title: 'Product List' }} />
            <AuthStack.Screen name="ProductSingleScreen" component={ProductSingleScreen} options={{ title: 'Product Detail' }} />
            <AuthStack.Screen name="ProductList" component={ProductList} options={{ title: 'Product List' }} />
            <AuthStack.Screen name="CartScreen" component={CartScreen} options={{ title: 'Cart' }} />
            <AuthStack.Screen name="CheckoutScreen" component={CheckoutScreen} options={{ title: 'Checkout' }} />
            <AuthStack.Screen name="Subscription" component={Subscription} />
            <AuthStack.Screen name="SubscriptionSingle" component={SubscriptionSingle} />
            <AuthStack.Screen name="OrderScreen" component={OrderScreen} options={{ title: 'Order' }} />
            <AuthStack.Screen name="OrderDetail" component={OrderDetail} options={{ title: 'OrderDetail' }} />
            <AuthStack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
            <AuthStack.Screen name="AddressScreen" component={AddressScreen} options={{ title: 'Address' }} />
            <AuthStack.Screen name="NewAddress" component={NewAddress} options={{ title: 'NewAddress' }} />
            <AuthStack.Screen name="EditAddressScreen" component={EditAddressScreen} options={{ title: 'Edit Address' }} />
            {/* New */}
            <AuthStack.Screen name="MyMembership" component={MyMembership} options={{ title: 'MyMembership' }} />
            <AuthStack.Screen name="MyMembershipDetail" component={MyMembershipDetail} options={{ title: 'MyMembershipDetail' }} />        
            <AuthStack.Screen name="CouponScreen" component={CouponScreen} options={{ title: 'CouponScreen' }} />
            <AuthStack.Screen name="CheckoutAddressScreen" component={CheckoutAddressScreen} options={{ title: 'CheckoutAddress' }} />
            <AuthStack.Screen name="ConfirmScreen" component={ConfirmScreen} options={{ title: 'ConfirmScreen' }} />   
            <AuthStack.Screen name="SCheckout" component={SCheckout} />
            <AuthStack.Screen name="SConfirm" component={SConfirm} />     
            <AuthStack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ title: 'EditProfileScreen' }} />
            <AuthStack.Screen name="LocationScreen" component={LocationScreen} />
            <AuthStack.Screen name="Notification" component={Notification} />
            <AuthStack.Screen name="CoinHistory" component={CoinHistory} options={{ title: 'CoinHistory' }} />
            <AuthStack.Screen name="AboutScreen" component={AboutScreen} />
            <AuthStack.Screen name="DisclamerScreen" component={DisclamerScreen} />
            <AuthStack.Screen name="TermsConditionScreen" component={TermsConditionScreen} />
            <AuthStack.Screen name="RefundScreen" component={RefundScreen} />
            <AuthStack.Screen name="PrivacyScreen" component={PrivacyScreen} />
            <AuthStack.Screen name="ContactScreen" component={ContactScreen} />
            <AuthStack.Screen name="BulkScreen" component={BulkScreen} />
            <AuthStack.Screen name="HelpDesk" component={HelpDesk} />
            <AuthStack.Screen name="Faq" component={Faq} />
      </AuthStack.Navigator>
    )
}

export default AuthStackNavigator
