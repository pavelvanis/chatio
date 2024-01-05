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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connectDB();
  return (
    <html lang="en">
      <SocketProvider>
        <SessionProvider>
          <body className={inter.className}>{children}</body>
        </SessionProvider>
      </SocketProvider>
    </html>
  );
}
