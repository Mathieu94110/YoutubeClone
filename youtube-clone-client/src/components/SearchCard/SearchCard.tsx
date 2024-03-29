import { IYoutubeVideo } from '@/types';
import './SearchCard.css';
import { Link } from 'react-router-dom';

const SearchCard = ({ data }:{data:IYoutubeVideo}) => {
  return (
    <div className="search-card">
      <div className="search-card-header">
        <span className="search-card-video-duration">{data.videoDuration}</span>
        <Link to={`/video/${data.videoId}`}>
        <img
          src={data.videoThumbnail}
          alt={data.videoTitle}
          className="search-card-image"
        />
        </Link>
      </div>
      <div className="search-card-infos">
        <h3 className="search-card-video-title">
          <a href="#" className="search-card-video-title-link">
            {data.videoTitle}
          </a>
        </h3>
        <div className="search-card-bottom-infos">
          <div>
            <div>
              <span className="search-card-bottom-infos-separators">
                {data.videoViews} vues
              </span>
              <span>{data.videoAge}</span>
            </div>
          </div>
        </div>
        <div className="search-card-bottom-link-container">
          <a href="#" className="search-card-bottom-link">
            <img
              src={data.channelInfo.image}
              alt="chaine"
              className="search-card-channel-image"
            />
            <span>{data.channelInfo.name}</span>
          </a>
        </div>
        <div>
          <div className="search-card-video-description">
            <p>{data.videoDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
