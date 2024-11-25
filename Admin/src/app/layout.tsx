"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import Login from "@/components/login";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <SessionProvider>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <ContentWrapper loading={loading}>{children}</ContentWrapper>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}

function ContentWrapper({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}) {
  const { data } = useSession();
  const user = data?.user;

  if (!user) {
    return <Login />;
  }

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {loading ? <Loader /> : children}
    </div>
  );
}
