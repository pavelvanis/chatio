import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SocketProvider } from "@/components/providers/socket-provider";
import SessionProvider from "@/components/providers/session-provider";
import { ServerProvider } from "@/components/providers/server-provider";
import connectDB from "@/lib/mongo";

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
      <SocketProvider>
        <SessionProvider>
          <ServerProvider>
            <body className={inter.className}>{children}</body>
          </ServerProvider>
        </SessionProvider>
      </SocketProvider>
    </html>
  );
}
