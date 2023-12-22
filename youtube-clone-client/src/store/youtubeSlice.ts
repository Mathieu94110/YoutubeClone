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
      youtube: { nextPageToken: nextPageTokenFromState, video },
    } = getState();
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?maxResults=20&q="drop x out"&key=${API_KEY}&part=snippet&type=video`,
    );
    const data = await response.json();
    const items = await data.items;
    const parsedData = await parseData(items);
  },
);
// const res = await fetch(`${baseURL}/all`);
// const videos = await res.json();
// return videos;

const youtubeSlice = createSlice({
  name: 'youtube',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHomePageVideos.fulfilled, (state, action) => {});
  },
});

export default youtubeSlice.reducer;
