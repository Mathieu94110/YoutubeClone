import { useState, Suspense } from 'react';
import Menu from '@/components/Menu/Menu';
import NavBar from '@/components/NavBar/NavBar';
import SlideIn from '@/utils/SlideIn/SlideIn';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="app">
      <SlideIn startAnimation={isMenuOpen}>
        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </SlideIn>
      <div className="app-main">
        <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
