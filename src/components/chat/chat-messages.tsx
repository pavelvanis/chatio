"use client";
import React from "react";
import ChatWelcome from "./chat-welcome";
import { useServer } from "../providers/server-provider";

const ChatMasseges = () => {
  const { server } = useServer();
  return (
    <div className="grow flex flex-col overflow-y-auto pb-4 p-2">
      <div className="grow" />
      <ChatWelcome name={server?.name} />
    </div>
  );
};

export default ChatMasseges;
