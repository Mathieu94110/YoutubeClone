import { createAsyncThunk } from '@reduxjs/toolkit';
import { parseData } from '@/utils/ParseData/parseData';
const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

export const getHomePageVideos = createAsyncThunk(
  'fetchHomeVideos',
  async ({ getState }) => {
    const {
      youtube: { videos },
    } = getState();
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?maxResults=20&q="ate chuet"&key=${API_KEY}&part=snippet&type=video`,
    );
    try {
      if(response.status === 403){
        return "Le nombre maximal de requètes à l'api de youtube pour ce jour a été atteint !";
      }
      const data = await response.json();
      const items = data.items;
      if (items) {
        const parsedData = await parseData(items);
        return {
          parsedData: [...videos, ...parsedData],
        };
      }
    } catch (err) {
      console.log(err);
    }
  },
);
