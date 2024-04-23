import {Game} from "./Game";
import BackgroundCanvas from "./BackgroundCanvas";

const backgroundCanvas = new BackgroundCanvas();

if (backgroundCanvas.ctx instanceof CanvasRenderingContext2D) {
  const gameInstance = new Game();
  gameInstance.init().then(() => {
    gameInstance.startGameLoop();
  });
} else {
  console.error("Unable to obtain 2D rendering context!");
}
