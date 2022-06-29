import { useState, useRef, useEffect } from 'react';
import { AppBar, Box, CircularProgress, FormControlLabel, FormGroup, IconButton, Switch, Toolbar, Typography } from '@mui/material';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { Resizable } from 'react-resizable';
import { PreviewProps } from './Preview';
import { TileProfile } from '../profile';

export interface TiledViewProps extends PreviewProps {
  profile: TileProfile;
  setProfile: (profile: TileProfile) => void;
  onFullscreenExit: () => void;
}

// TODO: Save settings in local storage.
export const TiledView = (props: TiledViewProps) => {
  const { profile, setProfile, onFullscreenExit, imageBuilding } = props;
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);
  const [showFootprint, setShowFootprint] = useState<boolean>(false);
  const [tileWidth, setTileWidth] = useState<number>(profile.size.width);
  const [tileHeight, setTileHeight] = useState<number>(profile.size.height);
  // const [redrawTimer, setRedrawTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [snap, setSnap] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onFootprintResize = (_evt: any, { size }: any) => {
    // if (redrawTimer !== null) {
    //   clearTimeout(redrawTimer);
    //   setRedrawTimer(null);
    // }
    if (snap) {
      size.width = Math.round(size.width / 5) * 5;
      size.height = Math.round(size.height / 5) * 5;
    } else {
      size.width = Math.round(size.width);
      size.height = Math.round(size.height);
    }
    setTileWidth(size.width);
    setTileHeight(size.height);
  }

  const onFootprintResizeStop = (evt: any, { size }: any) => {
    onFootprintResize(evt, { size });
    setProfile({...profile, size});
  };


  useEffect(() => {
    if ((canvasRef.current !== null) && (imageBuilding.image !== undefined)) {
      const canvas = canvasRef.current;
      const ctx = canvasRef.current.getContext("2d");
      if (ctx !== null) {
        const { image } = imageBuilding;
        const effect = async () => {
          const bitmap = await createImageBitmap(image);
          // ctx?.putImageData(imageBuilding.image, 0, 0);
          const pattern = ctx.createPattern(bitmap, 'repeat');
          if (pattern !== null) {
            ctx.fillStyle = pattern;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
        };
        effect();
      }
    };
  }, [imageBuilding, canvasRef]);

  return(
    <div style={{ overflow: 'hidden'}}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onFullscreenExit}
            aria-label="close"
          >
            <CloseFullscreenIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Preview and Sizer ({tileWidth} x {tileHeight})
          </Typography>

          <FormGroup aria-label="position" row>
            <FormControlLabel
              control={<Switch onChange={(_evt, checked) => setShowFootprint(checked)} color="secondary" />}
              disabled={!imageBuilding.image}
              checked={showFootprint}
              label="Show Footprint"
              labelPlacement="end"
            />
            <FormControlLabel
              control={<Switch onChange={(_evt, checked) => setLockAspectRatio(checked)} color="secondary" />}
              disabled={!imageBuilding.image || !showFootprint}
              checked={lockAspectRatio}
              label="Lock Aspect Ratio"
              labelPlacement="end"
            />
            <FormControlLabel
              control={<Switch onChange={(_evt, checked) => setSnap(checked)} color="secondary" />}
              disabled={!imageBuilding.image || !showFootprint}
              checked={snap}
              label="Snap to 5px"
              labelPlacement="end"
            />
          </FormGroup>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        overflow="hidden"
      >
      {
        imageBuilding.image
        ?
          <>
            <canvas
              style={{ backgroundColor: "#f0f0f0", position: "relative", zIndex: 2000 }}
              ref={canvasRef}
              width={2500}
              height={2500}
            />
            <Resizable
              height={tileHeight}
              width={tileWidth}
              lockAspectRatio={lockAspectRatio}
              handleSize={[10, 10]}
              minConstraints={[20, 20]}
              maxConstraints={[500, 500]}
              onResize={onFootprintResize}
              onResizeStop={onFootprintResizeStop}
            >
              <div
                hidden={!showFootprint}
                style={{
                  height: tileHeight,
                  width: tileWidth,
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  zIndex: 2001,
                  position: 'absolute',
                }}
              />
            </Resizable>
          </>
        :
          <CircularProgress aria-busy size={100} thickness={6} />
      }
      </Box>
    </div>
  );
};
