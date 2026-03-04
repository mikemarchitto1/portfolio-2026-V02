import "./runtime-debug";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/hooks/use-theme";
import ErrorBoundary from "./error-boundary";
import SidebarLayout from "@/components/sidebar-layout/sidebar-layout";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mike Marchitto Design",
  description: "Portfolio website for Mike Marchitto",
  openGraph: {
    title: "Mike Marchitto Design",
    description: "Portfolio website for Mike Marchitto",
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
    <html lang="en" suppressHydrationWarning className={`${plusJakartaSans.variable} ${geistMono.variable}`}>
      <body className={`${plusJakartaSans.className} font-sans antialiased bg-background`}>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <ThemeProvider>
          <ErrorBoundary>
            <SidebarLayout>{children}</SidebarLayout>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
