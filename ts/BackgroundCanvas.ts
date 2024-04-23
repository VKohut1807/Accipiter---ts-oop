export default class BackgroundCanvas {
  public canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  private skybg: HTMLImageElement = new Image();
  private position: number = 0;
  private speed: number = 1;

  constructor() {}

  public async init(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.skybg.onload = () => {
        resolve();
      };
      this.skybg.src = "img/background.jpg";
    });
  }

  public update(): void {
    this.position += this.speed;
    if (this.position >= this.canvas.height) {
      this.position = 0;
    }
  }

  public render(): void {
    this.ctx.drawImage(this.skybg, 0, this.position, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(
      this.skybg,
      0,
      this.position - this.canvas.height,
      this.canvas.width,
      this.canvas.height
    );
  }

  public clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
