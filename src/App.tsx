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

// import { ColorMapPicker } from './components/ColorMapPicker';
// import { TileProfile, defaultProfile, PaletteControlPoint } from './profile';
// import {
//   TileDrawState,
//   drawTilesEmpty,
//   drawTiles,
//   drawTilesWorking,
// } from './draw';
// import { createPerformanceChartData, performanceOptions } from './performance';

// const DRAW_TIMEOUT = 2500;

// const App = () => {
//   const [profile, setProfile] = useState<TileProfile>(defaultProfile);
//   const [drawState, setDrawState] = useState<TileDrawState>("empty");
//   const [performance, setPerformance] = useState(
//     createPerformanceChartData(0, 0, 0)
//   );
//   const [drawTimer, setDrawTimer] = useState<number>();

//   const updateProfile = <T extends keyof TileProfile>(
//     property: T,
//     value: TileProfile[T]
//   ): void => {
//     setProfile({ ...profile, [property]: value });
//     if (drawTimer) {
//       clearTimeout(drawTimer);
//     }
//     setDrawState("working");
//     setDrawTimer(
//       setTimeout(() => {
//         // generate the tile

//         // afterwards, set done and draw the tile
//         setTimeout(() => {
//           setDrawState("done");
//         }, DRAW_TIMEOUT);
//       }, DRAW_TIMEOUT) as unknown as number
//     );
//   };

//   const onFootprintResize = (
//     e: React.SyntheticEvent<Element, Event>,
//     data: ResizeCallbackData
//   ) => {
//     updateProfile("size", { height: Math.round(data.size.height), width: Math.round(data.size.width) });
//   };

//   const onPaletteChange = (palette: PaletteControlPoint[]) => {
//     console.log(`App onPaletteChange ${JSON.stringify(palette)}`);
//     setProfile({ ...profile, colorMap: palette});
//   };

//   // Use this to draw the tiles canvas when things change.
//   React.useEffect(() => {
//     if (tileCanvasRef.current) {
//       if (drawState === "empty") {
//         drawTilesEmpty(tileCanvasRef.current, profile);
//       } else if (drawState === "working") {
//         setPerformance(createPerformanceChartData(0, 0, 0));
//         drawTilesWorking(tileCanvasRef.current, profile);
//       } else if (drawState === "done") {
//         setPerformance(createPerformanceChartData(1, 45, 10));
//         drawTiles(tileCanvasRef.current, profile);
//       }
//     }
//   }, [profile, tileCanvasRef, drawState]);

//   // Use this to cause changes to Undo/Redo buttons
//   // React.useEffect(() => {
//   // }, [undoHistory, redoHistory]);

