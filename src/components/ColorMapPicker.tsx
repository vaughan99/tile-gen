import {
  Card,
  CardContent,
  CardHeader,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { ChromePicker, SketchPicker } from 'react-color';
import { GradientPicker } from 'react-linear-gradient-picker';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import 'react-linear-gradient-picker/dist/index.css';
import { ColorMap, PaletteControlPoint } from '../profile';

export interface ColorMapPickerProps {
  colorMap: ColorMap;
  onColorMapChange: (newColorMap: ColorMap) => void;
}

type WrapperPropTypes = {
  onSelect?: (c: string, a: number) => void;
  color: string;
  opacity: number;
};

const rgbToRgba = (rgb: string, a = 1) =>
  rgb.replace('rgb(', 'rgba(').replace(')', `, ${a})`);

// The instance provided is cloned and used to generate new instances, being provided
// a new onSelect, color, and opacity each time.
const WrappedColorPicker: React.FC<WrapperPropTypes> = ({
  onSelect,
  ...rest
}) => {
  return (
    <ChromePicker
      {...rest}
      color={rgbToRgba(rest.color, rest.opacity)}
      onChange={(c) => {
        const { r, g, b, a } = c.rgb;
        onSelect && onSelect(`rgb(${r}, ${g}, ${b})`, a || 1);
      }}
    />
  );
};

export const ColorMapPicker: React.FC<ColorMapPickerProps> = (
  props: ColorMapPickerProps
): JSX.Element => {
  const { colorMap, onColorMapChange } = props;
  const [open, setOpen] = useState(false);

  const onShadesChange = (_evt: any, newShades: number | number[]) => {
    onColorMapChange({
      ...colorMap,
      shades: newShades as number,
    });
  };

  const onPaletteChange = (newPalette: PaletteControlPoint[]) => {
    const revisedPalette = newPalette.map((pcp) => ({
      ...pcp,
      offset: pcp.offset < 0 ? 0 : parseFloat(pcp.offset as unknown as string),
    }));
    onColorMapChange({
      ...colorMap,
      palette: revisedPalette,
    });
  };

  return (
    <Card variant="outlined">
      <CardHeader
        sx={{ alignItems: 'center' }}
        title={
          <Stack direction="row" alignContent="center" spacing={1}>
            <ColorLensIcon />
            <Typography>Color Map</Typography>
          </Stack>
        }
      />
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <Typography>Shades:</Typography>
            <Typography>{colorMap.shades}</Typography>
            <Slider
              min={5}
              max={200}
              step={1}
              value={colorMap.shades}
              onChange={onShadesChange}
              sx={{
                width: 600,
              }}
            />
          </Stack>
          <GradientPicker
            open={open}
            setOpen={setOpen}
            width={600}
            paletteHeight={60}
            palette={props.colorMap.palette}
            onPaletteChange={onPaletteChange}
            maxStops={8}
          >
            <WrappedColorPicker color={'rgb(0,0,0)'} opacity={1} />
          </GradientPicker>
        </Stack>
      </CardContent>
    </Card>
  );
};

export {};
