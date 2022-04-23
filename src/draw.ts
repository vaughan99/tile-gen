import { TileProfile } from "./profile";

export type TileDrawState = "empty" | "working" | "done" | "error";

export const drawTilesEmpty = (
  canvas: HTMLCanvasElement,
  profile: TileProfile
): void => {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    console.log("drawTilesEmpty");
    ctx.fillStyle = "#cccccc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
};

export const drawTiles = (
  canvas: HTMLCanvasElement,
  profile: TileProfile
): void => {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    console.log("drawTile");
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
};

export const drawTilesError = (
  canvas: HTMLCanvasElement,
  profile: TileProfile
): void => {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    console.log("drawError");
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
};

export const drawTilesWorking = (
  canvas: HTMLCanvasElement,
  profile: TileProfile
): void => {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    console.log("drawWorking");
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
};
