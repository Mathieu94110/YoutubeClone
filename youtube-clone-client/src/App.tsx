import { useEffect, useState } from 'react';
import Menu from '@/components/Menu/Menu';
import NavBar from '@/components/NavBar/NavBar';
import SlideIn from '@/utils/SlideIn/SlideIn';
import './App.css';
import YoutubeCardList from './components/YoutubeCardList/YoutubeCardList';
import { useAppDispatch, useAppSelector } from './hooks/useApp';
import { getHomePageVideos } from './store/youtubeSlice';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtube.videos);

  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);
  return (
    <div className="app">
      <SlideIn startAnimation={isMenuOpen}>
        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </SlideIn>
      <div className="app-main">
        <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <YoutubeCardList isMenuOpen={isMenuOpen} />
      </div>
    </div>
  );
}

export default App;
