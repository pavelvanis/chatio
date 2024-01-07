"use client";

import React from "react";
import qs from "query-string";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useServer } from "../providers/server-provider";

import { MinusCircle } from "lucide-react";
import { ActionTooltip } from "../action-tooltip";

const ServerActions = () => {
  const { server } = useServer();
  const { data: user} = useSession();

  const router = useRouter();

  const leaveServer = () => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/member-ships/",
        query: { serverId: server?.id, userId: user?.user.id },
      });

      console.log("object");

      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));

        router.push("/");
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" flex items-center p-1.5 px-2.5">
      <ActionTooltip label="Leave Server">
        <button
          className=" flex items-center border-none bg-transparent cursor-pointer"
          onClick={() => leaveServer()}
        >
          <MinusCircle className=" text-red-800" strokeWidth={2.6} />
        </button>
      </ActionTooltip>
    </div>
  );
};

export default ServerActions;
