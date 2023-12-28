import { parseVideoDuration } from '../ParseVideoDuration/parseVideoDuration';
import { convertRawToString } from '../ConvertRawToString/convertRawToString';
import { timeSince } from '../TimeSince/timeSince';

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

export const parseRecommendedData = async (items,videoId) => {
  console.log(items);
  try {
    const videoIds = [];
    const channelIds = [];

    items.forEach((item) => {
      channelIds.push(item.snippet.channelId);
      videoIds.push(item.id);
    });
    console.log('videoIds =', videoIds);
    console.log('channelIds =', channelIds);
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}.join(",")}&key=${API_KEY}`,
    );
    const data = await response.json();
    console.log('channelsData =', data);
    const channelsData = data;
    const parsedChannelsData = [];

    channelsData.items.map((channel) => {
      parsedChannelsData.push({
        id: channel.id,
        image: channel.snippet.thumbnails.default.url,
      });
    });
    console.log('parsedChannelsData =', parsedChannelsData);
    const videos = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet,id&maxResults=20&relatedToVideoId=${videoId}&type=video`,
      // `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${parsedChannelsData[0].id}&part=snippet,id,statistics&order=date&maxResults=20`,
      // `https://youtube.googleapis.com/youtube/v3/videos?part=,contentDetails,statistics&id=${parsedChannelsData[0].id}&key=${API_KEY}`,
    );
    const videosJson = await videos.json();
    console.log('videosJson parseRecommendedDATA', videosJson);
    const videosData = videosJson.items;
    console.log('videosData', videosJson.items);
    const parsedData = [];
    items.forEach((item, index) => {
      const { image: channelImage } =
        parsedChannelsData.find((data) => data.id === item.snippet.channelId) ||
        {};
      if (channelImage) {
        parsedData.push({
          videoId: item.id.videoId,
          videoTitle: item.snippet.title,
          videoDescription: item.snippet.description,
          videoThumbnail: item.snippet.thumbnails.medium.url,
          videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          videoDuration: videosData[index].contentDetails.duration
            ? parseVideoDuration(videosData[index].contentDetails.duration)
            : '',
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
    console.log('parsedData =', parsedData);
    return parsedData;
  } catch (err) {
    console.log(err);
  }
};
