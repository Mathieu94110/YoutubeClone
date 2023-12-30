import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import { getVideoDetails, getRecommendedVideos } from '@/store/reducers';
import YoutubeCardList from '@/components/YoutubeCardList/YoutubeCardList';
import CircularProgress from '@mui/material/CircularProgress';
import YoutubeErrorLogo from '@/assets/images/logo-youtube-error.png';
import './watchPage.css';

const WatchPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentPlaying = useAppSelector(
    (state) => state.youtube.currentPlaying,
  );
  const recommendedVideo = useAppSelector(
    (state) => state.youtube.recommendedVideo,
  );
  const errors = useAppSelector((state) => state.youtube.errors);
  const isMenuOpen = useAppSelector((state) => state.menu.isMenuOpen);

  useEffect(() => {
    if (id) {
      dispatch(getVideoDetails(id));
    } else {
      navigate('/');
    }
  }, [id, navigate, dispatch]);

  useEffect(() => {
    if (currentPlaying && id) dispatch(getRecommendedVideos(id));
  }, [currentPlaying, dispatch, id]);
  return (
    <div className="watch-page-container">
      <div className="iframe-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay-1`}
          // width={800}
          // height={502}
          // allowFullScreen
          className="responsive-iframe"
          title="lecteur youtube"
        ></iframe>
      </div>

      {!recommendedVideo.length && !errors ? (
        <div className="loader-container">
          <CircularProgress />
        </div>
      ) : errors ? (
        <div className={`error-container ${isMenuOpen ? 'menu-open' : ''}`}>
          <div className="error-message">
            <img src={YoutubeErrorLogo} width={200} />
            <h2>{errors}</h2>
          </div>
        </div>
      ) : (
        <YoutubeCardList isMenuOpen={isMenuOpen} videos={recommendedVideo} />
      )}
    </div>
  );
};

export default WatchPage;
