import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icons from '../assets';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {loadCart} from '../redux/cartSlice';
import {Text, View, ActivityIndicator} from 'react-native';
import {loadUserName} from '../redux/userSlice';
import WelcomeScreen from '../screens/WelcomeScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="HomeScreen">
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="ProductDetail" component={ProductDetailsScreen} />
    </HomeStack.Navigator>
  );
};

const TabNavigaton = () => {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const userName = useSelector(state => state.user.userName);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loadData = async () => {
      await dispatch(loadCart());
      await dispatch(loadUserName());
      setLoading(false); 
    };
    loadData();
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#466379" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userName ? (
        <Tab.Navigator
          screenOptions={({route}) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#466379',
              borderTopWidth: 0,
              elevation: 2,
              shadowOpacity: 0.1,
            },
            tabBarIcon: ({color, focused}) => {
              let iconName;
              if (route.name === 'Home') iconName = 'Home';
              else if (route.name === 'Cart') iconName = 'Cart';
              else if (route.name === 'Profile') iconName = 'Profile';
              return (
                <Icons
                  name={iconName}
                  fill={focused ? color : '#E0E0E0'}
                  width={'25'}
                  height={'25'}
                  stroke={focused ? color : '#E0E0E0'}
                />
              );
            },
            tabBarActiveTintColor: '#000000',
            tabBarInactiveTintColor: '#0e151f',
            tabBarLabel: ({focused, color}) => (
              <Text
                style={{
                  fontSize: focused ? 16 : 14,
                  fontWeight: focused ? 'bold' : 'normal',
                  color: focused ? '#0e151f' : '#E0E0E0',
                }}>
                {route.name}
              </Text>
            ),
          })}>
          <Tab.Screen name="Home" component={HomeStackNavigator} />
          <Tab.Screen
            name="Cart"
            component={CartScreen}
            options={{
              tabBarBadge: totalQuantity > 0 ? totalQuantity : null,
              tabBarBadgeStyle: {
                backgroundColor: 'red',
                color: 'white',
                fontSize: 12,
              },
            }}
          />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      ) : (
        <HomeStack.Navigator screenOptions={{headerShown: false}}>
          <HomeStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <HomeStack.Screen name="MainTabs" component={HomeStackNavigator} />
        </HomeStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default TabNavigaton

const styles = {
  loaderContainer: {
    backgroundColor:'#FFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
