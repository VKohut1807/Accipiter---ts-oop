import {BackgroundCanvas} from "./BackgroundСanvas";
import {UFO} from "./UFO";

export class Game {
  private backgroundCanvas: BackgroundCanvas;
  private ufo: UFO;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.backgroundCanvas = new BackgroundCanvas(canvas, ctx);
    this.ufo = new UFO(canvas, ctx, "img/ufo.png", 100, 100, 1, 1, 100, 0);
  }

  public async init(): Promise<void> {
    await this.backgroundCanvas.init();
    await this.ufo.init();
  }

  private update(): void {
    this.backgroundCanvas.update();
    this.ufo.update();
  }

  private render(): void {
    this.backgroundCanvas.render();
    this.ufo.render();
  }

  public runGameLoop(): void {
    const animate = () => {
      this.update();
      this.render();
      this.requestAnimationFrameForAll(animate);
    };
    animate();
  }

  private requestAnimationFrameForAll(callback: FrameRequestCallback): void {
    window.requestAnimationFrame(callback);
  }
}
