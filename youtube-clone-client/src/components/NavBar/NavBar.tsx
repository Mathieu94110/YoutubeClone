import { Dispatch, SetStateAction } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import YoutubeLogo from '@/assets/images/logo-youtube.png';
import './NavBar.css';

const NavBar = ({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="navbar-container">
      <span className="burger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <MenuIcon />
      </span>
      <span className="youtube-logo">
        <img src={YoutubeLogo} />
      </span>
      <div className='navbar-search'>
      <div className="navbar-input">
        <input
          type="text"
          placeholder="Rechercher"
          className="navbar-search-input"
        />
      </div>
      <button className="navbar-search-button">
        {' '}
        <SearchOutlinedIcon />
      </button>
      </div>
    </div>
  );
};

export default NavBar;
