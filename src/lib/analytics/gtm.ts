// src\lib\analytics\gtm.ts
//this file send the events from the website to GTM
export type GtmEvent = {
  event: string;
  [key: string]: string | number | boolean | null | undefined;
};

declare global {
  interface Window {
    dataLayer?: GtmEvent[];
  }
}

export function pushToDataLayer(eventData: GtmEvent) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);
}
