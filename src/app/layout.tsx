import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Bar } from "@/components/";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatIo",
  description: "Realtime chat app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Bar />
        <main>{children}</main>
      </body>
    </html>
  );
}
