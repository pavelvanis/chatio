"use client";

import React from "react";

import { format } from "date-fns";

import { IMessage } from "@/models/message";
import { IUser } from "@/models/user";
import Image from "next/image";
import DefaultAvatar from "@/../public/avatar.svg";
import UserAvatar from "../user-avatar";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

interface ChatItemProps {
  id: string;
  content: string;
  timestamp: string;
  user: IUser;
}

const ChatItem: React.FC<ChatItemProps> = ({ content, timestamp, user }) => {
  return (
    <div className="my-3 flex gap-x-3 ms-4">
      <UserAvatar src={user.avatar} name={user.name} />
      <div className="flex flex-col">
        <div className="flex items-center gap-x-2 mb-0.5">
          <p className="font-semibold text-sm m-0">{user.name}</p>
          <span className="text-xs">{timestamp}</span>
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default ChatItem;
