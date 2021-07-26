export const initQrCodeDetector = (): any => {
  if ("BarcodeDetector" in window) {
    // create new detector
    // @ts-expect-error
    return new BarcodeDetector({
      formats: ["qr_code"],
    });
  }
};
