import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import styles from "./App.module.scss";
import { getMedia } from "./helpers/get-media";
import { initQrCodeDetector } from "./helpers/barcode-reader";
import useInterval from "use-interval";
import Linkify from "react-linkify";

export const App = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);

  const qrCodeDetector = useMemo(() => {
    const detector = initQrCodeDetector();
    if (!detector) {
      setError({ message: "This browser is not support to Barcode" });
    }
    return detector;
  }, []);

  const initCameraStream = useCallback((video: HTMLVideoElement) => {
    getMedia({ video: { facingMode: { exact: "environment" } } })
      .then((stream) => {
        console.log(stream);
        if (stream) {
          video.srcObject = stream;
          video.play();
          setError(null);
        }
      })
      .catch((e) => {
        console.error(e);
        setError({ message: "No camera permission" });
      });
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      initCameraStream(videoRef.current);
    }
  }, [videoRef]);

  const [detected, setDetected] = useState<unknown | null>(null);

  const detect = useCallback((video: HTMLVideoElement) => {
    qrCodeDetector
      .detect(video)
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
          {error && <p>{error.message}</p>}
          <video ref={videoRef} className={styles.video} />
          <button
            className={styles.clearButton}
            onClick={() => {
              setDetected(null);
            }}
          >
            Clear
          </button>

          {detected && typeof detected === "object" && "rawValue" in detected && (
            // @ts-expect-error
            <Linkify>{detected.rawValue}</Linkify>
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
