import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track } from '../../api/api';
import type { AppState } from '../../app/store';


export interface PlaySlice {
	status: 'idle' | 'stop' | 'play';
	trackid: any;
}

const initialState: PlaySlice = {
	status: 'idle',
	trackid: null,
};

export const playSlice = createSlice({
	name: 'playSlice',
	initialState,

	reducers: {
		// action : {payload: {status: "play", track: new Track()}}
		playmusic: (state, action: PayloadAction<any>) => {
			state.status = action.payload.status;
			state.trackid = action.payload.trackid;
		},
		stopmusic: (state, action: PayloadAction<any>) => {
			state.status = action.payload.status;
			state.trackid = action.payload.trackid;
		},
		play: (state, action: PayloadAction<any>) => {
			state.status = action.payload.status;
		},
		stop: (state, action: PayloadAction<any>) => {
			state.status = action.payload.status;
		},
	},
});

export const { playmusic, stopmusic, play, stop } = playSlice.actions;

export const selecttrack = (state: AppState) => state.play.trackid;
export const selectstatus = (state: AppState) => state.play.status;
// export const selectId = (state: AppState) => state.play.trackid.id;

export default playSlice.reducer;
