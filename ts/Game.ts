import {BackgroundCanvas} from "./BackgroundСanvas";
import {UFO} from "./UFO";
import getRandomNumber from "./helpers";

export class Game {
  private backgroundCanvas: BackgroundCanvas;
  private ufos: UFO[];

  constructor() {
    this.backgroundCanvas = new BackgroundCanvas();
    this.ufos = [];
  }

  public async init(): Promise<void> {
    await this.backgroundCanvas.init();
    this.addUFO();
  }

  private update(): void {
    this.backgroundCanvas.update();
    this.ufos.forEach((ufo) => ufo.update());
  }

  private render(): void {
    this.backgroundCanvas.render();
    this.ufos.forEach((ufo) => ufo.render());
  }

  public runGameLoop(): void {
    const animate = () => {
      this.update();
      this.render();
      this.requestAnimationFrameForAll(animate);
    };
    animate();
    setInterval(() => {
      this.addUFO();
    }, 2000);
  }
  private addUFO(): void {
    const canvas = this.backgroundCanvas.canvas;
    const ctx = this.backgroundCanvas.ctx;
    const imgPath = "img/ufo.png";
    const size = this.ufos.length > 0 ? this.ufos[0].getSize() : 100;
    const x = getRandomNumber(0 + size / 4, canvas.width - size / 4);
    const y = 0 + size / 4;
    const cx = getRandomNumber(1, 1);
    const cy = getRandomNumber(2, 10);
    const exist = 0;
    const newUFO = new UFO(canvas, ctx, imgPath, x, y, cx, cy, size, exist);
    this.ufos.push(newUFO);
    newUFO.init();
  }

  private requestAnimationFrameForAll(callback: FrameRequestCallback): void {
    window.requestAnimationFrame(callback);
  }
}
