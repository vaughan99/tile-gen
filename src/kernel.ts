import { GPU } from 'gpu.js';
import { TileProfile } from './profile';

// PATTERN CREATION
// Create a pattern "kernel" for the GPU that will
// produce a 2-D array of raw values that will be normalized to a color map eventually.
// const gpu = new GPU({
//     mode: 'webgl2' // contrast with 'cpu'
//     //mode: 'cpu'
// });

// export const createPatternKernel = (gpu: GPU, profile: TileProfile) =>
//   gpu.createKernel(
//     new Function(
//       'xAxis',
//       'yAxis',
//       profile.pattern.function
//     )
//   );

//   (function(xAxis, yAxis) {
//     const x = xAxis[this.thread.x];
//     const y = yAxis[this.thread.y];
//     const twoPi = this.constants.twoPi
//     let val1 = 0;
//     let val2 = 0;
//     for (let it = 0; it < this.constants.iterations; it++) {
//         val1 = Math.sin(x + val1 * twoPi) + Math.cos(y + val2 * twoPi);
// val2 = Math.cos(x + val1 * twoPi) + Math.sin(y + val2 * twoPi);
//     }
//     return val1;

// }, {
//     constants: {
//         iterations: 2,
//         twoPi: 2 * Math.PI
//     },
//     output: [width, height]
// });
// let timerStart = Date.now();
// const rawValues = patternKernel(xAxis, yAxis);
// let timerEnd = Date.now();
// console.log('pattern generation time elapsed: ' + (timerEnd - timerStart) + ' ms');

// CREATING THE COLOR MAP
// Define your color map. This color map has 200 steps and goes from red -> blue.
// Again, just using linear interpolation, this time between two color endpoints.
// In a UI, provide a widget to travel through various color waypoints.
// const colorMapSize = 200;
// const colorMap = [];
// const colorStart = [0.8, 0, 0.1]; // RGB 0->1
// const colorEnd = [0.1, 0, 0.8];   // RGB 0->1
// for (let it = 0; it < colorMapSize; it++) {
//     const dist = it / colorMapSize;
//     colorMap[it] = [
//         linearInterpolate(colorStart[0], colorEnd[0], dist),
//         linearInterpolate(colorStart[1], colorEnd[1], dist),
//         linearInterpolate(colorStart[2], colorEnd[2], dist)
//     ];
// }

// NORMALIZING THE RAW VALUES
// Find highest and lowest raw values.
// We need these to normalize the domain of all raw values to our color map.
// If this could be done in a kernel, then we wouldn't have to take the
// results of the pattern function out of the GPU, which would save time.
// timerStart = Date.now();
// let lowestRaw = Number.MAX_VALUE;
// let highestRaw = Number.MIN_VALUE;
// for (let xIdx = 0; xIdx < width; xIdx++) {
//     for (let yIdx = 0; yIdx < height; yIdx++) {
//         let rawVal = rawValues[xIdx][yIdx];
//         if (rawVal < lowestRaw) {
//             lowestRaw = rawVal;
//         }
//         if (rawVal > highestRaw) {
//             highestRaw = rawVal;
//         }
//     }
// }
// let colorScale = (highestRaw - lowestRaw) / colorMapSize;
// timerEnd = Date.now();
// console.log('color normalization time elapsed: ' + (timerEnd - timerStart) + ' ms');

// // MAPPING
// export const createPlotKernel = gpu.createKernel(function(rawValues, colorMap) {
//     const rawVal = rawValues[this.thread.x][this.thread.y];
//     const colorIdx = Math.floor((rawVal - this.constants.lowestRaw) / this.constants.colorScale);
//     this.color(
//         colorMap[colorIdx][0],
//         colorMap[colorIdx][1],
//         colorMap[colorIdx][2]
//     );
// }, {
//     constants: {
//         lowestRaw: lowestRaw,
//         colorScale: colorScale
//     },
//     output: [width, height],
//     graphical: true
// });

// timerStart = Date.now();
// plotKernel(rawValues, colorMap);
// timerEnd = Date.now();
// console.log('plot time elapsed: ' + (timerEnd - timerStart) + ' ms');
// const canvas = plotKernel.canvas;
// document.getElementsByTagName('body')[0].appendChild(canvas);
