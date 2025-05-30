import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addUserName} from '../../redux/userSlice';
import {useNavigation} from '@react-navigation/native';
import styles from './ProfileScreen.style';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (name.trim()) {
      dispatch(addUserName(name));
      navigation.reset({
        index: 0, 
        routes: [{ name: 'MainTabs' }], 
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#466379" barStyle="dark-content" />

      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          fontFamily: 'lucida grande',
          paddingRight: 5,
        }}>
        Welcome
        <Text style={styles.welcomeText}> to BitCart Store !!!</Text>
      </Text>
      <Text style={styles.welcomeText}>comming soon!</Text>
    </View>
  );
};

export default ProfileScreen;
