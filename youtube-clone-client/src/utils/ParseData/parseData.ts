import { parseVideoDuration } from '../ParseVideoDuration/parseVideoDuration';
import { convertRawToString } from '../ConvertRawToString/convertRawToString';
import { timeSince } from '../TimeSince/timeSince';

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;
const BASE_URI = import.meta.env.VITE_YOUTUBE_BASE_URI;

export const parseData = async (items, type) => {
  try {
    const videoIds = [];
    const channelIds = [];

    items.forEach((item) => {
      channelIds.push(item.snippet.channelId);
      type === 'details' || type === 'recommended'
        ? videoIds.push(item.id.videoId)
        : videoIds.push(item.id);
    });
    const response = await fetch(
      `${BASE_URI}/channels?part=snippet&id=${channelIds}.join(",")}&key=${API_KEY}`,
    );
    const data = await response.json();
    const channelsData = data;
    const parsedChannelsData = [];

    channelsData.items.map((channel) => {
      parsedChannelsData.push({
        id: channel.id,
        image: channel.snippet.thumbnails.default.url,
      });
    });
    const videos = await fetch(
      `${BASE_URI}/videos?part=contentDetails,statistics&id=${videoIds.join(
        ',',
      )}&key=${API_KEY}`,
    );
    const videosJson = await videos.json();
    const videosData = videosJson.items;
    const parsedData = [];
    items.forEach((item, index) => {
      const { image: channelImage } =
        parsedChannelsData.find((data) => data.id === item.snippet.channelId) ||
        {};
      if (channelImage) {
        parsedData.push({
          videoId:
            type === 'details' || type === 'recommended'
              ? item.id.videoId
              : item.id,
          videoTitle: item.snippet.title,
          videoDescription: item.snippet.description,
          videoThumbnail: item.snippet.thumbnails.medium.url,
          videoLink: `https://www.youtube.com/watch?v=${
            type === 'details' || type === 'recommended'
              ? item.id.videoId
              : item.id
          }`,
          videoDuration: parseVideoDuration(
            videosData[index].contentDetails.duration,
          ),
          videoViews: convertRawToString(
            videosData[index].statistics.viewCount,
          ),
          videoAge: timeSince(new Date(item.snippet.publishedAt)),
          channelInfo: {
            id: item.snippet.channelId,
            image: channelImage ? channelImage : '',
            name: item.snippet.channelTitle,
          },
        });
      }
    });
    return parsedData;
  } catch (err) {
    console.log(err);
  }
};
