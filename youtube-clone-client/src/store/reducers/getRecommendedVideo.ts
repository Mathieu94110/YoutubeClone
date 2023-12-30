import { createAsyncThunk } from '@reduxjs/toolkit';
import { parseData } from '@/utils';

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;
const BASE_URI = import.meta.env.VITE_YOUTUBE_BASE_URI;

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
      `${BASE_URI}/search?&key=${API_KEY}&channelId=${channelId}&order=date&part=snippet&type=video&maxResults=20`,
    );
    try {
      if (response.status === 403) {
        return "Le nombre maximal de requètes à l'api de youtube pour ce jour a été atteint !";
      }
      const data = await response.json();
      const items = data.items;
      if (items) {
        const parsedData = await parseData(items, 'recommended');
        return {
          parsedData: [...parsedData],
        };
      }
    } catch (err) {
      console.log(err);
    }
  },
);
