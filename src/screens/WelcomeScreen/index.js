import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addUserName} from '../../redux/userSlice';
import {useNavigation} from '@react-navigation/native';
import styles from './WelcomeScreen.style';
import Icons from '../../assets';

const WelcomeScreen = () => {
  const [name, setName] = useState('');
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
      <StatusBar backgroundColor="#D7F8E3" barStyle="dark-content" />

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

      <TextInput
        style={styles.input}
        placeholder="Type your name..."
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.letsGo}>Let's Go</Text>
        <Icons
          name={'Arrow'}
          fill={'white'}
          width={'25'}
          height={'25'}
          stroke={'white'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
