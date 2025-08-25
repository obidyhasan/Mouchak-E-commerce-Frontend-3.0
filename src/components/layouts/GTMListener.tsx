/* eslint-disable @typescript-eslint/no-explicit-any */
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
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "pageview",
      page_title: document.title,
      page_location: window.location.href,
      page_path: location.pathname + location.search,
    });
  }, [location]);

  return null;
};

export default GTMListener;
