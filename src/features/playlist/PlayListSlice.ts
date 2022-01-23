import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountApiFp, Playlist, PlaylistApiFp } from 'src/api/api';
import { AppState } from 'src/app/store';
import { authorization, getStoreLocal } from '../auth/AuthSlice';

export interface PlayListType {
  loading: boolean;
  list: Playlist[];
  errorMessage: string;
  Listsearch: string[];
  filter: string;
}

const initialState = {
  loading: false,
  list: [],
  listPlayList: [],
  errorMessage: '',
  Listsearch: [],
  filter: undefined,
};

export const getPlaylistNull = createAsyncThunk('playlist/getListNull', async (id: string, thunkAPI) => {
  const filter = {
    limit: 10,
    include: [{ relation: 'playlists' }],
    where: {
      projectId: 0,
      limit: 10,
    },
  };
  try {
    return await AccountApiFp.accountPrototypeGetProject(
      {
        id,
        filter: JSON.stringify(filter),
      },
      authorization()
    )();
  } catch (error) {
    const err = await error.json();
    return thunkAPI.rejectWithValue(err.error.message);
  }
});

export const deletePlayList=createAsyncThunk('playlist/delete', async (id: string, thunkAPI) => {
  
  try {
    return await PlaylistApiFp.playlistDeleteById({id}, authorization())()
    
  } catch (error) {
    const err = await error.json();
    return thunkAPI.rejectWithValue(err.error.message);
  }
});

export const getPlaylist = createAsyncThunk('playlist/getList', async (id: string, thunkAPI) => {
  const filter = {
    limit: 10,
  };
  try {
    return await AccountApiFp.accountPrototypeGetPlaylist(
      {
        id,
        filter: JSON.stringify(filter),
      },
      authorization()
    )();
  } catch (error) {
    const err = await error.json();
    return thunkAPI.rejectWithValue(err.error.message);
  }
});

const PlayListSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    searchPlayList: (state, action) => {
      state.list = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [getPlaylistNull.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getPlaylistNull.fulfilled.toString()]: (state, action: PayloadAction<Playlist[]>) => {
      state.loading = false;
      state.list = action.payload;
    },
    [getPlaylistNull.rejected.toString()]: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload;
    },
    [getPlaylist.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getPlaylist.fulfilled.toString()]: (state, action: PayloadAction<Playlist[]>) => {
      state.loading = false;
      state.listPlayList = action.payload;
    },
    [getPlaylist.rejected.toString()]: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload;
    },
  },
});
export default PlayListSlice.reducer;
export const { searchPlayList } = PlayListSlice.actions;
export const selectPlayList = (state: AppState) => state.playlist;

export const Search = async (value: string, dispatch) => {
  if (typeof window !== 'undefined') {
    const filter = {
      include: [{ relation: 'playlists' }],
      where: {
        name: { like: `%${value}%` },
        limit: 10,
      },
    };
    const id = getStoreLocal('id');
    try {
      const res: any = await AccountApiFp.accountPrototypeGetProject(
        {
          id: id,
          filter: JSON.stringify(filter),
        },
        authorization()
      )();
      dispatch(searchPlayList(res));
      console.log(res);
    } catch (error) {}
  } else {
  }
};
