"use client";
import { useQRCode } from "libs/common-qrcode";

interface QRCodeProps {
  value: string;
}
export function QRCode({ value }: QRCodeProps) {
  const { QRCodeSVG } = useQRCode();

  return (
    <div className="aspect-square w-full">
      <QRCodeSVG text={value} options={{
        margin: 1.5,
      }} />
    </div>
  );
}