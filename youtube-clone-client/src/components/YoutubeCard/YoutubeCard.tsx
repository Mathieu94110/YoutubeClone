import { HomePageVideos } from '@/types';
import { Link } from 'react-router-dom';
import './YoutubeCard.css';

const YoutubeCard = ({ data }: { data: HomePageVideos }) => {
  return (
    <div className="youtube-card-container">
      <div className="youtube-card-content-top">
        <span className="youtube-card-content-top-duration">
          {data.videoDuration}
        </span>
        <Link to={`/watch/${data.videoId}`}>
          <img
            src={data.videoThumbnail}
            className="youtube-card-content-top-image"
            alt="thumbnail"
          />
        </Link>
      </div>
      <div className="youtube-card-content-bottom">
        <div className="youtube-card-content-bottom-image-wrapper">
          <a href="#">
            <img
              src={data.channelInfo.image}
              alt="chaine"
              className="youtube-card-content-bottom-image"
            />
          </a>
        </div>
        <div>
          <h3>
            <a href="#" className="youtube-card-content-video-title">
              {data.videoTitle.length > 34
                ? `${data.videoTitle.slice(0, 34)} ...`
                : `${data.videoTitle}`}
            </a>
          </h3>
          <div className="youtube-card-content-video-stats-wrapper">
            <div>
              <a href="#" className="youtube-card-content-video-stats-name">
                {data.channelInfo.name}
              </a>
            </div>
            <div>
              <span className="youtube-card-content-video-stats-views">
                {data.videoViews} vues
              </span>
              <span>{data.videoAge}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeCard;
