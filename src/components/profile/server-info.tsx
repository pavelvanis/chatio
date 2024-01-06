"use client";
import React from "react";
import ServerActions from "./server-actions";
import { useServer } from "../providers/server-provider";
import { SocketIndicator } from "../socket-indicator";

const ServerInfo = () => {
  const { server } = useServer();
  if (server)
    return (
      <div className="grow flex p-1.5 px-2">
        <div className="grow flex">
          <h4 className="m-0 font-semibold me-3">{server?.name}</h4>
          <SocketIndicator />
        </div>
      </div>
    );
};

export default ServerInfo;
