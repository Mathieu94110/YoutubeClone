import { useEffect } from 'react';
import YoutubeCardList from '@/components/YoutubeCardList/YoutubeCardList';
import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import { getHomePageVideos } from '@/store/youtubeSlice';
import YoutubeErrorLogo from '@/assets/images/logo-youtube-error.png';
import './homePage.css';
// import { videos } from '@/locales/fakeVideos';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtube.videos);
  const errors = useAppSelector((state) => state.youtube.errors);
  useEffect(() => {
    dispatch(getHomePageVideos(false));
    console.log(videos);
  }, [dispatch]);

  return (
    <>
      {errors ? (
        <div className="home-page-error-container">
          <div className="home-page-error-message">
            <img src={YoutubeErrorLogo} width={200} />
            <h2>{errors}</h2>
          </div>
        </div>
      ) : (
        <YoutubeCardList isMenuOpen={false} videos={videos} />
      )}
    </>
  );
};

export default HomePage;
