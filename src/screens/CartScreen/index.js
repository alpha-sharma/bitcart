import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from '../../redux/cartSlice';

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
      <Text>{totalQuantity}</Text>
      <TouchableOpacity
        onPress={() => dispatch(removeFromCart(item.id))}
        style={styles.removeBtn}>
        <Text style={styles.removeText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#466379" barStyle="light-content" />
      <Text style={styles.header}>Shopping Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            renderItem={renderCartItem}
          />
          <View style={styles.footer}>
            <Text style={styles.totalText}>
              Total: ${totalPrice.toFixed(2)}
            </Text>
            <TouchableOpacity
              onPress={() => dispatch(clearCart())}
              style={styles.clearCartBtn}>
              <Text style={styles.clearCartText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f5f5', padding: 10},
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  emptyCart: {textAlign: 'center', fontSize: 16, marginTop: 50, color: '#888'},
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
    elevation: 2,
  },
  productImage: {width: 60, height: 60, resizeMode: 'contain', marginRight: 10},
  details: {flex: 1},
  title: {fontSize: 14, fontWeight: 'bold', marginBottom: 5},
  price: {fontSize: 14, color: '#666'},
  quantityContainer: {flexDirection: 'row', alignItems: 'center', marginTop: 5},
  quantityBtn: {
    width: 25,
    height: 25,
    borderRadius: 5,
    backgroundColor: '#466379',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  btnText: {color: '#fff', fontSize: 18},
  quantity: {fontSize: 16, fontWeight: 'bold'},
  removeBtn: {padding: 5},
  removeText: {fontSize: 18, color: 'red'},
  footer: {
    padding: 15,
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  totalText: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  clearCartBtn: {backgroundColor: 'red', padding: 10, borderRadius: 5},
  clearCartText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});

export default CartScreen;
