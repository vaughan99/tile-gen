import React, { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { defaultProfile, TileProfile } from './profile';
import { Preview } from './components/Preview';
import { TiledView } from './components/TiledView';
import { ImageBuilding } from './imageBuilding';
import { ColorMapPicker } from './components/ColorMapPicker';
import { NavList, NavOptions } from './components/NavList';
import { generateLinearColorArrays } from './interpolation';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

export const App = () => {
  const [profile, setProfile] = useState<TileProfile>(defaultProfile);
  const [imageBuilding, setImageBuilding] = useState<ImageBuilding>({
    state: 'start',
  });
  const [open, setOpen] = React.useState(false);
  // const [undoHistory, setUndoHistory] = useState<Array<TileProfile>>([]);
  // const [redoHistory, setRedoHistory] = useState<Array<TileProfile>>([]);
  const [navSelected, setNavSelected] = useState<NavOptions>('axis');

  // Calculate an image when the profile changes.
  useEffect(() => {
    const { width, height } = profile.size;
    let imageData = new ImageData(width, height);
    const { data } = imageData;
    const { r, g, b, a } = generateLinearColorArrays(profile);
    const { shades } = profile.colorMap;
    for (let x = 0; x < width; x++) {
      const xAng = (x / width) * 2 * Math.PI;
      for (let y = 0; y < height; y++) {
        const yAng = (y / height) * 2 * Math.PI;
        const z = Math.floor(
          ((Math.cos(xAng) ** 2 + Math.sin(yAng) ** 2) / 2) * (shades - 1)
        );
        let index = (x + y * width) * 4;
        data[index] = r[z];
        data[index + 1] = g[z];
        data[index + 2] = b[z];
        data[index + 3] = a[z];
      }
    }
    setImageBuilding({ state: 'done', image: imageData });
  }, [profile]);

  const toggleDrawer = () => setOpen(!open);
  const onNavSelected = (nav: NavOptions) => {
    setNavSelected(nav);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        {/* AppBar */}
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Tile Generator
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Nav Drawer */}
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <NavList
            navSelected={navSelected}
            onNavSelected={onNavSelected}
            profile={profile}
          />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <Toolbar />
          <Container
            maxWidth="lg"
            sx={{ mt: 4, mb: 4, ml: 0, mr: 0, pl: 0, pr: 0 }}
          >
            {navSelected === 'tiled' ? (
              <TiledView
                profile={profile}
                setProfile={setProfile}
                imageBuilding={imageBuilding}
              />
            ) : (
              <Stack spacing={2}>
                <Preview profile={profile} imageBuilding={imageBuilding} />
                {navSelected === 'axis' ? <Typography>Axis</Typography> : ''}
                {navSelected === 'pattern' ? (
                  <Typography>Pattern</Typography>
                ) : (
                  <></>
                )}
                {navSelected === 'normalization' ? (
                  <Typography>Normalization</Typography>
                ) : (
                  <></>
                )}
                {navSelected === 'colorMap' ? (
                  <ColorMapPicker
                    colorMap={profile.colorMap}
                    onColorMapChange={(colorMap) =>
                      setProfile({
                        ...profile,
                        colorMap,
                      })
                    }
                  />
                ) : (
                  <></>
                )}
              </Stack>
            )}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
