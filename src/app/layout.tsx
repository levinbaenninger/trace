import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { Providers } from "@/providers/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trace",
  description: "Trace",
};

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
