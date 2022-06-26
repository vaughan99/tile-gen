import React from 'react';
import { Box } from '@mui/material';
import { TileProfile } from '../profile';

export interface PreviewProps {
  profile: TileProfile;
}

export const Preview = (props: PreviewProps) => {
  // const { profile, setProfile } = props;
  const previewCanvasRef = React.useRef<HTMLCanvasElement>(null);

  return(
    <Box>
      <canvas
        style={{ backgroundColor: "purple" }}
        ref={previewCanvasRef}
        width={200}
        height={200}
      />
    </Box>
  );
};
