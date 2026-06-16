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
    "ARC Prize Foundation is a nonprofit organization advancing open-source artificial general intelligence research through benchmarks and prizes.",
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
