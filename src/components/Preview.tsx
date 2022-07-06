import {
  Box,
  CircularProgress,
  Container,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useRef } from 'react';
import { ImageBuilding } from '../imageBuilding';
import { TileProfile } from '../profile';
import { options, setOptions } from '../options';

export interface PreviewProps {
  profile: TileProfile;
  imageBuilding: ImageBuilding;
}

const canvasWidth = 600;
const canvasHeight = 300;

// TODO: Have checkered background to bleed through alpha.
export const Preview = (props: PreviewProps) => {
  const { imageBuilding, profile } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current !== null && imageBuilding.image !== undefined) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx !== null) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const { image } = imageBuilding;
        const effect = async () => {
          const bitmap = await createImageBitmap(image);
          const scaleX = bitmap.width / canvasWidth;
          const scaleY = bitmap.height / canvasHeight;
          const scale = scaleX >= scaleY ? scaleX : scaleY;
          ctx.drawImage(
            bitmap,
            0,
            0,
            bitmap.width,
            bitmap.height,
            0,
            0,
            Math.floor(bitmap.width / scale),
            Math.floor(bitmap.height / scale)
          );
        };
        effect();
      }
    }
  }, [imageBuilding, canvasRef]);

  return (
    <Container>
      <Stack direction="row">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            border: '1px dashed lightgrey',
            height: canvasHeight,
            width: canvasWidth,
            alignItems: 'center',
          }}
        >
          {imageBuilding.image ? (
            <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
          ) : (
            <CircularProgress
              aria-busy
              sx={{ height: canvasHeight, width: canvasWidth }}
            />
          )}
        </Box>
        <Stack direction="column">
          <Stack direction="row">
            <Typography>Width: </Typography>
            <Slider
              min={20}
              max={500}
              step={1}
              value={profile.size.width}
              onChange={() => {}}
              valueLabelDisplay="on"
              sx={{
                width: 200,
              }}
            />
          </Stack>
          <Stack direction="row">
            <Typography>Height: </Typography>
            <Slider
              min={20}
              max={500}
              step={1}
              value={profile.size.height}
              onChange={() => {}}
              valueLabelDisplay="on"
              sx={{
                width: 200,
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
