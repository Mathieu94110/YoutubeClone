import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import { clearVideos, getSearchPageVideos } from '@/store/youtubeSlice';
import YoutubeErrorLogo from '@/assets/images/logo-youtube-error.png';
import SearchCard from '@/components/SearchCard/SearchCard';
import CircularProgress from '@mui/material/CircularProgress';
import './searchPage.css';

const SearchPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector((state) => state.youtube.searchResults);
  const errors = useAppSelector((state) => state.youtube.errors);
  const isMenuOpen = useAppSelector((state) => state.menu.isMenuOpen);
  const searchText = useAppSelector(
    (state) => state.youtube.searchText,
  ) as string;

  useEffect(() => {
    dispatch(clearVideos());
    if (searchText === '') navigate('/');
    else {
      dispatch(getSearchPageVideos(searchText));
    }
  }, [dispatch, navigate, searchText]);

  return (
    <div className="search-page">
      {!searchResults.length && !errors ? (
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
        searchResults.map((video) => {
          return <SearchCard data={video} key={video.videoId} />;
        })
      )}
    </div>
  );
};

export default SearchPage;
