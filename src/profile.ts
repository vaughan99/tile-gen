export interface ColorMapWaypoint {
  r: number; // 0 - 255
  g: number; // 0 - 255
  b: number; // 0 - 255
  distance: number; // 0 -> 1
}

export interface ControlPoint {
  value: number;
  distance: number; // 0 -> 1
}

export interface AxisInterpolation {
  type: "linear" | "spline" | "bezier" | "trigonometric";
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
  scaling: "linear" | "logE" | "log10";
  distribution: "even" | "gaussian" | "inverseGaussian";
  bounding?: Bounding;
}

export interface Size {
  height: number;
  width: number;
}

export interface TileProfile {
  name: string;
  size: Size;
  colorMap: ColorMapWaypoint[];
  xAxis: AxisInterpolation;
  yAxis: AxisInterpolation;
  pattern: Pattern;
  normalization: Normalization;
  // antiAlias: 1 | 4 | 9 | 16;
}

export const defaultProfile: TileProfile = {
  name: "default",
  size: {
    height: 500,
    width: 500,
  },
  colorMap: [
    { r: 0, g: 0, b: 0, distance: 0 },
    { r: 255, g: 255, b: 255, distance: 1 },
  ],
  xAxis: {
    type: "linear",
    controlPoints: [
      { distance: 0, value: 0 },
      { distance: 1, value: 0 },
    ],
  },
  yAxis: {
    type: "linear",
    controlPoints: [
      { distance: 0, value: 0 },
      { distance: 1, value: 0 },
    ],
  },
  pattern: {
    function: "return 0;",
  },
  normalization: {
    scaling: "linear",
    distribution: "even",
  },
};
