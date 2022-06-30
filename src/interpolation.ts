import { ControlPoint, PaletteControlPoint } from './profile';

export const linear = (a: number, b: number, dist: number) =>
  a + (b - a) * dist;

const errorCheck = (length: number, controlPoints: Array<ControlPoint>) => {
  if (length < 0) throw new Error('length must be positive');
  if (controlPoints.length < 2)
    throw new Error('must be at least two control points');
  if (controlPoints[0].offset !== 0)
    throw new Error('first control point distance must be 0');
  if (controlPoints[controlPoints.length - 1].offset !== 1)
    throw new Error('last control point distance must be 1');
};

export const generateLinearArray = (
  length: number,
  controlPoints: Array<ControlPoint>
): Array<number> => {
  errorCheck(length, controlPoints);
  const values = new Array(length);
  const controlPointQueue = [...controlPoints];
  let w1: ControlPoint = controlPointQueue.shift() as ControlPoint;
  let w2: ControlPoint = controlPointQueue.shift() as ControlPoint;
  for (let it = 0; it < length; it++) {
    const overallDist = it / length;
    if (overallDist > w2.offset) {
      w1 = w2;
      w2 = controlPointQueue.shift() as ControlPoint;
    }
    const relDist = (overallDist - w1.offset) / (w2.offset - w1.offset);
    values[it] = linear(w1.value, w2.value, relDist);
  }

  return values;
};

export const generateCubicSplineArray = (
  length: number,
  controlPoints: Array<ControlPoint>
): Array<number> => {
  errorCheck(length, controlPoints);
  throw new Error('unimplemented');
};

export const generateBezierArray = (
  length: number,
  controlPoints: Array<ControlPoint>
): Array<number> => {
  throw new Error('unimplemented');
};

export const generateTrigonometricArray = (length: number): Array<number> =>
  generateLinearArray(length, [
    { offset: 0, value: 0 },
    { offset: 1, value: 2 * Math.PI },
  ]);

export const generateLinearColorArrays = (
  length: number,
  palette: PaletteControlPoint[]
) => {
  // Fill in missing PaletteControlPoint at beginning or end.
  const resolvedPalette = [...palette];
  const len = palette.length;
  if (palette[0].offset !== 0) {
    resolvedPalette.unshift({ ...palette[0], offset: 0 });
  }
  if (palette[len - 1].offset !== 1) {
    resolvedPalette.push({ ...palette[len - 1], offset: 1 });
  }

  // Fill the arrays for each color.
  const rgbSplitter = /[(,\s)]+/;
  const r = generateLinearArray(
    length,
    resolvedPalette.map((p) => ({
      offset: p.offset,
      value: parseInt(p.color.split(rgbSplitter)[1]),
    }))
  );
  const g = generateLinearArray(
    length,
    resolvedPalette.map((p) => ({
      offset: p.offset,
      value: parseInt(p.color.split(rgbSplitter)[2]),
    }))
  );
  const b = generateLinearArray(
    length,
    resolvedPalette.map((p) => ({
      offset: p.offset,
      value: parseInt(p.color.split(rgbSplitter)[3]),
    }))
  );
  const a = generateLinearArray(
    length,
    resolvedPalette.map((p) => ({
      offset: p.offset,
      value: (p.opacity || 1) * 255,
    }))
  );

  return { r, g, b, a };
};
