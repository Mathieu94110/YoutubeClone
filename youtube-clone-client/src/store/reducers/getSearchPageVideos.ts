import { createAsyncThunk } from '@reduxjs/toolkit';
import { parseData } from '@/utils';
const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;
const BASE_URI = import.meta.env.VITE_YOUTUBE_BASE_URI;
export const getSearchPageVideos = createAsyncThunk(
  'fetchSearchVideos',
  async (_, { getState }) => {
    const {
      youtube: { searchText },
    } = getState();
    const response = await fetch(
      `${BASE_URI}/search?q=${searchText}&maxResults=20&key=${API_KEY}&part=snippet&type=video`,
    );
    try {
      if (response.status === 403) {
        return "Le nombre maximal de requètes à l'api de youtube pour ce jour a été atteint !";
      }
      const data = await response.json();
      const items = data.items;
      if (items) {
        const parsedData = await parseData(items, 'details');
        return {
          parsedData: [...parsedData],
        };
      }
    } catch (err) {
      console.log(err);
    }
  },
);
