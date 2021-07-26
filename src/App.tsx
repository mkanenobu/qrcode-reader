import React, { useState, useEffect } from "react";
import styles from "./App.module.scss";
import { getMedia } from "./helpers/get-media";

function App() {
  const [mediaStream, setMediaStream] = useState<MediaStream | undefined>(
    undefined
  );

  useEffect(() => {
    getMedia({ audio: true }).then(setMediaStream);
  }, []);

  useEffect(() => {
    if (mediaStream?.active) {
      console.log(mediaStream.getVideoTracks().map((s) => s.getSettings()));
    }
  }, [mediaStream]);

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <button
          onClick={() => {
            const streamTracks = mediaStream?.getTracks();
            console.log(streamTracks);
            console.log(streamTracks?.[0].getCapabilities());
          }}
        >
          echo stream
        </button>
      </header>
    </div>
  );
}

export default App;
