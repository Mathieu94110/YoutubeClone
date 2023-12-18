import { Dispatch, SetStateAction } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
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
    </div>
  );
};

export default NavBar;
