import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async function to load cart from AsyncStorage
export const loadCart = createAsyncThunk('cart/loadCart', async () => {
  try {
    const cartData = await AsyncStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : { cartItems: [], totalQuantity: 0, totalPrice: 0 };
  } catch (error) {
    console.error('Failed to load cart:', error);
    return { cartItems: [], totalQuantity: 0, totalPrice: 0 };
  }
});

// Function to save cart to AsyncStorage
const saveCartToStorage = async (cart) => {
  try {
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Failed to save cart:', error);
  }
};

// Function to handle adding items to cart
const handleAddToCart = (state, product) => {
    console.log(product,'from redux');
    
  const existingItem = state.cartItems.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cartItems.push({ ...product, quantity: 1 });
  }

  state.totalQuantity += 1;
  state.totalPrice += product.price;
  saveCartToStorage(state); // Save updated cart
};

// Function to handle removing items from cart
const handleRemoveFromCart = (state, productId) => {
  const itemIndex = state.cartItems.findIndex(item => item.id === productId);

  if (itemIndex !== -1) {
    const item = state.cartItems[itemIndex];
    state.totalQuantity -= item.quantity;
    state.totalPrice -= item.price * item.quantity;
    state.cartItems.splice(itemIndex, 1);
  }

  saveCartToStorage(state); // Save updated cart
};

// Function to increase item quantity
const handleIncreaseQuantity = (state, productId) => {
  const existingItem = state.cartItems.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
    state.totalQuantity += 1;
    state.totalPrice += existingItem.price;
  }

  saveCartToStorage(state); // Save updated cart
};

// Function to decrease item quantity
const handleDecreaseQuantity = (state, productId) => {
  const existingItem = state.cartItems.find(item => item.id === productId);
  if (existingItem && existingItem.quantity > 1) {
    existingItem.quantity -= 1;
    state.totalQuantity -= 1;
    state.totalPrice -= existingItem.price;
  } else {
    // Remove the item if quantity becomes 0
    handleRemoveFromCart(state, productId);
  }

  saveCartToStorage(state); // Save updated cart
};

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
  loading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      handleAddToCart(state, action.payload);
    },

    removeFromCart: (state, action) => {
      handleRemoveFromCart(state, action.payload);
    },

    increaseQuantity: (state, action) => {
      handleIncreaseQuantity(state, action.payload);
    },

    decreaseQuantity: (state, action) => {
      handleDecreaseQuantity(state, action.payload);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      saveCartToStorage(state); // Save updated cart
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.cartItems;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalPrice = action.payload.totalPrice;
        state.loading = false;
      })
      .addCase(loadCart.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
