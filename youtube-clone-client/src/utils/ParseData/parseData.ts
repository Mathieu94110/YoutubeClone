import { parseVideoDuration } from '../ParseVideoDuration/parseVideoDuration';
import { convertRawToString } from '../ConvertRawToString/convertRawToString';
import { timeSince } from '../TimeSince/timeSince';

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

export const parseData = async (items) => {
  console.log(items);
  try {
    const videoIds = [];
    const channelIds = [];

    items.forEach((item) => {
      channelIds.push(item.snippet.channelId);
      videoIds.push(item.id.videoId);
    });
    console.log(channelIds);
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet.contentDetails&id=${channelIds}.join(",")}&key=${API_KEY}`,
    );
    const data = await response.json();
    const channelsData = data.item;
    console.log(data);
    const parsedChannelsData = [];

    channelsData.map(
      parsedChannelsData.push({
        id: channel.id,
        image: channel.snippet.thumbnails.default.url,
      }),
    );


    const videos = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(
        ',',
      )}&key=${API_KEY}`,
    );
const videosJson = await videos.json();
const videosData = videosJson.items;
    const parsedData = [];
    items.forEach((item, index) => {
      const { image: channelImage } = parsedChannelsData.find(
        (data) => data.id === item.snippet.channelId,
      );
      if (channelImage) {
        parsedData.push({
          videoId: item.id.videoData,
          videoTitle: item.snippet.title,
          videoDescription: item.snippet.description,
          videoThumbnail: item.snippet.thumbnails.medium.url,
          videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          videoDuration: parseVideoDuration(
            videosData[index].contentDetails.duration,
          ),
          videoViews: convertRawToString(
            videosData[index].statistics.viewCount,
          ),
          videoAge: timeSince(new Date(item.snippet.publishedAt)),
          channelInfo: {
            id: item.snippet.channelId,
            image: channelImage,
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
