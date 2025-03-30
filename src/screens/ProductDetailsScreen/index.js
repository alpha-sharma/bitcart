import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './ProductDetailsScreen.style';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../redux/cartSlice';
import AlertModal from '../../components/AlertModal';

const ProductDetailsScreen = ({route}) => {
  const {item} = route.params;
  const {title, price, description, image, rating} = item;
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const renderStars = rate => {
    const totalStars = 5;
    const fullStars = Math.floor(rate);
    const stars = [];

    for (let i = 0; i < totalStars; i++) {
      if (i < fullStars) {
        stars.push('\u2605');
      } else {
        stars.push('\u2606');
      }
    }

    return stars.join(' ');
  };

  const handleAddToCart = () => {
    setAlertMessage('Your Product Is Added To Cart!!')
    setModalVisible(true);
    dispatch(addToCart(item));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#466379" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{uri: image}} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>
          <Text style={styles.dollar}>$</Text> {price.toFixed(2)}
        </Text>
        <Text style={styles.rating}>
          {renderStars(rating.rate)}{' '}
          <Text style={styles.ratingRate}>
            {rating.rate} -{` ${rating.count} ratings`}
          </Text>
        </Text>
        <Text style={styles.productDescription}>Product Description:</Text>
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity
          onPress={() => handleAddToCart()}
          style={styles.addToCart}>
          <Text style={styles.addToCartText}>Add To Cart</Text>
        </TouchableOpacity>
      </ScrollView>

      <AlertModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="congratulations!!!"
        message={alertMessage}
      />
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;
