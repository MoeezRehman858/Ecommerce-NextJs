import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./global.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "MyStore",
  description: "A modern ecommerce store built with Next.js and MongoDB.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body
        className="min-h-screen flex flex-col"
        style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#141b2d",
              color: "#f5f1e8",
              border: "1px solid #26314a",
            },
          }}
        />
      </body>
    </html>
  );
}