import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { AccountApiFp } from '../../api/api';
import { apiRegister } from '../../api/auth.api';
import { AppState } from '../../app/store';
import { LoginParams, SignupParams } from '../../interface/user/login';
import { AuthObject } from '../../interface/user/user';

export const getStoreLocal = (item) => {
 
  if (typeof window !== 'undefined') {
  
    return localStorage.getItem(item);
  }
};
export const removeStoreLocal = (item) => {
  if (typeof window !== 'undefined') {
    return localStorage.removeItem(item);
  }
};
export interface AuthState {
  logged: boolean;
  accessToken: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: String;
}
const initialState: AuthState = {
  logged: getStoreLocal('token') ? true : false,
  accessToken: getStoreLocal('token') ? (getStoreLocal('token') as string) : '',
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

 export const authorization = () => {
  return {headers: {
    authorization: getStoreLocal('token')
  }
}
 }

const saveAccessToken = (dispatch: Dispatch, token: any, id: any) => {
  localStorage.setItem('token', token);
  localStorage.setItem('id', id);
  dispatch(
    setItem({
      logged: true,
      accessToken: token,
    })
  );
};

export const loginAsync = createAsyncThunk('user/login', async (user: LoginParams, thunkAPI) => {
  try {
    const res = await AccountApiFp.accountLogin(user)();
    saveAccessToken(thunkAPI.dispatch, res.id, res.userId);
    console.log(res);
    // });
  } catch (error) {
    const err = await error.json();
    return thunkAPI.rejectWithValue(err.error.message);
  }
});

export const logoutAsync = createAsyncThunk('user/logout', async (thunkAPI) => {
  try {
    return () => {
      localStorage.setItem('token', '');
      localStorage.setItem('id', '');
    };
  } catch (error) {
    const err = await error.json();
    // return thunkAPI.rejectWithValue(err.error.message);
  }
});

export const socialLoginAsync = createAsyncThunk(
  'user/socialLogin',
  async (user: LoginParams, thunkAPI) => {
    try {
      return await AccountApiFp.accountLogin(user)()
        .then(async (response) => {
          saveAccessToken(thunkAPI.dispatch, response.id, response.userId);
          console.log(response);
        })
        .catch(async () => {
          let userSignup: SignupParams;
          userSignup.data = user.credentials;
          await AccountApiFp.accountCreate(userSignup)().then((response) => {
            thunkAPI.dispatch(
              loginAsync({
                credentials: {
                  email: userSignup.data.email,
                  password: userSignup.data.password,
                },
              })
            );
          });
        });
    } catch (error) {
      const err = await error.json();
      return thunkAPI.rejectWithValue(err.error.message);
    }
  }
);

export const registerAsync = createAsyncThunk(
  'user/register',
  async (user: SignupParams, thunkAPI) => {
    try {
      return await AccountApiFp.accountCreate(user)().then((response) => {
        thunkAPI.dispatch(
          loginAsync({
            credentials: {
              email: user.data.email,
              password: user.data.password,
            },
          })
        );
      });
    } catch (error) {
      const err = await error.json();
      return thunkAPI.rejectWithValue(err.error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<Partial<AuthObject>>) {
      Object.assign(state, action.payload);
    },
    signout(state) {
      state.isSuccess = false;
      state.logged = false;
      state.accessToken = '';
    },
  },
  extraReducers: {
    [loginAsync.fulfilled.toString()]: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      return state;
    },
    [loginAsync.rejected.toString()]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      console.log(payload);
      state.errorMessage = payload;
    },
    [loginAsync.pending.toString()]: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
      state.isError = false;
    },
    [registerAsync.fulfilled.toString()]: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      return state;
    },
    [registerAsync.rejected.toString()]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      console.log(payload);
      state.errorMessage = payload;
    },
    [registerAsync.pending.toString()]: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
      state.isError = false;
    },
    [socialLoginAsync.fulfilled.toString()]: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      return state;
    },
    [socialLoginAsync.rejected.toString()]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      console.log(payload);
      state.errorMessage = payload;
    },
    [socialLoginAsync.pending.toString()]: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
      state.isError = false;
    },
    [logoutAsync.fulfilled.toString()]: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      return state;
    },
    [logoutAsync.rejected.toString()]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      console.log(payload);
      state.errorMessage = payload;
    },
    [logoutAsync.pending.toString()]: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
      state.isError = false;
    },
  },
});

export const { setItem, signout } = authSlice.actions;
export default authSlice.reducer;

export const signupAsync = (payload: SignupParams) => {
  return async (dispatch: Dispatch) => {
    return await apiRegister(payload)
      .then(
        (response) => {
          dispatch(
            setItem({
              tokenVerifyRegister: response.data['verifyToken'],
              authVerifyRegister: true,
            })
          );
          return true;
        },
        (error) => {
          console.log(error.response.data);

          if (error.response.status) {
            message.error(error.data.message);
          } else {
            message.error(error.status.message);
          }
          return error.response.data;
        }
      )
      .catch((error: any) => {
        message.error(error.message);
        return false;
      });
  };
};

export const selectUser = (state: AppState) => state.auth;
