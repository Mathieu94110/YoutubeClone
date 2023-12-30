import { createAsyncThunk } from '@reduxjs/toolkit';
import { convertRawToString, timeSince } from '@/utils';

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;
const BASE_URI = import.meta.env.VITE_YOUTUBE_BASE_URI;

export const getVideoDetails = createAsyncThunk('videoDetails', async (id) => {
  const response = await fetch(
    `${BASE_URI}/videos?&key=${API_KEY}&part=snippet,statistics&type=video&id=${id}`,
  );
  try {
    if (response.status === 403) {
      return "Le nombre maximal de requètes à l'api de youtube pour ce jour a été atteint !";
    }
    const data = await response.json();
    const items = data.items[0];
    if (items) {
      const videoDetails = await parsedData(items);
      return videoDetails;
    }
  } catch (err) {
    console.log(err);
  }
});

async function parsedData(item) {
  const { snippet, id, statistics } = item;
  const channelResponse = await fetch(
    `${BASE_URI}/channels?part=snippet,statistics&id=${snippet.channelId}&key=${API_KEY}`,
  );
  const channelData = await channelResponse.json();

  const channelImage = channelData.items[0].snippet.thumbnails.default.url
    ? channelData.items[0].snippet.thumbnails.default.url
    : '';
  const subscriberCount = channelData.items[0].statistics.subscriberCount
    ? channelData.items[0].statistics.subscriberCount
    : '';
  return {
    videoId: id,
    videoTitle: snippet.title,
    videoDescription: snippet.description,
    videoViews: convertRawToString(statistics.viewCount),
    videoAge: timeSince(new Date(snippet.publishedAt)),
    channelInfo: {
      id: snippet.channelId,
      image: channelImage ? channelImage : '',
      name: snippet.channelTitle,
      subscribers: convertRawToString(subscriberCount, true),
    },
  };
}
