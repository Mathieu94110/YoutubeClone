import YoutubeCard from '../YoutubeCard/YoutubeCard';
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
      {videos.length ? (
        <div className={`youtube-card-list ${isMenuOpen ? 'menu-open' : ''}`}>
          {videos.map((item: IYoutubeVideo) => {
            return <YoutubeCard data={item} key={item.videoId} />;
          })}
        </div>
      ) : (
        <p>Chargement en cours ...</p>
      )}
    </div>
  );
};

export default YoutubeCardList;
