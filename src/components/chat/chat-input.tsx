"use client";
import React, { useRef } from "react";
import Input from "../ui/input";
import { useServer } from "../providers/server-provider";
import axios from "axios";
import qs from "query-string";

const ChatInput = () => {
  const { server } = useServer();
  const content = useRef<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const query = { serverId: server?.id };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = qs.stringifyUrl({
        url: "/api/socket/messages",
        query,
      });
      await axios.post(url, { content: content.current });
      inputRef.current?.form?.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <form onSubmit={onSubmit}>
        <Input
          ref={inputRef}
          type="text"
          className="h-10"
          placeholder={`Message  # ${server?.name}`}
          onChange={(e) => (content.current = e.target.value)}
        />
      </form>
    </div>
  );
};

export default ChatInput;
