import { createAsyncThunk } from '@reduxjs/toolkit';
import { convertRawToString } from '@/utils/ConvertRawToString/convertRawToString';
import { timeSince } from '@/utils/TimeSince/timeSince';

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

export const getVideoDetails = createAsyncThunk('videoDetails', async (id) => {
  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?&key=${API_KEY}&part=snippet,statistics&type=video&id=${id}`,
  );
  try {
    const data = await response.json();
    const items = data.items;
    if (items) {
      console.log(items);
      return parsedData(items[0]);
    }
    return "Le nombre maximal de requètes à l'api de youtube pour ce jour a été atteint !";
  } catch (err) {
    console.log(err);
  }
});

async function parsedData(item) {
  const { snippet, id, statistics } = item;
  const channelResponse = await fetch(
    `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${snippet.channelId}&key=${API_KEY}`,
  );
  const channelData = await channelResponse.json();
  const channelImage = channelData.data.items[0].snippet.thumbnails.default.url;
  const subscriberCount = channelData.data.item[0].statistics.subscriberCount;

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
