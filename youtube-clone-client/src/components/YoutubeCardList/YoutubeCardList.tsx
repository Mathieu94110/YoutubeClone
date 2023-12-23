import { HomePageVideos } from '@/types';
import YoutubeCard from '../YoutubeCard/YoutubeCard';
import './YoutubeCardList.css';

const YoutubeCardList = ({
  isMenuOpen,
  videos,
}: {
  isMenuOpen: boolean;
  videos: HomePageVideos[];
}) => {
  return (
    <div className="youtube-card-list-container">
      {videos.length ? (
        <div className={`youtube-card-list ${isMenuOpen ? 'menu-open' : ''}`}>
          {videos.map((item: HomePageVideos) => {
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
