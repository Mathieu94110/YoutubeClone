import { createAsyncThunk } from '@reduxjs/toolkit';
import { parseData } from '@/utils';

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;
const BASE_URI = import.meta.env.VITE_YOUTUBE_BASE_URI;

export const getHomePageVideos = createAsyncThunk(
  'fetchHomeVideos',
  async (_, { getState }) => {
    const {
      youtube: { videos },
    } = getState();

    const response = await fetch(
      `${BASE_URI}/videos?part=snippet&chart=mostPopular&maxResults=20&regionCode=FR&videoCategoryId=20&key=${API_KEY}`,
    );
    try {
      if (response.status === 403) {
        return "Le nombre maximal de requètes à l'api de youtube pour ce jour a été atteint !";
      }
      const data = await response.json();
      const items = data.items;
      if (items) {
        const parsedData = await parseData(items, 'popular');
        return {
          parsedData: [...videos, ...parsedData],
        };
      }
    } catch (err) {
      console.log(err);
    }
  },
);
