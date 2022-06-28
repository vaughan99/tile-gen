// import React from 'react';
// import { SketchPicker } from 'react-color';
// import { GradientPicker } from 'react-linear-gradient-picker';
// import 'react-linear-gradient-picker/dist/index.css';
// import { PaletteControlPoint } from '../profile';

// interface PickerPaletteStop {
//   color: string;
//   opacity: number;
//   offset: number;
// }

// const controlPointsToPickerPalette = (points: PaletteControlPoint[]) => points.map(pt => ({
//   color: `#${pt.rgbColor.r.toString(16).padStart(2, '0')}${pt.rgbColor.g.toString(16).padStart(2, '0')}${pt.rgbColor.b.toString(16).padStart(2, '0')}`,
//   opacity: pt.rgbColor.a || 1,
//   offset: pt.offset,
// }));

// const rgbToRgba = (rgb: string, a = 1) => {
//   console.log(`rgb=${JSON.stringify(rgb)}, a=${a}`);
//   const rgba = rgb
// 	.replace('rgb(', 'rgba(')
// 	.replace(')', `,${a})`);
//   console.log(`rgba = ${JSON.stringify(rgba)}`);
//   return rgba;
// };

// // TODO parse hex to rgb
// const pickerPaletteToControlPoints = (stops: PickerPaletteStop[]) => stops.map(stop => ({
//   rgbColor: {
//     r: parseInt(stop.color.substring(1, 2), 16),
//     g: parseInt(stop.color.substring(3, 2), 16),
//     b: parseInt(stop.color.substring(5, 2), 16),
//     a: stop.opacity,
//   },
//   offset: stop.offset,
// }));

// export interface ColorMapPickerProps {
//   palette: PaletteControlPoint[];
//   onPaletteChange: (newPalette: PaletteControlPoint[]) => void;
// }

// type WrapperPropTypes = {
// 	onSelect?: (c: string, a: number) => void;
//   color?: string;
//   opacity?: number;
// };

// // The instance provided is cloned and used to generate new instances, being provided
// // a new onSelect, color, and opacity each time.
// const WrappedSketchPicker: React.FC<WrapperPropTypes> = ({ onSelect, color, opacity = 1, ...rest }) => {
//   const resolvedOnSelect = 
//     onSelect ?
//     onSelect : 
//     (_rgb:string, _a:number ) => { console.error('onSelect should be overridden')};
//   const resolvedRgba = (color !== undefined && opacity !== undefined) ? rgbToRgba(color, opacity) : undefined;
//   console.log(`resolvedColor = ${resolvedRgba}`);
// 	return (
// 		<SketchPicker {...rest}
//       color={resolvedRgba}
//       onChange={c => {
//         console.log(`onChange ${JSON.stringify(c)}`);
//         const { hex, rgb } = c;
//         const { a } = rgb;
//         resolvedOnSelect(hex, a || 1);
//       }}
//     />
// 	);
// }

// export const ColorMapPicker: React.FC<ColorMapPickerProps> = (props: ColorMapPickerProps): JSX.Element => {
//   // Convert RGBColor to rgb strings + opacity to match the interface.
//   // Remove beginning and ending palette controlpoints if they match the inner next stop.
//   // This declutters the stops on the color picker.
//   const revisedPalette = controlPointsToPickerPalette(props.palette);
//   if (
//     revisedPalette.length > 2 &&
//     revisedPalette[0].offset === 0 &&
//     revisedPalette[1].offset !== 1 &&
//     revisedPalette[0].color === revisedPalette[1].color
//   ) {
//     revisedPalette.shift();
//   }
//   const lastIdx = revisedPalette.length - 1;
//   if (
//     revisedPalette.length > 2 &&
//     revisedPalette[lastIdx].offset === 1 &&
//     revisedPalette[lastIdx-1].offset !== 0 &&
//     revisedPalette[lastIdx].color === revisedPalette[lastIdx-1].color
//   ) {
//     revisedPalette.pop();
//   }
//   console.log(`revisedPalette = ${JSON.stringify(revisedPalette)}`);

//   // We need to add back in start and end color stops if
//   // the user slid them towards the middle, and convert them back to
//   // the form that the profile will use.
//   const localOnPaletteChange = (palette: any) => {
//     console.log(`localOnPaletteChange: ${JSON.stringify(palette)}`);
//     const newPalette = pickerPaletteToControlPoints(palette);
//     props.onPaletteChange(newPalette);
//   };

//   return (
//     <GradientPicker
//       width={320}
//       paletteHeight={62}
//       palette={revisedPalette}
//       onPaletteChange={localOnPaletteChange}
//       maxStops={8}
//     >
//       <WrappedSketchPicker />
//     </GradientPicker>
//   );
// };

export {};