/**
 * Get BarcodeDetector instance
 *
 * @throws Error
 */
export const getQrCodeDetector = (): Record<string, any> | undefined => {
  if ("BarcodeDetector" in window) {
    // create new detector
    // @ts-expect-error
    return new BarcodeDetector({
      formats: ["qr_code"],
    });
  } else {
    throw new Error("BarcodeDetector api is not available");
  }
};
