import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from '../../redux/cartSlice';
import styles from './CartScreen.style';
import Icons from '../../assets';

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalPrice = useSelector(state => state.cart.totalPrice);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  const renderCartItem = ({item}) => (
    <View style={styles.cartItem}>
      <Image source={{uri: item.image}} style={styles.productImage} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => dispatch(decreaseQuantity(item.id))}
            style={styles.quantityBtn}>
            <Text style={styles.btnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => dispatch(increaseQuantity(item.id))}
            style={styles.quantityBtn}>
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => dispatch(removeFromCart(item.id))}
        style={styles.removeBtn}>
        <Icons
          name={'Delete'}
          fill={'#A23C3C'}
          width={'25'}
          height={'25'}
          stroke={'red'}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#466379" barStyle="light-content" />
      <Text style={styles.header}>Your Shopping Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            renderItem={renderCartItem}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.footer}>
            <View style={styles.amountItem}>
              <Text style={styles.totalText}>
                <Text style={{fontSize: 15}}>Total Amount: </Text> $
                <Text style={styles.price}>{totalPrice.toFixed(2)}</Text>
              </Text>
              <Text style={{fontSize:15}}>
               ( Items: {totalQuantity})
              </Text>
            </View>

            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => dispatch(clearCart())}
                style={styles.buyNow}>
                <Text style={styles.clearCartText}>Buy Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => dispatch(clearCart())}
                style={styles.clearCartBtn}>
                <Text style={styles.clearCartText}>Clear Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
