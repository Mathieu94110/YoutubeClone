import { Dispatch, SetStateAction } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MicIcon from '@mui/icons-material/Mic';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonIcon from '@mui/icons-material/Person';
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
      <div className="nav-bar-start">
        <span
          className="burger-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MenuIcon />
        </span>
        <span className="youtube-logo">
          <img src={YoutubeLogo} />
        </span>
      </div>
      <div className="navbar-center">
        <div className="navbar-center-wrapper">
          <div className="navbar-search-container">
            <div className="navbar-search-input-wrapper">
              {' '}
              <input
                type="text"
                placeholder="Rechercher"
                className="navbar-search-input"
              />
            </div>
            <button className="navbar-search-button">
              {' '}
              <SearchOutlinedIcon className="search-outlined-icon" />
            </button>
          </div>
        </div>

        <div className="voice-search-button">
          <MicIcon className="voice-mic-icon" />
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-end-icons-wrapper">
          <VideoCallIcon className="video-call-icon" />
        </div>
        <div className="navbar-end-icons-wrapper">
          <NotificationsNoneIcon />
        </div>
        <div className="navbar-end-icons-wrapper">
          <PersonIcon />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
