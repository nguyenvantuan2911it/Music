import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountApiFp, Project } from 'src/api/api';
import { AppState } from 'src/app/store';
import { authorization } from '../auth/AuthSlice';

export interface ProjectType {
  loading: boolean;
  listProject: Project[];
  errorMessage: string;
  filter: any;
}

const initialState = {
  loading: false,
  listProject: [],
  errorMessage: '',
  filter: '',
};
export interface Data {
  id:string,
  value:string
}
export const getProject = createAsyncThunk('project/getProject', async (data: Data, thunkAPI) => {
  try {
    return await AccountApiFp.accountPrototypeGetProject(
      {
        id: data.id,
        filter: JSON.stringify({
          include: [{ relation: 'playlists' }],
          where: {
            name: { like: `%${data.value}%` },
            limit: 10,
          },
        }),
      },
      authorization()
    )();
  } catch (error) {
    const err = await error.json();
    return thunkAPI.rejectWithValue(err.error.message);
  }
});

const ProjectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
      
    },
  },
  extraReducers: {
    [getProject.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getProject.fulfilled.toString()]: (state, action: PayloadAction<Project[]>) => {
      state.loading = false;
      state.listProject = action.payload;
    },
    [getProject.rejected.toString()]: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload;
    },
  },
});
export default ProjectSlice.reducer;
export const { setFilter } = ProjectSlice.actions;
export const selectProject = (state: AppState) => state.project;
