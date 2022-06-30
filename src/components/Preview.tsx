import { Box, CircularProgress } from '@mui/material';
import { useEffect, useRef } from 'react';
import { ImageBuilding } from '../imageBuilding';

export interface PreviewProps {
  imageBuilding: ImageBuilding;
}

const canvasWidth = 200;
const canvasHeight = 200;

export const Preview = (props: PreviewProps) => {
  const { imageBuilding } = props;
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
  );
};
