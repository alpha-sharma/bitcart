import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadCart = createAsyncThunk('cart/loadCart', async () => {
  try {
    const cartData = await AsyncStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : { cartItems: [], totalQuantity: 0, totalPrice: 0 };
  } catch (error) {
    console.error('Failed to load cart:', error);
    return { cartItems: [], totalQuantity: 0, totalPrice: 0 };
  }
});

const saveCartToStorage = async (cart) => {
  try {
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Failed to save cart:', error);
  }
};

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
  saveCartToStorage(state); 
};

const handleRemoveFromCart = (state, productId) => {
  const itemIndex = state.cartItems.findIndex(item => item.id === productId);

  if (itemIndex !== -1) {
    const item = state.cartItems[itemIndex];
    state.totalQuantity -= item.quantity;
    state.totalPrice -= item.price * item.quantity;
    state.cartItems.splice(itemIndex, 1);
  }

  saveCartToStorage(state); 
};

const handleIncreaseQuantity = (state, productId) => {
  const existingItem = state.cartItems.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
    state.totalQuantity += 1;
    state.totalPrice += existingItem.price;
  }

  saveCartToStorage(state); 
};

const handleDecreaseQuantity = (state, productId) => {
  const existingItem = state.cartItems.find(item => item.id === productId);
  if (existingItem && existingItem.quantity > 1) {
    existingItem.quantity -= 1;
    state.totalQuantity -= 1;
    state.totalPrice -= existingItem.price;
  } else {
    handleRemoveFromCart(state, productId);
  }

  saveCartToStorage(state); 
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
      saveCartToStorage(state); 
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
