import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import styles from "./App.module.scss";
import { getMedia } from "./helpers/get-media";
import { getQrCodeDetector } from "./helpers/barcode-reader";
import useInterval from "use-interval";
import Linkify from "react-linkify";
import isMobile from "ismobilejs";

export const App = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [barcodeApiUnAvailableError, setBarcodeApiUnAvailableError] =
    useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);

  const qrCodeDetector = useMemo(() => {
    try {
      return getQrCodeDetector();
    } catch (_e) {
      setBarcodeApiUnAvailableError(true);
    }
  }, []);

  const initVideoStream = useCallback(
    (video: HTMLVideoElement): void => {
      if (!qrCodeDetector || barcodeApiUnAvailableError) {
        return;
      }

      console.log("Initialize video stream");

      const mobile = isMobile(window.navigator);

      // NOTE: use rear camera on mobile or tablet
      getMedia({
        video:
          mobile.phone || mobile.tablet
            ? { facingMode: { exact: "environment" } }
            : true,
      })
        .then((stream) => {
          console.log(stream);
          if (stream) {
            video.srcObject = stream;
            video.play();
            setVideoError(false);
            console.log("Video stream is initialized");
          } else {
            console.log("Video stream is undefined");
            setVideoError(true);
          }
        })
        .catch((e) => {
          console.error(e);
          setVideoError(true);
        });
    },
    [setBarcodeApiUnAvailableError, qrCodeDetector, barcodeApiUnAvailableError]
  );

  useEffect(() => {
    if (videoRef.current) {
      initVideoStream(videoRef.current);
    }
  }, [videoRef, initVideoStream]);

  const [detected, setDetected] = useState<unknown | null>(null);

  const detect = useCallback((video: HTMLVideoElement) => {
    qrCodeDetector
      ?.detect(video)
      .then((res: Array<unknown>) => {
        if (res.length >= 1) {
          setDetected(res[0]);
          console.log("detected", res);
        }
      })
      .catch(() => {
        // Do Nothing
      });
  }, []);

  useInterval(() => {
    if (!detected && videoRef.current) {
      detect(videoRef.current);
    }
  }, 100);

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <main className={styles.main}>
          <p>QRCode Reader</p>
          {barcodeApiUnAvailableError ? (
            <p>This browser is not support to BarcodeDetector API.</p>
          ) : videoError ? (
            <p>Camera is not available.</p>
          ) : (
            <>
              <video ref={videoRef} className={styles.video} />
              <button
                className={styles.clearButton}
                onClick={() => {
                  setDetected(null);
                }}
              >
                Clear
              </button>

              {detected &&
                typeof detected === "object" &&
                "rawValue" in detected && (
                  // @ts-expect-error
                  <Linkify>{detected.rawValue}</Linkify>
                )}
            </>
          )}
        </main>

        <footer className={styles.footer}>
          <p className={styles.clearMarginP}>&copy;2021 mkanenobu</p>
          <p className={styles.clearMarginP}>
            QRコードはデンソーウェーブの登録商標です
          </p>
        </footer>
      </div>
    </div>
  );
};
