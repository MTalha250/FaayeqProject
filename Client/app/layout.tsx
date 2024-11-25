"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import axios from "axios";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const updateVisitorsCount = async () => {
    try {
      await axios.post("/api/visitorsCount");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    updateVisitorsCount();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
