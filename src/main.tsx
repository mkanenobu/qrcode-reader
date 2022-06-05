import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { GeistProvider, CssBaseline } from "@geist-ui/core";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <GeistProvider>
      <CssBaseline />
      <App />
    </GeistProvider>
  </React.StrictMode>
);
