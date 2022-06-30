import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { GradientPicker } from 'react-linear-gradient-picker';
import 'react-linear-gradient-picker/dist/index.css';
import { PaletteControlPoint } from '../profile';

export interface ColorMapPickerProps {
  palette: PaletteControlPoint[];
  onPaletteChange: (newPalette: PaletteControlPoint[]) => void;
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
    <SketchPicker
      {...rest}
      color={rgbToRgba(rest.color, rest.opacity)}
      onChange={(c) => {
        const { r, g, b, a } = c.rgb;
        console.log(`a ${JSON.stringify(a)}`);
        onSelect && onSelect(`rgb(${r}, ${g}, ${b})`, a || 1);
      }}
    />
  );
};

export const ColorMapPicker: React.FC<ColorMapPickerProps> = (
  props: ColorMapPickerProps
): JSX.Element => {
  const [open, setOpen] = useState(false);
  return (
    <GradientPicker
      open={open}
      setOpen={setOpen}
      width={600}
      paletteHeight={60}
      palette={props.palette}
      onPaletteChange={props.onPaletteChange}
      maxStops={8}
    >
      <WrappedColorPicker color={'rgb(0,0,0)'} opacity={1} />
    </GradientPicker>
  );
};

export {};
