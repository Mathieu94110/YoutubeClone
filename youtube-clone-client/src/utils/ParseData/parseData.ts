import { parseVideoDuration } from '../ParseVideoDuration/parseVideoDuration';
import { convertRawToString } from '../ConvertRawToString/convertRawToString';
import { timeSince } from '../TimeSince/timeSince';

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

export const parseData = async (items) => {
  try {
    const videoIds = [];
    const channelIds = [];

    items.forEach((item) => {
      channelIds.push(item.snippet.channelId);
      videoIds.push(item.id.videoIds);
    });

    const {
      data: { item: channelsData },
    } = await fetch(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet.contentDetails&id=${channelIds}.join(",")}&key=${API_KEY}`,
    );

    const parsedChannelsData = [];

    channelsData.map((channel) =>
      parsedChannelsData.push({
        id: channel.id,
        image: channel.snippet.thumbnails.default.url,
      }),
    );
    const {
      data: { items: videoData },
    } = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(
        ',',
      )}&key=${API_KEY}`,
    );

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
            videoData[index].contentDetails.duration,
          ),
          videoViews: convertRawToString(
            videosData[index].statistics.viewCount,
          ),
          videoAge: timeSince(new Data(item.snippet.publishedAt)),
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
