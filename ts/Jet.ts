import BaseVehicle from "./BaseVehicle";
import {VehicleTypes} from "./types/vehicle-types";

export default class Jet extends BaseVehicle {
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

  public update(): void {}

  public render(): void {
    this.ctx.drawImage(
      this.imgPath,
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
