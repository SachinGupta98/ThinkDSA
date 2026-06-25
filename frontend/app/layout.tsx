import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ThinkDSA — AI-Powered DSA Pattern Recognition for BTech CS Students",
  description:
    "Stop memorizing solutions. Start recognizing patterns. ThinkDSA's AI coach trains your brain to think like a senior engineer. Paste any DSA problem and get a full thinking breakdown.",
  keywords: [
    "DSA",
    "LeetCode",
    "pattern recognition",
    "AI coding",
    "BTech",
    "CS students",
    "algorithm",
    "data structures",
  ],
  openGraph: {
    title: "ThinkDSA — AI-Powered DSA Pattern Recognition",
    description:
      "Train your brain to recognize DSA patterns like a pro. AI-powered coaching for BTech CS students.",
    type: "website",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ThinkDSA",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
};

import { UserProvider } from "@/context/UserContext";
import PwaRegistry from "@/components/PwaRegistry";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
      >
        <UserProvider>
          {children}
        </UserProvider>
        <PwaRegistry />
      </body>
    </html>
  );
}
