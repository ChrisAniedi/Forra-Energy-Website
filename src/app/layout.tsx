import type { Metadata } from "next";
import type { ReactNode } from "react";
import { OverlayProvider } from "@/context/OverlayProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/layout.css";
import "@/styles/home.css";
import "@/styles/pages.css";
import "@/styles/overlays.css";
import "@/styles/shop.css";
import "@/styles/responsive.css";

export const metadata: Metadata = {
  title: {
    default: "Forra Energy — Africa's Intelligent Energy Platform",
    template: "%s · Forra Energy",
  },
  description:
    "Design, finance and optimize clean energy. Forra Energy helps Nigerian homes and businesses cut electricity costs, improve reliability and build energy independence.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <OverlayProvider>
          <Navbar />
          {children}
          <Footer />
        </OverlayProvider>
      </body>
    </html>
  );
}
