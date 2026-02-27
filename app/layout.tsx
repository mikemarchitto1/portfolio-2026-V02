import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/layout";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
  const themeScript = `
(function() {
  var key = 'theme';
  var stored = localStorage.getItem(key);
  var theme = stored === 'dark' || stored === 'color' || stored === 'light' ? stored : 'light';
  var html = document.documentElement;
  html.classList.remove('light', 'dark', 'color');
  html.classList.add(theme);
})();
`;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${geistMono.variable} font-sans antialiased bg-background`}
      >
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
