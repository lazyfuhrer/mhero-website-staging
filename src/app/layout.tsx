import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "MHERO Saudi Arabia | Premium Hybrid Off-Road SUV by Dongfeng",
  description:
    "Discover MHERO, the luxury hybrid off-road SUV by Dongfeng. 800 HP, military heritage design, advanced 4WD. Available in Saudi Arabia through Al Ghassan Mobility.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ margin: 0, padding: 0, width: '100%', height: '100%', overflowX: 'hidden' }}>
      <body
        className={`${inter.variable} antialiased`}
        style={{ margin: 0, padding: 0, width: '100%', height: '100%', overflowX: 'hidden' }}
      >
        {children}
      </body>
    </html>
  );
}
