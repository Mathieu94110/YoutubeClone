import YoutubeCard from '@/components/YoutubeCard/YoutubeCard';
import { IYoutubeVideo } from '@/types';
import './YoutubeCardList.css';

const YoutubeCardList = ({
  isMenuOpen,
  videos,
}: {
  isMenuOpen: boolean;
  videos: IYoutubeVideo[];
}) => {
  return (
    <div className="youtube-card-list-container">
      <div className={`youtube-card-list ${isMenuOpen ? 'menu-open' : ''}`}>
        {videos.map((item: IYoutubeVideo) => {
          return <YoutubeCard data={item} key={item.videoId} />;
        })}
      </div>
    </div>
  );
};

export default YoutubeCardList;
