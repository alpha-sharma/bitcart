import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icons from '../assets';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import {createStackNavigator} from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="ProductDetail" component={ProductDetailsScreen} />
    </HomeStack.Navigator>
  );
};

const TabNavigaton = () => {
  return (
    <NavigationContainer>
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
                fill={focused ? color : '#000'}
                width={'25'}
                height={'25'}
                stroke={focused ? color : '#000'}
              />
            );
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#0e151f',
        })}>
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigaton;
