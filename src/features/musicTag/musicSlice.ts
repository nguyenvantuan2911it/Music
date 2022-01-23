import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Genre, GenreApiFp, MoodApiFp, TrackApiFp } from 'src/api/api';
import { AppState } from 'src/app/store';


export interface MusicTagStatus {
  type?: String | String[];

  id?: string;
}
export interface MusicGenre {
  isLoading: boolean;
  errorMessage: string;
  listMusic: any[];
  tagbyID: any;
}
const initialState: MusicGenre = {
  isLoading: false,
  errorMessage: '',
  listMusic: [],
  tagbyID: null,
};
const filter = {
  limit: 10,
};
const filtersound = {
  limit: 10,
  where: { soundEffect: 'true' },
};

export const getTagById = createAsyncThunk(
  'musicATaggetbyID',
  async (musicType: MusicTagStatus, thunkAPI) => {
    try {
      switch (musicType.type) {
        case 'Genres':
          return await GenreApiFp.genreFindById({
            id: musicType.id,
          })();
        case 'Moods':
          return await MoodApiFp.moodFindById({
            id: musicType.id,
          })();

        case 'Feature':
          return await GenreApiFp.genreFindById({
            id: musicType.id,
          })();
        case 'sound-effects':
          return await GenreApiFp.genreFindById({
            id: musicType.id,
          })();
        default:
          return [];
      }
    } catch (error) {
      const err = await error.json();
      return thunkAPI.rejectWithValue(err.error.message);
    }
  }
);

export const getGenre = createAsyncThunk(
  'music/fetchMusic',
  async (musictype: string | string[], thunkAPI) => {
    try {
      switch (musictype) {
        case 'Genres':
          return await GenreApiFp.genreFind({ filter: JSON.stringify(filter) })();
        case 'Moods':
          return await MoodApiFp.moodFind({ filter: JSON.stringify(filter) })();
        case 'Feature':
          return await GenreApiFp.genreFind({ filter: JSON.stringify(filter) })();
        case 'Theme':
          break;
        case 'Sound':
          return await GenreApiFp.genreFind({ filter: JSON.stringify(filtersound) })();
        default:
          return [];
      }
    } catch (error) {
      const err = await error.json();
      return thunkAPI.rejectWithValue(err.error.message);
    }
  }
);

export const searchGenre = createAsyncThunk(
  'music/searchMusic',
  async (search: string | string[], thunkAPI) => {
    const filter = {
      where: {
        name: { like: `%${search}%` },
        limit: 5,
      },
    };
    try {
      let array = await GenreApiFp.genreFind({ filter: JSON.stringify(filter) })();
      let arr = await MoodApiFp.moodFind({ filter: JSON.stringify(filter) })();
      arr.map((key: any) => {
        array.push(key);
      });
      return array;
    } catch (error) {
      const err = await error.json();
      return thunkAPI.rejectWithValue(err.error.message);
    }
  }
);

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGenre.pending.toString(), (state) => {
        state.isLoading = true;
      })
      .addCase(getGenre.fulfilled.toString(), (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.listMusic = action.payload;
      })
      .addCase(getGenre.rejected.toString(), (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(searchGenre.pending.toString(), (state) => {
        state.isLoading = true;
      })
      .addCase(searchGenre.rejected.toString(), (state, action: PayloadAction<Genre[]>) => {
        state.isLoading = false;
        state.listMusic = action.payload;
      })
      .addCase(searchGenre.fulfilled.toString(), (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(getTagById.pending.toString(), (state) => {
        state.isLoading = true;
      })
      .addCase(getTagById.fulfilled.toString(), (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.tagbyID = action.payload;
        return state;
      })
      .addCase(getTagById.rejected.toString(), (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      });
  },
});
export const selectListMusic = (state: AppState) => state.musicTag;
export default musicSlice.reducer;
