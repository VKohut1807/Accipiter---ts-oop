import {BackgroundCanvas} from "./BackgroundСanvas";
import {UFO} from "./UFO";
import getRandomNumber from "./helpers/getRandomNumber";
import {VehicleTypes} from "./types/vehicle-types";

export class Game {
  private backgroundCanvas: BackgroundCanvas;
  private ufos: UFO[];

  constructor() {
    this.backgroundCanvas = new BackgroundCanvas();
    this.ufos = [];
  }

  public async init(): Promise<void> {
    await this.backgroundCanvas.init();
    this.addInitialUFO();
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
  private addInitialUFO(): void {
    const ufoParams = this.createUFOParams();
    this.createAndPushUFO(ufoParams);
  }

  private addUFO(): void {
    const ufoParams = this.createUFOParams();
    this.createAndPushUFO(ufoParams);
  }

  private createUFOParams(): VehicleTypes {
    const size = this.ufos.length > 0 ? this.ufos[0].getSize() : 100;
    return {
      canvas: this.backgroundCanvas.canvas,
      ctx: this.backgroundCanvas.ctx,
      imgPath: "img/ufo.png",
      x: getRandomNumber(0 + size / 4, this.backgroundCanvas.canvas.width - size / 4),
      y: 0 + size / 4,
      cx: getRandomNumber(1, 1),
      cy: getRandomNumber(2, 10),
      size: size,
      exist: 0,
    };
  }

  private createAndPushUFO(ufoParams: VehicleTypes): void {
    const newUFO = new UFO(ufoParams);
    this.ufos.push(newUFO);
    newUFO.init();
  }

  private requestAnimationFrameForAll(callback: FrameRequestCallback): void {
    window.requestAnimationFrame(callback);
  }
}
