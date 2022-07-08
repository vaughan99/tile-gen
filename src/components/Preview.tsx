import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { useEffect, useRef, useState } from 'react';
import { ImageBuilding } from '../imageBuilding';
import { Size, TileProfile } from '../profile';
import { options, setOptions } from '../options';
import { backgroundCheckboardCanvas } from '../checkboard';

export interface PreviewProps {
  profile: TileProfile;
  setProfile: (profile: TileProfile) => void;
  imageBuilding: ImageBuilding;
}

const canvasWidth = 250;
const canvasHeight = 250;

// TODO: Have checkered background to bleed through alpha.
export const Preview = (props: PreviewProps) => {
  const { imageBuilding, profile, setProfile } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState<Size>(profile.size);

  useEffect(() => {
    if (canvasRef.current !== null && imageBuilding.image !== undefined) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx !== null) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (backgroundCheckboardCanvas !== null) {
          const pattern = ctx.createPattern(
            backgroundCheckboardCanvas,
            'repeat'
          );
          if (pattern !== null) {
            ctx.fillStyle = pattern;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
          }
        }
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

  const onSizeCommitted = () => {
    setProfile({ ...profile, size });
  };

  return (
    <Card variant="outlined">
      <CardHeader
        title={
          <Stack direction="row" alignContent="center" spacing={1}>
            <ImageIcon />
            <Typography>
              Preview ({size.width} x {size.height})
            </Typography>
          </Stack>
        }
      />
      <CardContent>
        <Stack>
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
                <canvas
                  ref={canvasRef}
                  width={canvasWidth}
                  height={canvasHeight}
                  style={{
                    position: 'relative',
                    backgroundColor: 'rgba(0,0,0,0)',
                    zIndex: 2000,
                  }}
                />
              ) : (
                <CircularProgress
                  aria-busy
                  sx={{ height: canvasHeight, width: canvasWidth }}
                />
              )}
            </Box>
            <Slider
              orientation="vertical"
              min={20}
              max={500}
              step={1}
              value={size.height}
              onChange={(_evt, val) =>
                setSize({ ...size, height: val as number })
              }
              onChangeCommitted={onSizeCommitted}
              sx={{
                height: canvasHeight,
              }}
            />
          </Stack>
          <Slider
            min={20}
            max={500}
            step={1}
            value={size.width}
            onChange={(_evt, val) => setSize({ ...size, width: val as number })}
            onChangeCommitted={onSizeCommitted}
            sx={{
              width: canvasWidth,
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};
