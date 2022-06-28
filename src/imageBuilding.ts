
export interface ImageBuilding {
  state: 'start' | 'axis' | 'pattern' | 'normalizing' | 'colorizing' | 'done';
  image?: ImageData;
}
