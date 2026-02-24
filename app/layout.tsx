import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Michael Marchitto Portfolio",
  description: "Portfolio website for Michael Marchitto",
  openGraph: {
    title: "Michael Marchitto Portfolio",
    description: "Portfolio website for Michael Marchitto",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased bg-[oklch(95%_0_0)]`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
