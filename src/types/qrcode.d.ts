declare module 'qrcode' {
    export function toDataURL(
      text: string,
      options?: any
    ): Promise<string>;
  
    export function toString(
      text: string,
      options?: any
    ): Promise<string>;
  
    export interface QRCodeErrorCorrectionLevel {
      L: 'L';
      M: 'M';
      Q: 'Q';
      H: 'H';
    }
  }
  