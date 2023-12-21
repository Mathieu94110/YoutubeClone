import { HomePageVideos } from '@/types';
import YoutubeCard from '../YoutubeCard/YoutubeCard';
import { videos } from '@/locales/fakeVideos';
import './YoutubeCardList.css';

const YoutubeCardList = () => {
  return (
    <div className='youtube-card-list-container'>
      {videos.length ? (
        <div className="youtube-card-list">
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
