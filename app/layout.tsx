import type { Metadata, Viewport } from "next";
import NextTopLoader from "nextjs-toploader";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import "./custom-progress-bar.css";
import { Toaster } from "sonner";
import Provider from "@/components/provider";

const poppins = Poppins({
  weight: ["100", "200", "300", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const inter = Inter({
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brdsai Wingman",
  description: "Standaline audio recording for brdsai",
};

export const viewport: Viewport = {
  maximumScale: 1.0,
  initialScale: 1.0,
  width: "device-width",
  userScalable: false,
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

        <link rel="apple-touch-icon" href="/icons/apple-icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/icons/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/icons/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/icons/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/icons/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/icons/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/icons/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/icons/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icons/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/icons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/icons/ms-icon-144x144.png"
        ></meta>
        <meta name="twitter:card" content="Brdsai Wingman" />
        <meta name="twitter:url" content="https://wingman.brdsai.com" />
        <meta name="twitter:title" content="Brdsai Wingman" />
        <meta name="twitter:description" content="---" />
        <meta
          name="twitter:image"
          content="https://wingman.brdsai.com/logo-base.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Brdsai Wingman" />
        <meta property="og:description" content="" />
        <meta property="og:site_name" content="Brdsai Wingman" />
        <meta property="og:url" content="https://wingman.brdsai.com" />
        <meta
          property="og:image"
          content="https://wingman.brdsai.com/logo-base.png"
        />
      </head>
      <body className={inter.className}>
        <NextTopLoader color="#035879" showSpinner={false} />
        <Provider>{children}</Provider>
      </body>
      <Toaster />
    </html>
  );
}
