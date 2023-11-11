import { useQRCode as useQRCodeLib } from "next-qrcode";

export function useQRCode() {
  const { SVG } = useQRCodeLib();
  return {
    QRCodeSVG: SVG,
  }
}