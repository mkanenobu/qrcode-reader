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
  const [error, setError] = useState<{ message: string } | null>(null);

  const qrCodeDetector = useMemo(() => {
    try {
      return getQrCodeDetector();
    } catch (_e) {
      setError({ message: "This browser is not support to Barcode" });
    }
  }, []);

  const initVideoStream = useCallback(
    (video: HTMLVideoElement): void => {
      if (!qrCodeDetector || error) {
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
            setError(null);
            console.log("Video stream is initialized");
          } else {
            console.log("Video stream is undefined");
            setError({ message: "Camera is not available" });
          }
        })
        .catch((e) => {
          console.error(e);
          setError({ message: "Camera is not available" });
        });
    },
    [setError, qrCodeDetector, error]
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
          {error ? (
            <p>{error.message}</p>
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
