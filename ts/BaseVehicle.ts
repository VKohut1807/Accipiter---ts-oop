import {VehicleTypes} from "./types/vehicle-types";
export class BaseVehicle {
  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;
  protected imgPath: HTMLImageElement;
  protected x: number;
  protected y: number;
  protected cx: number;
  protected cy: number;
  protected size: number;
  protected exist: number;

  constructor({...args}: VehicleTypes) {
    this.canvas = args.canvas;
    this.ctx = args.ctx;
    this.imgPath = new Image();
    this.imgPath.src = args.imgPath;
    this.x = args.x;
    this.y = args.y;
    this.cx = args.cx;
    this.cy = args.cy;
    this.size = args.size;
    this.exist = args.exist;
  }

  protected async init(): Promise<void> {
    await new Promise((resolve) => {
      this.imgPath.onload = resolve;
    });
  }
}
