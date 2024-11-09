import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from './LanguageContext';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Maikodeu",
  description: "Maikodeu is a team that provides website development services for company profiles, personal portfolios, and personal CV websites. For design services, we offer the creation of posters, banners, and product advertisement designs for MSMEs.",
  icons: {
    icon: '/images/logo1.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <LanguageProvider>
        <body>{children}</body>
      </LanguageProvider>
    </html>
  );
}
