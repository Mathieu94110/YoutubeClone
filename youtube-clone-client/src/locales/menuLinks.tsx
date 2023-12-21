import HomeIcon from '@mui/icons-material/Home';
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
import { menuLink } from '../types';

const menuHeaderLinks: menuLink[] = [
  { icon: <HomeIcon />, label: 'Accueil' },
  { icon: <ExploreOutlinedIcon />, label: 'Shorts' },
  { icon: <SubscriptionsOutlinedIcon />, label: 'Abonnements' },
];
const menuBodyLinks: menuLink[] = [
  { icon: <HistoryOutlinedIcon />, label: 'Historique' },
  { icon: <LibraryMusicOutlinedIcon />, label: 'Musique' },
  { icon: <SportsBasketballOutlinedIcon />, label: 'Sports' },
  { icon: <SportsEsportsOutlinedIcon />, label: 'Jeux vidéo' },
  { icon: <MovieOutlinedIcon />, label: 'Films' },
  { icon: <ArticleOutlinedIcon />, label: 'Nouveautés' },
  { icon: <LiveTvOutlinedIcon />, label: 'Direct' },
];
const menuFooterLinks: menuLink[] = [
  { icon: <SettingsOutlinedIcon />, label: 'Paramètres' },
  { icon: <FlagOutlinedIcon />, label: 'Historique des signal...' },
  { icon: <HelpOutlineOutlinedIcon />, label: 'Aide' },
];

export { menuHeaderLinks, menuBodyLinks, menuFooterLinks };
