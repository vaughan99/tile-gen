import { ControlPoint } from "./profile";

export const linear = (a: number, b: number, dist: number) =>
  a + (b - a) * dist;

const errorCheck = (length: number, controlPoints: Array<ControlPoint>) => {
  if (length < 0) throw new Error("length must be positive");
  if (controlPoints.length < 2)
    throw new Error("must be at least two control points");
  if (controlPoints[0].distance !== 0)
    throw new Error("first control point distance must be 0");
  if (controlPoints[controlPoints.length - 1].distance !== 1)
    throw new Error("last control point distance must be 1");
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
    if (overallDist > w2.distance) {
      w1 = w2;
      w2 = controlPointQueue.shift() as ControlPoint;
    }
    const relDist = (overallDist - w1.distance) / (w2.distance - w1.distance);
    values[it] = linear(w1.value, w2.value, relDist);
  }

  return values;
};

export const generateCubicSplineArray = (
  length: number,
  controlPoints: Array<ControlPoint>
): Array<number> => {
  errorCheck(length, controlPoints);
  throw new Error("unimplemented");
};

export const generateBezierArray = (
  length: number,
  controlPoints: Array<ControlPoint>
): Array<number> => {
  throw new Error("unimplemented");
};

export const generateTrigonometricArray = (length: number): Array<number> =>
  generateLinearArray(length, [
    { distance: 0, value: 0 },
    { distance: 1, value: 2 * Math.PI },
  ]);
