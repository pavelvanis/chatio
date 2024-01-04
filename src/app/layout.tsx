import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SocketProvider } from "@/components/providers/socket-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatIo",
  description: "Realtime chat app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SocketProvider>
          <body className={inter.className}>{children}</body>
      </SocketProvider>
    </html>
  );
}