//   return (
//     <div className="App" style={{ height: "100%", width: "100%" }}>
//       <div
//         className="flex flex-column"
//         style={{ height: "100%", width: "100%" }}
//       >
//         <div className="flex-row">
//           <Toolbar className="flex-grow-1" />
//         </div>
//         <div className="flex flex-grow-1 flex-row">
//           <Splitter className="flex-grow-1">
//             <SplitterPanel>
//               <TabView>
//                 <TabPanel header="Color Map">
//                   <div style={{ height: 300, width: "100%"}}>
//                     <ColorMapPicker palette={profile.colorMap} onPaletteChange={onPaletteChange}/>
//                   </div>
//                 </TabPanel>
//                 <TabPanel header="Axis">Axis Metadata</TabPanel>
//                 <TabPanel header="Pattern">Pattern Text</TabPanel>
//                 <TabPanel header="Normalization">
//                   Normalization Metadata
//                 </TabPanel>
//               </TabView>
//             </SplitterPanel>
//             <SplitterPanel className="flex flex-column">
//               <div
//                 style={{ position: "relative" }}
//                 className="flex-grow-1"
//                 ref={canvasParentRef}
//               >
//                 <canvas
//                   ref={tileCanvasRef}
//                   className="absolute top-0 left-0 z-0"
//                   width={0}
//                   height={0}
//                 />
//                 <Resizable
//                   height={profile.size.height}
//                   width={profile.size.width}
//                   lockAspectRatio={lockAspectRatio}
//                   className="absolute top-0 left-0 z-1"
//                   handleSize={[10, 10]}
//                   minConstraints={[20, 20]}
//                   maxConstraints={[800, 800]}
//                   onResize={onFootprintResize}
//                 >
//                   <div
//                     hidden={!showFootprint}
//                     style={{
//                       height: profile.size.height,
//                       width: profile.size.width,
//                       backgroundColor: "rgba(127, 127, 127, 0.2)",
//                       verticalAlign: "center",
//                     }}
//                   >
//                     {profile.size.width} x {profile.size.height}
//                   </div>
//                 </Resizable>
//               </div>
//               <div style={{ height: "45px" }}>
//                 <ToggleButton
//                   style={{
//                     height: "25px",
//                     width: "225px",
//                     margin: "10px",
//                     padding: "10px",
//                   }}
//                   checked={showFootprint}
//                   onIcon="pi pi-th-large"
//                   onLabel={`Footprint (${profile.size.width} x ${profile.size.height})`}
//                   offIcon="pi pi-table"
//                   offLabel={`Footprint (${profile.size.width} x ${profile.size.height})`}
//                   onChange={(e) => setShowFootprint(e.value)}
//                 />
//                 <ToggleButton
//                   style={{
//                     height: "25px",
//                     width: "150px",
//                     margin: "10px",
//                     padding: "10px",
//                   }}
//                   disabled={!showFootprint}
//                   checked={lockAspectRatio}
//                   onIcon="pi pi-lock"
//                   onLabel="Aspect Ratio"
//                   offLabel="Aspect Ratio"
//                   offIcon="pi pi-lock-open"
//                   onChange={(e) => setLockAspectRatio(e.value)}
//                 />
//               </div>
//             </SplitterPanel>
//           </Splitter>
//         </div>
//         <div className="flex flex-none flex-row">
//           <Chart
//             className="flex-grow-1"
//             type="bar"
//             style={{ height: "80px" }}
//             data={performance}
//             options={performanceOptions}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

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
  const [open, setOpen] = React.useState(true);
  // const [undoHistory, setUndoHistory] = useState<Array<TileProfile>>([]);
  // const [redoHistory, setRedoHistory] = useState<Array<TileProfile>>([]);
  const [showFullscreen, setShowFullscreen] = useState<boolean>(false);

  // Calculate an image when the profile changes.
  useEffect(() => {
    setImageBuilding({ state: 'axis' });
    setTimeout(() => {
      setImageBuilding({ state: 'pattern' });
    }, 100);
    setTimeout(() => {
      setImageBuilding({ state: 'normalizing' });
    }, 500);
    setTimeout(() => {
      setImageBuilding({ state: 'colorizing' });
    }, 1000);
    setTimeout(async () => {
      const { size } = profile;
      let radius = size.width <= size.height ? size.width / 2 : size.height / 2;
      let imageData = new ImageData(size.width, size.height);
      const { data } = imageData;
      const [red, green, blue, alpha] = [255, 0, 0, 200];
      for (let x = -radius; x < radius; x++) {
        for (let y = -radius; y < radius; y++) {
          let distance = Math.sqrt(x * x + y * y);
          if (distance > radius) {
            // skip all (x,y) coordinates that are outside of the circle
            continue;
          }
          // Figure out the starting index of this pixel in the image data array.
          let adjustedX = x + radius; // convert x from [-50, 50] to [0, 100] (the coordinates of the image data array)
          let adjustedY = y + radius; // convert y from [-50, 50] to [0, 100] (the coordinates of the image data array)
          let index = (adjustedX + adjustedY * size.width) * 4;
          data[index] = red;
          data[index + 1] = green;
          data[index + 2] = blue;
          data[index + 3] = alpha;
        }
      }
      setImageBuilding({ state: 'done', image: imageData });
    }, 1500);
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
                ></Paper>
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
