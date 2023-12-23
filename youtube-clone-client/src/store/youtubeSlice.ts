import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { parseData } from '@/utils/ParseData/parseData';

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

const initialState = {
  videos: [],
  currentPlaying: null,
  searchTerm: '',
  searchResults: [],
  nextPageToken: null,
  recommendedVideo: [],
  errors: null,
};

export const getHomePageVideos = createAsyncThunk(
  'fetchHomeVideos',
  async (isNext, { getState }) => {
    const {
      youtube: { nextPageToken: nextPageTokenFromState, videos },
    } = getState();
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
          parsedData: [...videos, ...parsedData],
          nextPageToken: nextPageTokenFromState,
        };
      }
      return "Le nombre maximal de requètes à l'api de youtube pour ce jour a été atteint !";
    } catch (err) {
      console.log(err);
    }
  },
);

const youtubeSlice = createSlice({
  name: 'youtube',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
      if (action.payload && action.payload.parsedData) {
        state.videos = action.payload.parsedData;
        state.nextPageToken = action.payload.nextPageToken;
        state.errors = null;
      } else {
        state.errors = action.payload;
      }
    }),
      builder.addCase(getHomePageVideos.rejected, (state, action) => {
        console.log(action);
        if (action.payload.error && action.payload.error.message) {
          state.errors = action.payload.error.message;
        } else {
          state.errors = 'Problème survenu lors de la requète !';
        }
      });
  },
});

export default youtubeSlice.reducer;
