import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import AuthSlice from '../features/auth/AuthSlice';
import counterReducer from '../features/counter/counterSlice';
import playMusicReducer from '../features/playmusic/PlaySlice';
import trackReducer from '../features/track/Trackslice';
import trackDownloadReducer from '../features/track/TrackDownloadSlice';
import MusicReducer from '../features/musicTag/musicSlice';
import profileReducer from '../features/account/profileSlice';
import PlayListReducer from '../features/playlist/PlayListSlice';
import ProjectReducer from '../features/project/ProjectSlice';
import MuiscGenerReducer from '../features/MuiscGener/MuiscGenerSlice';
import CartReducer from '../features/cart/CartSlice';
export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
      play: playMusicReducer,
      auth: AuthSlice,
      track: trackReducer,
      musicTag: MusicReducer,
      profile: profileReducer,
      trackDownload: trackDownloadReducer,
      playlist: PlayListReducer,
      project: ProjectReducer,
      titleoftype: MuiscGenerReducer,
      cart: CartReducer,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
