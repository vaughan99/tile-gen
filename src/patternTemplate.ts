
export const axisPreamble = `
const x = xAxis[this.thread.x];
const y = yAxis[this.thread.y];
`;

export const simpleTrigonometric = axisPreamble + `
return Math.sin(x) + Math.cos(y) + Math.tan(x + y);
`;

export const recursive = axisPreamble + `
let z = 0;
for (let it = 0; it < 2; it++) {
  z = z*z + x*y + x + y;
}
return z;
`;

export const recursiveEscape = axisPreamble + `
let z = 0;
let escape = 10;
let maxIt = 255;
for (let it = 0; it < maxIt && z < escape; it++) {
  z = z*z + x*y + x + y;
}
return it;
`;
