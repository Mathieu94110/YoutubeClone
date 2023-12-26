import { useEffect } from 'react';
import YoutubeCardList from '@/components/YoutubeCardList/YoutubeCardList';
import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import { clearVideos, getSearchPageVideos } from '@/store/youtubeSlice';
import YoutubeErrorLogo from '@/assets/images/logo-youtube-error.png';
import './searchPage.css';
import { useNavigate } from 'react-router';
import SearchCard from '@/components/SearchCard/SearchCard';
// import { videos } from '@/locales/fakeVideos';

const SearchPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector((state) => state.youtube.searchResults);
  const errors = useAppSelector((state) => state.youtube.errors);
  const isMenuOpen = useAppSelector((state) => state.menu.isMenuOpen);
  const searchText = useAppSelector((state) => state.youtube.searchText);

  useEffect(() => {
    dispatch(clearVideos());
    if (searchText === '') navigate('/');
    else {
      dispatch(getSearchPageVideos(false));
    }
  }, [dispatch, navigate, searchText]);

  return (
    <div className="search-page">
      {
      
      
      
      
      searchResults.length ? (
        <div className={`search-page-cards-container ${isMenuOpen ? 'menu-open' : ''}`}>
          {searchResults.map((video) => {
            return <SearchCard data={video} key={video.videoId} />;
          })}
        </div>
      ) : (
        <p>Chargement en cours ...</p>
      )}
    </div>
  );
};

export default SearchPage;
