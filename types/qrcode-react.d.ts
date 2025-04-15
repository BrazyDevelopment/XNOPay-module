declare module 'qrcode.react' {
    import { FC } from 'react';
  
    export interface QRCodeSVGProps {
      value: string;
      size?: number;
      bgColor?: string;
      fgColor?: string;
      level?: 'L' | 'M' | 'Q' | 'H';
      includeMargin?: boolean;
      renderAs?: 'svg' | 'canvas';
      className?: string;
    }
  
    export const QRCodeSVG: FC<QRCodeSVGProps>;
    export const QRCodeCanvas: FC<QRCodeSVGProps>;
  }