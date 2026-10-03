// src/app/layout.tsx

import { CardClickTracker } from "@/components/analytics/card-click-tracker";
import { PageExitTracker } from "@/components/analytics/page-exit-tracker";
import { PageLoadTracker } from "@/components/analytics/page-load-tracker";
import { siteConfig } from "@/lib/config/site";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: siteConfig.branding.favicon,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />

        <link
          rel="stylesheet"
          id="silktide-consent-manager-css"
          href="https://cdn.jsdelivr.net/gh/silktide/consent-manager@v2.0.1/silktide-consent-manager.css"
          crossOrigin="anonymous"
        />

        <Script
          id="google-consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];

              function gtag() {
                dataLayer.push(arguments);
              }

              gtag('consent', 'default', {
                analytics_storage:
                  localStorage.getItem('stcm.consent.analytics') === 'true'
                    ? 'granted'
                    : 'denied',

                ad_storage:
                  localStorage.getItem('stcm.consent.marketing') === 'true'
                    ? 'granted'
                    : 'denied',

                ad_user_data:
                  localStorage.getItem('stcm.consent.marketing') === 'true'
                    ? 'granted'
                    : 'denied',

                ad_personalization:
                  localStorage.getItem('stcm.consent.marketing') === 'true'
                    ? 'granted'
                    : 'denied',

                functionality_storage:
                  localStorage.getItem('stcm.consent.essential') === 'true'
                    ? 'granted'
                    : 'denied',

                security_storage:
                  localStorage.getItem('stcm.consent.essential') === 'true'
                    ? 'granted'
                    : 'denied'
              });
            `,
          }}
        />

        <Script
          id="silktide-consent-manager-script"
          src="https://cdn.jsdelivr.net/gh/silktide/consent-manager@v2.0.1/silktide-consent-manager.js"
          strategy="beforeInteractive"
          crossOrigin="anonymous"
        />
      </head>

      <body>
        {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}

        <PageLoadTracker />
        <CardClickTracker />
        <PageExitTracker />

        {children}
      </body>
    </html>
  );
}
