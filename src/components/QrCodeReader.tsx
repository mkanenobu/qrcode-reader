import React, { useEffect } from "react";
import { type OnResultFunction, QrReader } from "react-qr-reader";
import isMobile from "ismobilejs";

interface QrCodeReaderProps {
  onResult: OnResultFunction;
}

export const QrCodeReader: React.FC<QrCodeReaderProps> = ({ onResult }) => {
  const mobile = isMobile(window.navigator).any;

  return (
    <QrReader
      onResult={onResult}
      constraints={{
        aspectRatio: mobile ? 1 : 1.6,
        facingMode: mobile ? { exact: "environment" } : "user",
      }}
      containerStyle={{ maxHeight: "80vh" }}
      videoContainerStyle={{ width: "100%", maxHeight: "80vh" }}
      videoStyle={{ width: "100%", maxHeight: "80vh" }}
    />
  );
};
