"use client";

import React, { useRef } from "react";

import { format } from "date-fns";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";

import { useServer } from "../providers/server-provider";

import { IMessage } from "@/models/message";
import { IUser } from "@/models/user";

import ChatWelcome from "./chat-welcome";
import ChatItem from "./chat-item";
import { useChatSocket } from "@/hooks/use-socket";
import { useChatScroll } from "@/hooks/use-chat-scroll";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

interface ChatMassegesProps {
  apiUrl: string;
  socketUrl: string;
}

type MessageWithUser = IMessage & { userId: IUser };

const ChatMasseges: React.FC<ChatMassegesProps> = ({ apiUrl, socketUrl }) => {
  const { server } = useServer();

  const queryKey = `chat:${server?.id}`;
  const addKey = `chat:${server?.id}:messages`;
  const updateKey = `chat:${server?.id}:message:update`;

  const chatRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey: "serverId",
      paramValue: server?.id,
    });

  useChatSocket({ queryKey, updateKey, addKey });
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0].items.length ?? 0,
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
      <div className="flex-1 flex flex-col justify-center items-center">
        <ServerCrash className="w-7 h-7 text-zinc-500 my-4" />
        <p className=" text-zinc-500 m-0 text-sm">Something went wrong!</p>
      </div>
    );
  }

  return (
    <div ref={chatRef} className="flex-1 flex flex-col overflow-y-auto">
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && <ChatWelcome name={server?.name} />}
      {hasNextPage && (
        <div className="flex justify-center my-4">
          {isFetchingNextPage ? (
            <Loader2 className="w-7 h-7 text-zinc-500 animate-spin" />
          ) : (
            <button
              className="text-zinc-500 hover:text-zinc-600 text-sm border-none 
              bg-transparent cursor-pointer transition-all"
              onClick={() => fetchNextPage()}
            >
              Load previous messages
            </button>
          )}
        </div>
      )}
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
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMasseges;
