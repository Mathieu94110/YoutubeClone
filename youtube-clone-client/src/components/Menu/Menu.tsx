import { Dispatch, SetStateAction } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import YoutubeLogo from '@/assets/images/logo-youtube.png';
import {
  menuHeaderLinks,
  menuBodyLinks,
  menuFooterLinks,
} from '@/locales/menuLinks';
import './Menu.css';
import { Link } from 'react-router-dom';

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
        <div className="open-menu-header">
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
        <div className="open-menu-body">
          {menuHeaderLinks.map(({ icon, label, path }) => {
            return (
              <Link to={path} className="menu-link">
                <div className="item" key={label}>
                  {icon}
                  {label}
                </div>
              </Link>
            );
          })}
          <div className="border-row"></div>
          <div className="login-link-wrapper">
            Connectez vous pour liker les videos...
            <button className="login-link-button">
              <AccountCircleOutlinedIcon />
              SE CONNECTER
            </button>
          </div>
          <div className="border-row"></div>
          {menuBodyLinks.map(({ icon, label }) => {
            return (
              <div className="item" key={label}>
                {icon}
                {label}
              </div>
            );
          })}
          <div className="border-row"></div>
          {menuFooterLinks.map(({ icon, label }) => {
            return (
              <div className="item" key={label}>
                {icon}
                {label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Menu;
