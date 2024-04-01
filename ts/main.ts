import {Game} from "./Game";

const canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (ctx) {
  const gameInstance = new Game(canvas, ctx);
  gameInstance.init().then(() => {
    gameInstance.runGameLoop();
  });
} else {
  console.error("Unable to obtain 2D rendering context!");
}
