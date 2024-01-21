import type { Metadata } from "next";
import { Averia_Libre, Inter } from "next/font/google";

import { SocketProvider } from "@/components/providers/socket-provider";
import SessionProvider from "@/components/providers/session-provider";
import { ServerProvider } from "@/components/providers/server-provider";
import QueryProvider from "@/components/providers/query-provider";
import { ModalProvider } from "@/components/providers/modal-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const font = Averia_Libre({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

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
            <ModalProvider />
            <QueryProvider>
              <body className={inter.className}>{children}</body>
            </QueryProvider>
          </ServerProvider>
        </SessionProvider>
      </SocketProvider>
    </html>
  );
}
