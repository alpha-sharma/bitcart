import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import React from 'react';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="#466379" barStyle="light-content" />
      <View>
        <Text>ProfileScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
