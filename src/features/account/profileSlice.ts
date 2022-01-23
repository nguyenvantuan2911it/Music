import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account, AccountApiFp } from 'src/api/api';
import { AppState } from 'src/app/store';
import { authorization } from '../auth/AuthSlice';
export interface Profile {
	fname?: string;
	lname?: string;
	company?: string;
	business?: string;
	address?: string;
	country?: string;
	email?: string;
	id?: string;
}
interface initialStateProps {
	loading: boolean;
	profile: Profile;
	errorMessage: String;
}
const initialState: initialStateProps = {
	loading: false,
	profile: {},
	errorMessage: '',
};
const filter = {
	fields: {
		id: true,
		firstName: true,
		lastName: true,
		companyName: true,
		address: true,
		country: true,
		email: true,
		password: true,
		businessTypeString: true,
	},
};
export const getProfile = createAsyncThunk('account/getprofile', async (id: string, thunkAPI) => {
	try {
		const res = await AccountApiFp.accountFindById(
			{ id, filter: JSON.stringify(filter) },
			authorization()
		)();
		return res;
	} catch (error) {
		const err = await error.json();
		return thunkAPI.rejectWithValue(err.error.message);
	}
});

export const changeProfile = createAsyncThunk('account/changeprofile', async (profile:Profile, thunkAPI) => {
	try {
		
		const res =await AccountApiFp.accountPrototypePatchAttributes(
			{
			  id: profile.id,
			//   data: {
			// 	id:profile.id,
			// 	...profile
			//   },
			},
			authorization()
		  )();
		
		return res;
	} catch (error) {
		const err = await error.json();
		return thunkAPI.rejectWithValue(err.error.message);
	}
});

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers: {
		[getProfile.pending.toString()]: (state) => {
			state.loading = true;
		},
		[getProfile.fulfilled.toString()]: (state, action: PayloadAction<Account>) => {
			state.loading = false;
			state.profile = action.payload;
		},
		[getProfile.rejected.toString()]: (state, { payload }) => {
			state.loading = false;
			state.errorMessage = payload;
		},
	},
});

export default profileSlice.reducer;

export const selectProfile = (state: AppState) => state.profile;
