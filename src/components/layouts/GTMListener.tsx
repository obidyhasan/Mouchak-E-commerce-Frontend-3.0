import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

const GTMListener = () => {
  const location = useLocation();

  useEffect(() => {
    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    window.dataLayer.push({
      event: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  return null; // nothing to render
};

export default GTMListener;
