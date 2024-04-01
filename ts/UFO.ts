import {BaseVehicle} from "./BaseVehicle";

export class UFO extends BaseVehicle {
  protected img: HTMLImageElement;

  constructor(
    protected canvas: HTMLCanvasElement,
    protected ctx: CanvasRenderingContext2D,
    private imgPath: string,
    protected x: number,
    protected y: number,
    protected cx: number,
    protected cy: number,
    protected size: number,
    protected exist: number
  ) {
    super(canvas, ctx, imgPath, x, y, cx, cy, size, exist);
    this.img = new Image();
    this.size = size;
  }

  public async init(): Promise<void> {
    this.img.src = this.imgPath;
    await new Promise((resolve) => {
      this.img.onload = resolve;
    });
  }

  public update(): void {
    this.x += this.cx;
    this.y += this.cy;

    if (this.x >= this.canvas.width - this.size / 4 || this.x <= 0 + this.size / 4) {
      this.cx = -this.cx;
    }

    if (this.y >= this.canvas.height - this.size / 4 || this.y <= 0 + this.size / 4) {
      this.cy = -this.cy;
    }
  }

  public render(): void {
    this.ctx.drawImage(
      this.img,
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
  }

  public getSize(): number {
    return this.size;
  }
}
