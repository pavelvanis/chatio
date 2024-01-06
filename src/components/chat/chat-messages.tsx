"use client";
import React from "react";
import ChatWelcome from "./chat-welcome";
import { useServer } from "../providers/server-provider";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";

interface ChatMassegesProps {
  apiUrl: string;
  socketUrl: string;
}

const ChatMasseges: React.FC<ChatMassegesProps> = ({ apiUrl, socketUrl }) => {
  const { server } = useServer();
  const queryKey = `chat:${server?.id}`;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey: "serverId",
      paramValue: server?.id,
    });

  if (status === "loading") {
    return (
      <div className="grow flex flex-col justify-center items-center">
        <Loader2 className="w-7 h-7 text-zinc-500 animate-spin my-4" />
        <p className=" text-zinc-500 m-0 text-sm">Loading messages...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="grow flex flex-col justify-center items-center">
        <ServerCrash className="w-7 h-7 text-zinc-500 my-4" />
        <p className=" text-zinc-500 m-0 text-sm">Something went wrong!</p>
      </div>
    );
  }

  return (
    <div className="grow flex flex-col overflow-y-auto pb-4 p-2">
      <div className="grow" />
      <ChatWelcome name={server?.name} />
    </div>
  );
};

export default ChatMasseges;
