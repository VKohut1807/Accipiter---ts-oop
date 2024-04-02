import {BaseVehicle} from "./BaseVehicle";
import {VehicleTypes} from "./types/vehicle-types";

export class UFO extends BaseVehicle {
  protected img: HTMLImageElement;

  constructor({...args}: VehicleTypes) {
    super({...args});
    this.img = new Image();
    this.img.src = args.imgPath;
    this.size = args.size;
  }

  public async init(): Promise<void> {
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
