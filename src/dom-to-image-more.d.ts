declare module "dom-to-image-more" {
  export interface DomToImageMoreOptions {
    quality?: number;
    bgcolor?: string;
    width?: number;
    height?: number;
    style?: Record<string, string>;
    filter?: (node: Node) => boolean;
    scale?: number;
    cacheBust?: boolean;
  }

  export interface DomToImageMore {
    toPng(
      node: HTMLElement,
      options?: DomToImageMoreOptions,
    ): Promise<string>;
    toJpeg(
      node: HTMLElement,
      options?: DomToImageMoreOptions,
    ): Promise<string>;
    toSvg(
      node: HTMLElement,
      options?: DomToImageMoreOptions,
    ): Promise<string>;
    toBlob(
      node: HTMLElement,
      options?: DomToImageMoreOptions,
    ): Promise<Blob>;
  }

  const domtoimage: DomToImageMore;
  export default domtoimage;
}
