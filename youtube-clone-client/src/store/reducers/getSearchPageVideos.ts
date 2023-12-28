import { createAsyncThunk } from '@reduxjs/toolkit';
import { parseData } from '@/utils/ParseData/parseData';
const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

export const getSearchPageVideos = createAsyncThunk(
  'fetchSearchVideos',
  async (_,{ getState }) => {
    const {
      youtube: {  searchText },
    } = getState();
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?q=${searchText}&maxResults=20&key=${API_KEY}&part=snippet&type=video`,
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
          parsedData: [ ...parsedData],
        };
      }
    } catch (err) {
      console.log(err);
    }
  },
);
