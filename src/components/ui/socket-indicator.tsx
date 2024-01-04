"use client";

import { useSocket } from "@/components/providers/socket-provider";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  return <>{isConnected ? <p>Connected</p> : <p>Not Connected</p>}</>;
};
