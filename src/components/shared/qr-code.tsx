import Image from "next/image";

const QR_API_URL = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";

function getQRCodeUrl(data: string): string {
  return `${QR_API_URL}${encodeURIComponent(data)}`;
}

export function QRCode({ url, size = 150 }: { url: string, size?: number }) {
  return (
    <div className="p-2 border rounded-lg bg-white">
      <Image
        src={getQRCodeUrl(url)}
        alt="QR Code for certificate verification"
        width={size}
        height={size}
      />
    </div>
  );
}

QRCode.getQRCodeUrl = getQRCodeUrl;
