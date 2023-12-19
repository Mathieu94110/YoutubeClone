import './Menu.css';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import YoutubeLogo from '@/assets/images/logo-youtube.png';
import { Dispatch, SetStateAction } from 'react';

const Menu = ({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="open-menu-container">
      <div className="open-menu-wrapper">
        <div className="logo">
          <span
            className="burger-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuIcon />
          </span>{' '}
          <span className="youtube-logo">
            <img src={YoutubeLogo} />
          </span>
        </div>
        <div className="item">
          <HomeIcon />
          Accueil
        </div>
        <div className="item">
          <ExploreOutlinedIcon />
          Shorts
        </div>
        <div className="item">
          <SubscriptionsOutlinedIcon />
          Abonnements
        </div>
        <div className="border-row"></div>
        Connectez vous pour liker les videos...
        <button className="login-link-button">
          <AccountCircleOutlinedIcon />
          SE CONNECTER
        </button>
        <div className="border-row"></div>
        <div className="item">
          <HistoryOutlinedIcon />
          Historique
        </div>
        <div className="item">
          <LibraryMusicOutlinedIcon />
          Musique
        </div>
        <div className="item">
          <SportsBasketballOutlinedIcon />
          Sports
        </div>
        <div className="item">
          <SportsEsportsOutlinedIcon />
          Jeux vidéo
        </div>
        <div className="item">
          <MovieOutlinedIcon />
          Films
        </div>
        <div className="item">
          <ArticleOutlinedIcon />
          Nouveautés
        </div>
        <div className="item">
          <LiveTvOutlinedIcon />
          Direct
        </div>
        <div className="border-row"></div>
        <div className="item">
          <SettingsOutlinedIcon />
          Paramètres
        </div>
        <div className="item">
          <FlagOutlinedIcon />
          Historique des signal...
        </div>
        <div className="item">
          <HelpOutlineOutlinedIcon />
          Aide
        </div>
      </div>
    </div>
  );
};

export default Menu;
