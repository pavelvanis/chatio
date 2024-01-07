"use client";

import { useSocket } from "@/components/providers/socket-provider";
import Badge from "./ui/badge";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  return <>{isConnected ? <Badge variant="success">Connected</Badge> : <Badge variant="warning">Not connected</Badge>}</>;
};
