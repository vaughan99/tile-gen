import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import FunctionsIcon from '@mui/icons-material/Functions';
import StraightenIcon from '@mui/icons-material/Straighten';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import { TileProfile } from '../profile';
import { Divider } from '@mui/material';

export type NavOptions =
  | 'tiled'
  | 'axis'
  | 'pattern'
  | 'normalization'
  | 'colorMap';

export interface NavListProps {
  profile: TileProfile;
  navSelected: NavOptions;
  onNavSelected: (navSelected: NavOptions) => void;
}

export const NavList = (props: NavListProps) => {
  const { profile, navSelected, onNavSelected } = props;

  return (
    <List component="nav">
      <React.Fragment>
        <ListItemButton
          selected={navSelected === 'tiled'}
          onClick={() => onNavSelected('tiled')}
        >
          <ListItemIcon>
            <BorderAllIcon />
          </ListItemIcon>
          <ListItemText primary="Expanded" />
        </ListItemButton>
        <Divider />
        <ListItemButton
          selected={navSelected === 'axis'}
          onClick={() => onNavSelected('axis')}
        >
          <ListItemIcon>
            <LineAxisIcon />
          </ListItemIcon>
          <ListItemText primary="Axis" />
        </ListItemButton>

        <ListItemButton
          selected={navSelected === 'pattern'}
          onClick={() => onNavSelected('pattern')}
        >
          <ListItemIcon>
            <FunctionsIcon />
          </ListItemIcon>
          <ListItemText primary="Pattern Editor" />
        </ListItemButton>

        <ListItemButton
          selected={navSelected === 'normalization'}
          onClick={() => onNavSelected('normalization')}
        >
          <ListItemIcon>
            <StraightenIcon />
          </ListItemIcon>
          <ListItemText primary="Normalization" />
        </ListItemButton>

        <ListItemButton
          selected={navSelected === 'colorMap'}
          onClick={() => onNavSelected('colorMap')}
        >
          <ListItemIcon>
            <ColorLensIcon />
          </ListItemIcon>
          <ListItemText primary="Color Map" />
        </ListItemButton>
      </React.Fragment>
    </List>
  );
};
