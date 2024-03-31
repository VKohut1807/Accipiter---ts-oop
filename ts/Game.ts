export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  skybg: HTMLImageElement;
  positionBg: number;
  speedBg: number;

  constructor(positionBg = 0, speedBg = 1) {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = this.canvas.getContext("2d");
    if (!context) {
      throw new Error("2D Context is not supported!");
    }
    this.ctx = context;
    this.skybg = new Image();
    this.skybg.src = "img/background.jpg";
    this.skybg.onload = () => {
      this.init();
    };
    this.positionBg = positionBg;
    this.speedBg = speedBg;
  }

  init(): void {
    this.startAnimation();
  }

  update(): void {}

  render(): void {
    this.backgroundRun();
  }

  backgroundRun(): void {
    this.ctx.drawImage(
      this.skybg,
      0,
      this.positionBg,
      this.canvas.width,
      this.canvas.height
    );
    this.ctx.drawImage(
      this.skybg,
      0,
      this.positionBg - this.canvas.height,
      this.canvas.width,
      this.canvas.height
    );
    this.positionBg += this.speedBg;
    if (this.positionBg >= this.canvas.height) {
      this.positionBg = 0;
    }
  }

  startAnimation(): void {
    const animate = () => {
      this.update();
      this.render();
      this.requestAnimationFrameForAll(animate);
    };
    animate();
  }

  requestAnimationFrameForAll(callback: FrameRequestCallback): void {
    window.requestAnimationFrame(callback);
  }
}
