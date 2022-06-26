import { useState, useRef } from 'react';
import { AppBar, FormControlLabel, FormGroup, IconButton, Switch, Toolbar, Typography } from '@mui/material';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { Resizable } from 'react-resizable';
import { PreviewProps } from './Preview';
import { TileProfile } from '../profile';

export interface PreviewFullsizeProps extends PreviewProps {
  setProfile: (profile: TileProfile) => void;
  onFullscreenExit: () => void;
}

export const PreviewFullsize = (props: PreviewFullsizeProps) => {
  const { profile, setProfile, onFullscreenExit } = props;
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);
  const [showFootprint, setShowFootprint] = useState<boolean>(false);
  const [snap, setSnap] = useState<boolean>(true);
  const fullscreenCanvasRef = useRef<HTMLCanvasElement>(null);

  const onFootprintResize = (_evt: any, { size }: any) => {
    if (snap) {
      size.width = Math.round(size.width / 5) * 5;
      size.height = Math.round(size.height / 5) * 5;
    } else {
      size.width = Math.round(size.width);
      size.height = Math.round(size.height);
    }
    setProfile({...profile, size});
  }

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
            Tile Preview ({profile.size.width} x {profile.size.height})
          </Typography>

          <FormGroup aria-label="position" row>
            <FormControlLabel
              control={<Switch onChange={(_evt, checked) => setShowFootprint(checked)} color="secondary" />}
              checked={showFootprint}
              label="Show Footprint"
              labelPlacement="end"
            />
            <FormControlLabel
              control={<Switch onChange={(_evt, checked) => setLockAspectRatio(checked)} color="secondary" />}
              disabled={!showFootprint}
              checked={lockAspectRatio}
              label="Lock Aspect Ratio"
              labelPlacement="end"
            />
            <FormControlLabel
              control={<Switch onChange={(_evt, checked) => setSnap(checked)} color="secondary" />}
              disabled={!showFootprint}
              checked={snap}
              label="Snap to 5px"
              labelPlacement="end"
            />
          </FormGroup>
        </Toolbar>
      </AppBar>
      <canvas
        style={{ backgroundColor: "#f0f0f0", position: "absolute", zIndex: 2000 }}
        ref={fullscreenCanvasRef}
        width={2500}
        height={2500}
      />
      <Resizable
        height={profile.size.height}
        width={profile.size.width}
        lockAspectRatio={lockAspectRatio}
        handleSize={[10, 10]}
        minConstraints={[20, 20]}
        maxConstraints={[500, 500]}
        onResize={onFootprintResize}
      >
        <div
          hidden={!showFootprint}
          style={{
            height: profile.size.height,
            width: profile.size.width,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            verticalAlign: 'center',
            zIndex: 2001,
          }}
        />
      </Resizable>
    </div>
  );
};
