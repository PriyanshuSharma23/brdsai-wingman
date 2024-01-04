import type { Metadata } from "next";
import NextTopLoader from 'nextjs-toploader';
import { Inter } from "next/font/google";
import "./globals.css";
import "./custom-progress-bar.css";
import { Toaster } from "sonner";
import Provider from "@/components/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brdsai Wingman",
  description: "Standaline audio recording for brdsai",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="Brdsi Wingman" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Brdsai Wingman" />
        <meta name="description" content="" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#035879" />

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.png" />

        <meta name="twitter:card" content="Brdsai Wingman" />
        <meta name="twitter:url" content="https://wingman.brdsai.com" />
        <meta name="twitter:title" content="Brdsai Wingman" />
        <meta name="twitter:description" content="---" />
        <meta name="twitter:image" content="https://wingman.brdsai.com/logo-base.png" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Brdsai Wingman" />
        <meta property="og:description" content="" />
        <meta property="og:site_name" content="Brdsai Wingman" />
        <meta property="og:url" content="https://wingman.brdsai.com" />
        <meta property="og:image" content="https://wingman.brdsai.com/logo-base.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={inter.className}>
        <NextTopLoader color="#035879" showSpinner={false} />
        <Provider>
          {children}
        </Provider>
      </body>
      <Toaster />
    </html>
  );
}
