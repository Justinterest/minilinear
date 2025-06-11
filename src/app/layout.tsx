import type { Metadata } from "next";
import "./globals.css";
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "MiniLinear",
  description: "使用 Supabase 的 Linear 克隆应用",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <MantineProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
