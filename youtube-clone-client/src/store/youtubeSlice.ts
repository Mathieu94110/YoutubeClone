import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { parseData } from '@/utils/ParseData/ParseData';

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

const initialState = {
  videos: [],
  currentPlaying: null,
  searchTerm: '',
  searchResults: [],
  nextPageToker: null,
  recommendedVideo: [],
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
    const data = response.json();
    const items = data.items;
    const parsedData = await parseData(items);

    return {
      parsedData: [...videos, ...parsedData],
      nextPageToken: nextPageTokenFromState,
    };
  },
);

const youtubeSlice = createSlice({
  name: 'youtube',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHomePageVideos.fulfilled, (state, action) => {});
  },
});

export default youtubeSlice.reducer;
