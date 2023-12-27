import { createAsyncThunk } from '@reduxjs/toolkit';
import { parseRecommendedData } from '@/utils/ParseRecommendedData/parseRecommendedData';

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

export const getRecommendedVideos = createAsyncThunk(
  'recommendedVideos',
  async (videoId, { getState }) => {
    const {
      youtube: {
        currentPlaying: {
          channelInfo: { id: channelId },
        },
      },
    } = getState();
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/activities?&key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=videoId=${videoId}`,
    );
    try {
      const data = await response.json();
      const items = data.items;
      if (items) {
        console.log(items);
        const parsedData = await parseRecommendedData(items, videoId);
        return {
          parsedData,
        };
      }
      return "Le nombre maximal de requètes à l'api de youtube pour ce jour a été atteint !";
    } catch (err) {
      console.log(err);
    }
  },
);
