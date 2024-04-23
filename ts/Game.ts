import BackgroundCanvas from "./BackgroundCanvas";
import UFO from "./UFO";
import Jet from "./Jet";
import SpriteAnimation from "./SpriteAnimation";
import getRandomNumber from "./helpers/getRandomNumber";
import {VehicleTypes} from "./types/vehicle-types";

export class Game {
  private backgroundCanvas: BackgroundCanvas;
  private ufos: UFO[];
  private jets: Jet[];
  private explosions: SpriteAnimation[] = [];
  private explosionSize: number = 192;
  private isGameOver: boolean = false;
  private animationFrameNumber: number = 0;
  private setAppearanceTimeUFO: number = 1000;
  private setDelayTimeCanvasClear: number = 2000;

  constructor() {
    this.backgroundCanvas = new BackgroundCanvas();
    this.ufos = [];
    this.jets = [];
  }

  public async init(): Promise<void> {
    await this.backgroundCanvas.init();
    this.addInitialJet();
  }

  private update(): void {
    this.backgroundCanvas.update();
    this.ufos.forEach((ufo) => ufo.update());
    this.jets.forEach((ufo) => ufo.update());
    this.handleCollisions();
    if (this.isGameOver) return;
  }

  private render(): void {
    this.backgroundCanvas.render();
    this.ufos.forEach((ufo) => ufo.render());
    this.jets.forEach((ufo) => ufo.render());
    this.renderExplosions();
    if (this.isGameOver) return;
  }

  public startGameLoop(): void {
    this.backgroundCanvas.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));

    const animate = () => {
      this.update();
      this.render();

      this.requestAnimationFrameForAll(animate);
    };
    animate();
    this.addUFOInterval();
  }

  private onMouseMove(event: MouseEvent): void {
    if (this.jets.length <= 0) return;
    this.jets[0].x = event.offsetX - 25;
    this.jets[0].y = event.offsetY - 25;
  }

  private addUFOInterval(): void {
    setInterval(() => {
      if (this.isGameOver) return;
      this.addUFO();
    }, this.setAppearanceTimeUFO);
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

  private addInitialJet(): void {
    const jetParams = this.createJetParams();
    this.createAndPushJet(jetParams);
  }

  private createJetParams(): VehicleTypes {
    const size = this.jets.length > 0 ? this.ufos[0].getSize() : 50;
    return {
      canvas: this.backgroundCanvas.canvas,
      ctx: this.backgroundCanvas.ctx,
      imgPath: "img/plane.png",
      x: size / 2,
      y: size / 2,
      cx: size,
      cy: size,
      size: size,
      exist: 0,
    };
  }

  private createAndPushJet(jetParams: VehicleTypes): void {
    const newJet = new Jet(jetParams);
    this.jets.push(newJet);
    newJet.init();
  }

  private handleCollisions(): void {
    for (let jet of this.jets) {
      for (let ufo of this.ufos) {
        if (this.isColliding(jet, ufo)) {
          const collisionX = (jet.x + ufo.x) / 2 - this.explosionSize / 4;
          const collisionY = (jet.y + ufo.y) / 2 - this.explosionSize / 4;

          this.createExplosion(collisionX, collisionY);
          this.removeJet(jet);
          this.removeUFO(ufo);
        }
      }
    }
  }

  private isColliding(jet: Jet, ufo: UFO): boolean {
    const distanceX = jet.x - ufo.x;
    const distanceY = jet.y - ufo.y;
    const distance = Math.hypot(distanceX, distanceY);
    const minDistance = jet.size / 2 + ufo.size / 4;

    return distance < minDistance;
  }

  private removeJet(jet: Jet): void {
    const index = this.jets.indexOf(jet);
    if (index !== -1) {
      this.jets.splice(index, 1);
      if (this.jets.length <= 0) {
        this.isGameOver = true;
        this.endGame();
      }
    }
  }

  private removeUFO(ufo: UFO): void {
    const index = this.ufos.indexOf(ufo);
    if (index !== -1) {
      this.ufos.splice(index, 1);
    }
  }

  private renderExplosions(): void {
    this.explosions.forEach((explosion) => {
      explosion.renderFrame();
    });
  }

  private createExplosion(x: number, y: number): void {
    const explosion = new SpriteAnimation(
      "img/explosion.png",
      this.explosionSize,
      this.explosionSize,
      5,
      6,
      x,
      y,
      this.explosionSize / 2
    );
    this.explosions.push(explosion);
  }

  private endGame(): void {
    if (!this.isGameOver && this.animationFrameNumber <= 0) return;
    setTimeout(() => {
      window.cancelAnimationFrame(this.animationFrameNumber);
      this.backgroundCanvas.clear();
    }, this.setDelayTimeCanvasClear);
  }

  private requestAnimationFrameForAll(callback: FrameRequestCallback): void {
    this.animationFrameNumber = window.requestAnimationFrame(callback);
  }
}
