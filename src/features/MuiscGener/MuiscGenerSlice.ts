import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GenreApiFp, MoodApiFp } from 'src/api/api';
import { AppState } from 'src/app/store';
import { authorization } from '../auth/AuthSlice';
import { MusicTagStatus } from '../musicTag/musicSlice';

const initialState = {
  loading: false,
  list: [],
  errorMessage: '',
};
const filter = (check) => {
  if (check) {
    return {
      fields: {
        slug: true,
        tag: true,
        fatherGenreId: true,
        id: true,
      },
      where: { soundEffect: 'false' },
    };
  } else {
    return {
      fields: {
        slug: true,
        tag: true,
        fatherGenreId: true,
        id: true,
      },
      where: { soundEffect: 'true' },
    };
  }
};
export const fetchTitleofType = createAsyncThunk(
  'fetchData/footer',
  async (musicType: MusicTagStatus) => {
    try {
      switch (musicType.type) {
        case 'Feature':
          return await GenreApiFp.genreFind({ filter: JSON.stringify(filter(1)) })();
        case 'Genres':
          return await GenreApiFp.genreFind({ filter: JSON.stringify(filter(1)) })();
        case 'Moods':
          return await MoodApiFp.moodFind({ filter: JSON.stringify(filter(1)) })();
        case 'Sound-effect':
          return await GenreApiFp.genreFind({ filter: JSON.stringify(filter(0)) })();
        default:
          return [];
      }
    } catch (error) {
      return error.json;
    }
  }
);
const MuiscGenerSlice = createSlice({
  name: 'musicgener',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTitleofType.pending.toString()]: (state) => {
      state.loading = true;
    },
    [fetchTitleofType.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    [fetchTitleofType.rejected.toString()]: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload;
    },
  },
});

export default MuiscGenerSlice.reducer;
export const selectType = (state: AppState) => state.titleoftype;
