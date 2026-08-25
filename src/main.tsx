import { StrictMode, useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import SiteLoader from "./components/SiteLoader";
import { preloadSiteImages } from "./utils/preloadAssets";
import "./index.css";

type PreloadStatus = "loading" | "ready" | "error";

function Root() {
  const [status, setStatus] = useState<PreloadStatus>("loading");
  const [progress, setProgress] = useState(0);

  const loadAssets = useCallback(async () => {
    setStatus("loading");

    try {
      await preloadSiteImages(({ percentage }) => setProgress(percentage));
      setProgress(100);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void loadAssets();
  }, [loadAssets]);

  if (status !== "ready") {
    return (
      <SiteLoader
        progress={progress}
        hasError={status === "error"}
        onRetry={() => void loadAssets()}
      />
    );
  }

  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
