import { createSlice } from '@reduxjs/toolkit';
import {
  getHomePageVideos,
  getSearchPageVideos,
  getVideoDetails,
  getRecommendedVideos,
} from './reducers';

const initialState = {
  videos: [],
  currentPlaying: null,
  searchText: '',
  searchResults: [],
  recommendedVideo: [],
  errors: null,
};

const youtubeSlice = createSlice({
  name: 'youtube',
  initialState,
  reducers: {
    clearVideos: (state) => {
      state.searchResults = [];
    },
    changeSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    clearSearch: (state) => {
      state.searchText = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
      if (action.payload && action.payload.parsedData) {
        state.videos = action.payload.parsedData;
        state.errors = null;
      } else {
        state.errors = action.payload;
      }
    }),
      builder.addCase(getHomePageVideos.rejected, (state) => {
        state.errors = 'Problème survenu lors de la requète !';
      });
    builder.addCase(getSearchPageVideos.fulfilled, (state, action) => {
      if (action.payload && action.payload.parsedData) {
        state.searchResults = action.payload.parsedData;
        state.errors = null;
      } else {
        state.errors = action.payload;
      }
    });
    builder.addCase(getRecommendedVideos.fulfilled, (state, action) => {
      if (action.payload && action.payload.parsedData) {
        state.recommendedVideo = action.payload.parsedData;
        state.errors = null;
      } else {
        state.errors = action.payload;
      }
    });
    builder.addCase(getVideoDetails.fulfilled, (state, action) => {
      state.currentPlaying = action.payload;
    });
  },
});

export const { clearVideos, changeSearchText, clearSearch } =
  youtubeSlice.actions;
export default youtubeSlice.reducer;
