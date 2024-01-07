"use client";

import React from "react";

import { format } from "date-fns";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";

import { useServer } from "../providers/server-provider";

import { IMessage } from "@/models/message";
import { IUser } from "@/models/user";

import ChatWelcome from "./chat-welcome";
import ChatItem from "./chat-item";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

interface ChatMassegesProps {
  apiUrl: string;
  socketUrl: string;
}

type MessageWithUser = IMessage & { userId: IUser };

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
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.items.map((message: MessageWithUser) => (
              <ChatItem
                key={message.id}
                id={message.id?.toString() as string}
                user={message.userId}
                timestamp={format(new Date(message.timestamp), DATE_FORMAT)}
                content={message.content}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChatMasseges;
