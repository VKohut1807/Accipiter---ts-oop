import BackgroundCanvas from "./BackgroundCanvas";

export default class SpriteAnimation {
  private backgroundCanvas: BackgroundCanvas;
  private image: HTMLImageElement;
  private frameWidth: number;
  private frameHeight: number;
  private numFramesX: number;
  private numFramesY: number;
  private x: number;
  private y: number;
  private explosionSize: number;
  private currentFrameX: number = 0;
  private currentFrameY: number = 0;
  private frameDelay: number = 100;

  constructor(
    imagePath: string,
    frameWidth: number,
    frameHeight: number,
    numFramesX: number,
    numFramesY: number,
    x: number,
    y: number,
    explosionSize: number
  ) {
    this.backgroundCanvas = new BackgroundCanvas();
    this.image = new Image();
    this.image.src = imagePath;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.numFramesX = numFramesX;
    this.numFramesY = numFramesY;
    this.x = x;
    this.y = y;
    this.explosionSize = explosionSize;
  }

  public renderFrame(): void {
    this.backgroundCanvas.ctx.drawImage(
      this.image,
      this.currentFrameX * this.frameWidth,
      this.currentFrameY * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.explosionSize,
      this.explosionSize
    );
    this.currentFrameX++;
    if (this.currentFrameX === this.numFramesX) {
      this.currentFrameX = 0;
      this.currentFrameY++;
    }
  }
}
