export interface PaletteControlPoint {
  offset: number; // 0 -> 1
  color: string; // e.g. 'rgb(0, 0, 0)'
  opacity: number; // 0 -> 1
}

export interface ControlPoint {
  offset: number; // 0 -> 1
  value: number;
}

export interface AxisInterpolation {
  type: 'linear' | 'spline' | 'bezier' | 'trigonometric';
  controlPoints: ControlPoint[];
}

export interface Pattern {
  // style: '';
  // constants: Record<string, number>;
  function: string;
}

export interface Bounding {
  min: number;
  max: number;
  rebound: boolean;
}

export interface Normalization {
  scaling: 'linear' | 'logE' | 'log10';
  distribution: 'even' | 'gaussian' | 'inverseGaussian';
  bounding?: Bounding;
}

export interface Size {
  height: number;
  width: number;
}

export interface TileProfile {
  name: string;
  size: Size;
  colorMap: PaletteControlPoint[];
  xAxis: AxisInterpolation;
  yAxis: AxisInterpolation;
  pattern: Pattern;
  normalization: Normalization;
  // antiAlias: 1 | 4 | 9 | 16;
}

export const defaultProfile: TileProfile = {
  name: 'default',
  size: {
    height: 500,
    width: 500,
  },
  colorMap: [
    { offset: 0, color: 'rgb(0,0,0,1)', opacity: 1 },
    { offset: 1, color: 'rgb(255,255,255)', opacity: 1 },
  ],
  xAxis: {
    type: 'linear',
    controlPoints: [
      { offset: 0, value: 0 },
      { offset: 1, value: 0 },
    ],
  },
  yAxis: {
    type: 'linear',
    controlPoints: [
      { offset: 0, value: 0 },
      { offset: 1, value: 0 },
    ],
  },
  pattern: {
    function: 'return 0;',
  },
  normalization: {
    scaling: 'linear',
    distribution: 'even',
  },
};
