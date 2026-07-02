import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://strglobalmarketing.com"),
  title: {
    default: "STG Marketing LLC — Marketing Strategy, Built to Perform",
    template: "%s · STG Marketing LLC",
  },
  description:
    "STG Marketing LLC helps clients build and implement high-performance marketing strategies across the Asia Pacific, Middle Eastern and African regions — backed by 20+ years of C-Level experience in regulated industries.",
  keywords: [
    "STG Marketing",
    "marketing strategy",
    "client relationship management",
    "business referral",
    "regulated industries",
    "Asia Pacific",
    "Middle East",
    "Africa",
  ],
  icons: {
    icon: [
      { url: "/brand/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/brand/icon-180.png",
  },
  openGraph: {
    title: "STG Marketing LLC — Marketing Strategy, Built to Perform",
    description:
      "We help clients build and implement marketing strategies that achieve coordinated activities and control.",
    type: "website",
    images: ["/brand/stg-lockup.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-navy text-offwhite">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
