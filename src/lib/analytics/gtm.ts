// src\lib\analytics\gtm.ts
//this file send the events from the website to GTM
export type GtmEventValue = {
  [key: string]: string | number | boolean | null | undefined;
};

export type GtmEvent = {
  event: string;
  element_name: string;
  event_value?: GtmEventValue;
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
