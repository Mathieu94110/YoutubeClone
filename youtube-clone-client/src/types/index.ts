import * as MUIcon from '@mui/icons-material';

//Menu
export type menuLink = {
  icon: React.ReactNode;
  label: string;
};

export interface IconProps {
  icon?: keyof typeof MUIcon;
}
