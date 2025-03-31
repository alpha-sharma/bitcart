import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadUserName = createAsyncThunk('user/loadUserName', async () => {
  try {
    const storedName = await AsyncStorage.getItem('userName');
    return storedName ? JSON.parse(storedName) : ''; 
  } catch (error) {
    console.error('Failed to load user name:', error);
    return '';
  }
});

const saveUserNameToStorage = async (name) => {
  try {
    await AsyncStorage.setItem('userName', JSON.stringify(name));
  } catch (error) {
    console.error('Failed to save user name:', error);
  }
};

const initialState = {
  userName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserName: (state, action) => {
      state.userName = action.payload;
      saveUserNameToStorage(action.payload); 
    },

    removeUserName: (state) => {
      state.userName = '';
      saveUserNameToStorage('');
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadUserName.fulfilled, (state, action) => {
        state.userName = action.payload;
      });
  },
});

export const { addUserName, removeUserName } = userSlice.actions;
export default userSlice.reducer;
