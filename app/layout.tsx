import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

const description =
  "Parity tests every tradeline you furnish and traces each error to the rule, release, or edge case that produced it.";

export const metadata: Metadata = {
  title: "Parity: Metro 2 accuracy testing and root cause analysis",
  description,
  openGraph: { title: "Parity", description, type: "website" },
  // Preview builds ask search engines to stay away. Remove NEXT_PUBLIC_NOINDEX at launch.
  robots: process.env.NEXT_PUBLIC_NOINDEX === "true" ? { index: false, follow: false } : undefined,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
