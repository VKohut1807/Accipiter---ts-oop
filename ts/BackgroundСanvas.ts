export class BackgroundCanvas {
  public canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  private skybg: HTMLImageElement;
  private position: number;
  private speed: number;

  constructor() {
    this.skybg = new Image();
    this.position = 0;
    this.speed = 1;
  }

  public async init(): Promise<void> {
    this.skybg.src = "img/background.jpg";
    await this.skybg.onload;
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
}
