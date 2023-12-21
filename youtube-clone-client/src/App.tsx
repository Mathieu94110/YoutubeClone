import { useState } from 'react';
import Menu from '@/components/Menu/Menu';
import NavBar from '@/components/NavBar/NavBar';
import SlideIn from '@/utils/SlideIn/SlideIn';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <div className="app">
      <SlideIn startAnimation={isMenuOpen}>
        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </SlideIn>
      <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
}

export default App;
