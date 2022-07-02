import React, { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import FunctionsIcon from '@mui/icons-material/Functions';
import StraightenIcon from '@mui/icons-material/Straighten';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import { Dialog } from '@mui/material';
import { defaultProfile, TileProfile } from './profile';
import { Preview } from './components/Preview';
import { TiledView } from './components/TiledView';
import { ImageBuilding } from './imageBuilding';
import { ColorMapPicker } from './components/ColorMapPicker';
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
  const [showFullscreen, setShowFullscreen] = useState<boolean>(false);

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

  const onFullscreen = () => setShowFullscreen(true);
  const onFullscreenExit = () => setShowFullscreen(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Dialog fullScreen open={showFullscreen} sx={{ overflow: 'hidden' }}>
        <TiledView
          onFullscreenExit={onFullscreenExit}
          profile={profile}
          setProfile={setProfile}
          imageBuilding={imageBuilding}
        />
      </Dialog>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
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
          <List component="nav">
            <React.Fragment>
              <ListItemButton onClick={onFullscreen}>
                <ListItemIcon>
                  <BorderAllIcon />
                </ListItemIcon>
                <ListItemText primary="Tiled View" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <LineAxisIcon />
                </ListItemIcon>
                <ListItemText primary="Axis" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <FunctionsIcon />
                </ListItemIcon>
                <ListItemText primary="Pattern Functions" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <StraightenIcon />
                </ListItemIcon>
                <ListItemText primary="Normalization" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <ColorLensIcon />
                </ListItemIcon>
                <ListItemText primary="Color Map" />
              </ListItemButton>
            </React.Fragment>
          </List>
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
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <ColorMapPicker
                    colorMap={profile.colorMap}
                    onColorMapChange={(colorMap) =>
                      setProfile({
                        ...profile,
                        colorMap,
                      })
                    }
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Preview imageBuilding={imageBuilding} />
              </Grid>
              <Grid item xs={12}>
                <Paper
                  sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
                ></Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
