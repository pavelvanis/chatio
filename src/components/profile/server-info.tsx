"use client";
import React from "react";
import ServerActions from "./server-actions";
import { useServer } from "../providers/server-provider";

const ServerInfo = () => {
  const { server } = useServer();
  return (
    <div className="grow flex p-1.5 px-2.5">
      <div className="grow">
        <h4 className="m-0 font-semibold">{server?.name}</h4>
      </div>
    </div>
  );
};

export default ServerInfo;
