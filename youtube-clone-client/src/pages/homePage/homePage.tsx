import { useEffect } from 'react';
import YoutubeCardList from '@/components/YoutubeCardList/YoutubeCardList';
import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import { getHomePageVideos } from '@/store/reducers/getHomePageVideos';
import YoutubeErrorLogo from '@/assets/images/logo-youtube-error.png';
import CircularProgress from '@mui/material/CircularProgress';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtube.videos);
  const errors = useAppSelector((state) => state.youtube.errors);
  const isMenuOpen = useAppSelector((state) => state.menu.isMenuOpen);

  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

  return (
    <>
      {!videos.length && !errors ? (
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
        <YoutubeCardList isMenuOpen={isMenuOpen} videos={videos} />
      )}
    </>
  );
};

export default HomePage;
