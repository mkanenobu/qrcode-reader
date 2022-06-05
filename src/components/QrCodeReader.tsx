import React from "react";
import { type OnResultFunction, QrReader } from "react-qr-reader";

export const QrCodeReader: React.FC<{ onResult: OnResultFunction }> = ({
  onResult,
}) => {
  return (
    <QrReader
      onResult={onResult}
      constraints={{ aspectRatio: 16 / 12 }}
      containerStyle={{ minWidth: "80%" }}
      videoContainerStyle={{ width: "100%" }}
      videoStyle={{ width: "100%" }}
    />
  );
};
