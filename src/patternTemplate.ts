export const templateFunctions = {
  simple: (props: { pattern: string }) => `
const x = xAxis[this.thread.x];
const y = yAxis[this.thread.y];
${props.pattern}
`,

  recursive: (props: { pattern: string; z: number; iterations: number }) => `
const x = xAxis[this.thread.x];
const y = yAxis[this.thread.y];
let z = ${props.z};
for (let it = 0; it < ${props.iterations}; it++) {
  ${props.pattern}
}
return z;
`,

  recursiveEscape: (props: {
    pattern: string;
    z: number;
    escape: number;
    iterations: number;
  }) => `
const x = xAxis[this.thread.x];
const y = yAxis[this.thread.y];
let z = ${props.z};
for (let it = 0; it < ${props.iterations} && z < ${props.escape}; it++) {
  ${props.pattern}
}
return it;
`,

  recursiveDoubleVariableEscape: (props: {
    pattern: string;
    z: number;
    escape: number;
    iterations: number;
  }) => `
const x0 = xAxis[this.thread.x];
const y0 = yAxis[this.thread.y];
let x = 0;
let y = 0;
let z = ${props.z};
for (let it = 0; it < ${props.iterations} && z < ${props.escape}; it++) {
  ${props.pattern}
}
return it;
`,
};

export const patternTemplates = {
  trigonometric: {
    name: 'Simple Trigonometric',
    axis: {
      x: 'trigonometric',
      y: 'trigonometric',
    },
    template: templateFunctions.simple,
    pattern: 'return Math.sin(x) + Math.sin(y) + Math.cos(x+y);',
  },
  recursivePolynomial: {
    name: 'Recurisve Polynomial',
    axis: {
      x: 'match',
      y: 'match',
    },
    template: templateFunctions.recursive,
    pattern: 'z = z*z + x*y - x - y;',
  },
  mandelbrot: {
    name: 'Mandelbrot',
    axis: {
      x: 'match',
      y: 'match',
    },
    template: templateFunctions.recursiveDoubleVariableEscape,
    pattern: `
let xtemp = x*x - y*y + x0;
y = 2*x*y + y0;
x = xtemp;
z = x*x + y*y;
`,
  },
};
