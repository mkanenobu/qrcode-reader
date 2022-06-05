import React, { useState } from "react";
import { Button, Spacer, Text } from "@geist-ui/core";
import styles from "./App.module.scss";
import Linkify from "react-linkify";
import { QrCodeReader } from "./components/QrCodeReader";

export const App: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [halt, setHalt] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Text>QRCode Reader</Text>
        <QrCodeReader
          onResult={(result, error) => {
            if (!!result && !halt) {
              setData(result.getText());
              setHalt(true);
            }
          }}
        />
        <Button
          onClick={() => {
            setData(null);
            setHalt(false);
          }}
        >
          Clear
        </Button>

        <Linkify>{data}</Linkify>

        <Spacer />

        <div>
          <Text className={styles.clearMarginP}>&copy;2021 mkanenobu</Text>
          <Text className={styles.clearMarginP}>
            QRコードはデンソーウェーブの登録商標です
          </Text>
          <div id="build-id" style={{ display: "none" }} aria-hidden>
            {/* @ts-ignore, defined in vite.config.js */}
            {__BUILD_ID}
          </div>
        </div>
      </div>
    </div>
  );
};
