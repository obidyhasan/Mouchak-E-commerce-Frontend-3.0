/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

/**
 * Push custom event to GTM dataLayer
 */
export function track(event: string, params: Record<string, any> = {}) {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
  }
}

/**
 * Hook: pushes virtual pageviews to GTM on every route change
 */
export function useGtmVirtualPageview() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "virtual_page_view",
        page_path: location.pathname + location.search,
        page_title: document.title || undefined,
      });
    }
  }, [location.pathname, location.search]);
}
