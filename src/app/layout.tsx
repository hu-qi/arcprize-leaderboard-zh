import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ARC Prize",
  description:
    "ARC Prize 基金会是一家非营利组织，致力于通过基准测试和奖项推进开源通用人工智能研究。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${spaceMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-mono">
        {children}
      </body>
    </html>
  );
}
