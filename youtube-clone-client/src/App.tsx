import { useState } from 'react';
import Menu from '@/components/Menu/Menu';
import NavBar from '@/components/NavBar/NavBar';
import SlideIn from '@/utils/SlideIn/SlideIn';
import './App.css';
import YoutubeCardList from './components/YoutubeCardList/YoutubeCardList';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <div className="app">
      <SlideIn startAnimation={isMenuOpen}>
        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </SlideIn>
      <div className="app-main">
        <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <YoutubeCardList />
      </div>
    </div>
  );
}

export default App;
