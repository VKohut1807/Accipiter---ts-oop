export class BaseVehicle {
  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;
  protected img: HTMLImageElement;
  protected x: number;
  protected y: number;
  protected cx: number;
  protected cy: number;
  protected size: number;
  protected exist: number;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    imgPath: string,
    x: number,
    y: number,
    cx: number,
    cy: number,
    size: number,
    exist: number = 0
  ) {
    this.canvas = canvas;
    this.ctx = ctx || new Error("2D Context is not supported!");
    this.img = new Image();
    this.img.src = imgPath;
    this.x = x;
    this.y = y;
    this.cx = cx;
    this.cy = cy;
    this.size = size;
    this.exist = exist;
  }

  protected async init(): Promise<void> {
    await new Promise((resolve) => {
      this.img.onload = resolve;
    });
  }
}
