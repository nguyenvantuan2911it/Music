import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { AccountApiFp, ContainerApiFp, Track } from 'src/api/api';
import { AppState } from 'src/app/store';
import { idText } from 'typescript';
import { authorization, getStoreLocal } from '../auth/AuthSlice';

const initialState: any = {
	isLoading: false,
	isSuccess: '',
	isError: '',
};
export const downloadTrack = createAsyncThunk('track/listTrackDowload', async (trackdownload: Track, thunkApi) => {
	try {
		 
		await AccountApiFp.accountPrototypeLinkDownloads({id:getStoreLocal('id'), fk:trackdownload.id.toString(10)}, authorization())();
		console.log( trackdownload.file);
		const res = await ContainerApiFp.containerDownload(
			{ container: 'files', file: trackdownload.file },
			authorization()
		)(); 
		const data = await res.blob();
		const changeType = data.slice(0, data.size, 'audio/mp3');
		const url = window.URL.createObjectURL(changeType);
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', trackdownload.name);
		document.body.appendChild(link);
		link.click();
		link.parentNode?.removeChild(link);
	} catch (error) {
		thunkApi.rejectWithValue(error.json);
		console.log(error);
		message.error('Please login before download apo');
	}
});

export const downloadTrackSlice = createSlice({
	name: 'download',
	initialState,
	reducers: {},
	extraReducers: {
		[downloadTrack.pending.toString()]: (state) => {
			state.error = '';
			state.isLoading = true;
		},
		[downloadTrack.fulfilled.toString()]: (state, action: PayloadAction<boolean>) => {
			state.isLoading = false;
			state.isSucess = action.payload;
		},
		[downloadTrack.rejected.toString()]: (state, { payload }) => {
			state.isLoading = false;
			state.isError = payload;
		},
	},
});
export default downloadTrackSlice.reducer;
export const selectTrackDownload = (state: AppState) => state.trackDownload;
