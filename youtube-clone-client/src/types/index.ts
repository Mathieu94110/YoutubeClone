import * as MUIcon from '@mui/icons-material';

//Menu
export type menuLink = {
  icon: React.ReactNode;
  label: string;
  path?: string;
};

export interface IconProps {
  icon?: keyof typeof MUIcon;
}

export interface IYoutubeVideo {
  videoId: string;
  videoTitle: string;
  videoDescription: string;
  videoLink: string;
  videoThumbnail: string;
  videoDuration: string;
  videoViews: string;
  videoAge: string;
  channelInfo: {
    id: string;
    image: string;
    name: string;
  };
}
