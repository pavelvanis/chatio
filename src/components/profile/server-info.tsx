"use client";
import React from "react";
import ServerActions from "./server-actions";
import { useServer } from "../providers/server-provider";
import { SocketIndicator } from "../socket-indicator";

const ServerInfo = () => {
  const { server } = useServer();
  if (server)
    return (
      <div className="flex-1 flex items-center p-1.5 px-4">
        <div className="flex-1 flex  items-center">
          <div className="flex flex-1 items-center">
            <h4 className="m-0 font-semibold me-3">{server?.name}</h4>
            <SocketIndicator />
          </div>
          <ServerActions />
        </div>
      </div>
    );
};

export default ServerInfo;
