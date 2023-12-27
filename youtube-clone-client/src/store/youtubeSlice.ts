import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { parseData } from '@/utils/ParseData/parseData';
import { getVideoDetails } from './reducers/getVideoDetails';
import { getRecommendedVideos } from './reducers/getRecommendedVideo';

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

const initialState = {
  videos: [],
  currentPlaying: null,
  searchText: '',
  searchResults: [],
  nextPageToken: null,
  recommendedVideo: [],
  errors: null,
};

//api reducers
export const getHomePageVideos = createAsyncThunk(
  'fetchHomeVideos',
  async () => {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?maxResults=20&q="ate chuet"&key=${API_KEY}&part=snippet&type=video`,
    );
    try {
      const data = await response.json();
      const items = data.items;
      if (items) {
        console.log(items);
        const parsedData = await parseData(items);
        return {
          parsedData: [...parsedData],
        };
      }
      return "Le nombre maximal de requètes à l'api de youtube pour ce jour a été atteint !";
    } catch (err) {
      console.log(err);
    }
  },
);

export const getSearchPageVideos = createAsyncThunk(
  'fetchSearchVideos',
  async (arg) => {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?q=${arg}&maxResults=20&key=${API_KEY}&part=snippet&type=video`,
    );
    try {
      const data = await response.json();
      const items = data.items;
      if (items) {
        console.log(items);
        const parsedData = await parseData(items);
        return {
          parsedData: [...parsedData],
        };
      }
      return "Le nombre maximal de requètes à l'api de youtube pour ce jour a été atteint !";
    } catch (err) {
      console.log(err);
    }
  },
);
//

const youtubeSlice = createSlice({
  name: 'youtube',
  initialState,
  reducers: {
    clearVideos: (state) => {
      console.log();
      state.searchResults = [];
      state.nextPageToken = null;
    },
    changeSearchText: (state, action) => {
      console.log('SEARCHTEXT = ', action);
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
      builder.addCase(getHomePageVideos.rejected, (state, action) => {
        console.log(action);
        state.errors = 'Problème survenu lors de la requète !';
      });
    builder.addCase(getSearchPageVideos.fulfilled, (state, action) => {
      console.log('Fulfilled =', action);
      if (action.payload && action.payload.parsedData) {
        state.searchResults = action.payload.parsedData;
        state.errors = null;
      } else {
        state.errors = action.payload;
      }
    });
    builder.addCase(getRecommendedVideos.fulfilled, (state, action) => {
      console.log('Fulfilled =', action);
      if (action.payload && action.payload.parsedData) {
        state.recommendedVideo = action.payload.parsedData;
        state.errors = null;
      } else {
        state.errors = action.payload;
      }
    });
    builder.addCase(getVideoDetails.fulfilled, (state, action) => {
      console.log('Fulfilled =', action);
        state.currentPlaying = action.payload;
    });
  },
});

export const { clearVideos, changeSearchText, clearSearch } =
  youtubeSlice.actions;
export default youtubeSlice.reducer;
