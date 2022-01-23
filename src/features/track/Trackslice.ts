// import { filter } from 'rxjs/operators';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountApiFp, GenreApiFp, MoodApiFp, Track, TrackApiFp } from 'src/api/api';
import { MusicType } from 'src/interface/track';
import { AppState } from '../../app/store';
import { authorization, getStoreLocal } from '../auth/AuthSlice';

export interface TrackState {
  listTrack: Track[];
  listTrackPlayList: Track[];
  listTrackSearch: Track[];
  listTrackId: Track[];
  isLoading: boolean;
  errorMessage: String;
  filter: string;
  viewMore: boolean;
}
const initialState: TrackState = {
  listTrack: [],
  listTrackPlayList: [],
  listTrackSearch: [],
  listTrackId: [],
  isLoading: false,
  errorMessage: '',
  filter: undefined,
  viewMore: false,
};

const filterdemo = (numberskip: number) => {
  return {
    limit: 5,
    include: [
      {
        relation: 'genres',
        scope: {
          fields: ['tag'],
        },
      },
      { relation: 'moods', scope: { fields: ['tag'] } },
      { relation: 'composers', scope: { fields: ['name'] } },
    ],
    skip: numberskip,
  };
};
const filter = {
  limit: 5,
  include: [
    {
      relation: 'genres',
      scope: {
        fields: ['tag'],
      },
    },
    { relation: 'moods', scope: { fields: ['tag'] } },
    { relation: 'composers', scope: { fields: ['name'] } },
  ],
};
export const listTrackAsync = createAsyncThunk(
  'track/listTrack',
  async (musicType: MusicType, thunkAPI) => {
    // @ts-ignore
    try {
      switch (musicType.type) {
        case 'Genres':
          return await GenreApiFp.genrePrototypeGetTrack({
            id: musicType.id,
            filter: JSON.stringify(filterdemo(musicType.skip)),
          })();

        case 'Mood':
          return await MoodApiFp.moodPrototypeGetTrack({
            id: musicType.id,
            filter: JSON.stringify(filterdemo(musicType.skip)),
          })();

        case 'Feature':
          return await TrackApiFp.trackFind({
            filter: JSON.stringify(filterdemo(musicType.skip)),
          })();

        case 'Download':
          return await AccountApiFp.accountPrototypeGetDownloads(
            {
              id: getStoreLocal('id'),
              filter: JSON.stringify(filterdemo(musicType.skip)),
            },
            authorization()
          )();

        default:
          return [];
      }
    } catch (error) {
      const err = await error.json();
      return thunkAPI.rejectWithValue(err.error.message);
    }
  }
);

export const listTrackViewMoreAsync = createAsyncThunk(
  'track/listTrackviewmore',
  async (musicType: MusicType, thunkAPI) => {
    // @ts-ignore

    try {
      switch (musicType.type) {
        case 'Genres':
          return await GenreApiFp.genrePrototypeGetTrack({
            id: musicType.id,
            filter: JSON.stringify(filterdemo(musicType.skip)),
          })();

        case 'Mood':
          return await MoodApiFp.moodPrototypeGetTrack({
            id: musicType.id,
            filter: JSON.stringify(filterdemo(musicType.skip)),
          })();

        case 'Feature':
          return await GenreApiFp.genrePrototypeGetTrack({
            id: musicType.id,
            filter: JSON.stringify(filterdemo(musicType.skip)),
          })();

        case 'Download':
          return await AccountApiFp.accountPrototypeGetDownloads(
            {
              id: getStoreLocal('id'),
              filter: JSON.stringify(filterdemo(musicType.skip)),
            },
            authorization()
          )();

        default:
          return [];
      }
    } catch (error) {
      const err = await error.json();

      return thunkAPI.rejectWithValue(err.error.message);
    }
  }
);
export const getlistTrackbyId = createAsyncThunk(
  'track/listTrackbyId',
  async (musicType: MusicType, thunkAPI) => {
    // @ts-ignore
    try {
      switch (musicType.type) {
        case 'Genres':
          return await GenreApiFp.genrePrototypeGetTrack({
            id: musicType.id,
            filter: JSON.stringify(filter),
          })();

        case 'Mood':
          return await MoodApiFp.moodPrototypeGetTrack({
            id: musicType.id,
            filter: JSON.stringify(filter),
          })();

        case 'Feature':
          return await TrackApiFp.trackFind({
            filter: JSON.stringify(filter),
          })();
        case 'Theme':
          break;
        case 'Download':
          return await AccountApiFp.accountPrototypeGetDownloads(
            {
              id: getStoreLocal('id'),
              filter: JSON.stringify(filter),
            },
            authorization()
          )();

        default:
          return [];
      }
    } catch (error) {
      const err = await error.json();
      return thunkAPI.rejectWithValue(err.error.message);
    }
  }
);
export const searchListTrackAsync = createAsyncThunk(
  'track/searchListTrack',
  async (search: string, thunkAPI) => {
    const filter = {
      include: [
        {
          relation: 'genres',
          scope: {
            fields: ['tag'],
          },
        },
        { relation: 'moods', scope: { fields: ['tag'] } },
        { relation: 'composers', scope: { fields: ['name'] } },
      ],
      where: {
        name: { like: `%${search}%` },
        limit: 10,
      },
    };
    try {
      return await TrackApiFp.trackFind({ filter: JSON.stringify(filter) })();
    } catch (error) {
      const err = await error.json();
      return thunkAPI.rejectWithValue(err.error.message);
    }
  }
);

const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setListTracks: (state, action) => {
      state.listTrackPlayList = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [listTrackAsync.pending.toString()]: (state) => {
      state.isLoading = true;
      state.viewMore = false;
    },
    [listTrackAsync.fulfilled.toString()]: (state, action: PayloadAction<Track[]>) => {
      state.isLoading = false;
      if (action.payload.length < 4) {
        state.viewMore = true;
      }
      state.listTrack = action.payload;
    },
    [listTrackAsync.rejected.toString()]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
    [listTrackViewMoreAsync.pending.toString()]: (state) => {
      state.viewMore = false;
      state.isLoading = true;
    },
    [listTrackViewMoreAsync.fulfilled.toString()]: (state, action: PayloadAction<Track[]>) => {
      state.isLoading = false;

      state.listTrackId.push(...action.payload);
      state.listTrack.push(...action.payload);
      if (action.payload.length === 0 || action.payload.length < 4) {
        state.viewMore = true;
      }
    },
    [listTrackViewMoreAsync.rejected.toString()]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
    [searchListTrackAsync.pending.toString()]: (state) => {
      state.viewMore = false;
      state.isLoading = true;
    },
    [searchListTrackAsync.fulfilled.toString()]: (state, action: PayloadAction<Track[]>) => {
      state.isLoading = false;
      state.listTrackSearch = action.payload;
    },
    [searchListTrackAsync.rejected.toString()]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
    [getlistTrackbyId.pending.toString()]: (state) => {
      state.isLoading = true;
      state.viewMore = false;
      state.listTrackId = [];
    },
    [getlistTrackbyId.fulfilled.toString()]: (state, action: PayloadAction<Track[]>) => {
      state.isLoading = false;
      state.listTrackId = action.payload;
    },
    [getlistTrackbyId.rejected.toString()]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export default trackSlice.reducer;
export const { setListTracks, setFilter } = trackSlice.actions;

export const selectTrack = (state: AppState) => state.track;
