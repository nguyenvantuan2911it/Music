import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AccountApiFp } from 'src/api/api';
import { AppState } from 'src/app/store';
import { authorization } from '../auth/AuthSlice';

const initialState = {
  loadingCart: false,
  listCart: [],
  errorMessage: '',
};
export const getListCart = createAsyncThunk('cart/getList', async (id: string, thunkAPI) => {
  try {
    return await AccountApiFp.accountPrototypeGetCart(
      {
        id,
      },
      authorization()
    )();
  } catch (error) {
    const err = await error.json();
    return thunkAPI.rejectWithValue(err.error.message);
  }
});
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: {
    [getListCart.pending.toString()]: (state) => {
      state.loadingCart = true;
    },
    [getListCart.fulfilled.toString()]: (state, action) => {
      state.loadingCart = false;
      state.listCart = action.payload;
    },
    [getListCart.rejected.toString()]: (state, action) => {
      state.loadingCart = false;
      state.errorMessage = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const selectCart = (state: AppState) => state.cart;
