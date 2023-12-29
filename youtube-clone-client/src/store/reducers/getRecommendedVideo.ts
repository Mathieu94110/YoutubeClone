import { createAsyncThunk } from '@reduxjs/toolkit';
// import { parseRecommendedData } from '@/utils/ParseRecommendedData/parseRecommendedData';
import { parseData } from '@/utils/ParseData/parseData';

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

export const getRecommendedVideos = createAsyncThunk(
  'recommendedVideos',
  async (_, { getState }) => {
    const {
      youtube: {
        currentPlaying: {
          channelInfo: { id: channelId },
        },
      },
    } = getState();
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?&key=${API_KEY}&part=snippet&channelId=${channelId}&maxResults=20`,
      // `https://youtube.googleapis.com/youtube/v3/activities?&key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20`,
      // `https://youtube.googleapis.com/youtube/v3/activities?&key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=videoId=${videoId}`,
    );
    try {
      if (response.status === 403) {
        return "Le nombre maximal de requètes à l'api de youtube pour ce jour a été atteint !";
      }
      const data = await response.json();
      console.log('recommended videos =', data);
      const items = data.items;
      if (items) {
        const parsedData = await parseData(items);
        return {
          parsedData: [...parsedData],
        };
        // const parsedData = await parseRecommendedData(items, videoId);
        // return {
        //   parsedData,
        // };
      }
    } catch (err) {
      console.log(err);
    }
  },
);
