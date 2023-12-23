import { Suspense } from 'react';
import Menu from '@/components/Menu/Menu';
import NavBar from '@/components/NavBar/NavBar';
import SlideIn from '@/utils/SlideIn/SlideIn';
import './App.css';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/useApp';
import { toggleMenu } from './store/menuSlice';

function App() {
  const isMenuOpen = useAppSelector((state) => state.menu.isMenuOpen);
  const dispatch = useAppDispatch();

  function toggleYoutubeMenu() {
    dispatch(toggleMenu());
  }

  return (
    <div className="app">
      <SlideIn startAnimation={isMenuOpen}>
        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={toggleYoutubeMenu} />
      </SlideIn>
      <div className="app-main">
        <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={toggleYoutubeMenu} />
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
