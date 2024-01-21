"use client";

import React, { useRef, useState } from "react";
import qs from "query-string";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useServer } from "../providers/server-provider";

import { ClipboardCheck, CopyCheck, MinusCircle } from "lucide-react";
import { ActionTooltip } from "../action-tooltip";

const ServerActions = () => {
  const [isCoppied, setIsCoppied] = useState(false);
  const { server } = useServer();
  const { data: user } = useSession();
  const token = user?.user.token;

  const inviteCodeRef = useRef(null);

  const router = useRouter();

  const leaveServer = () => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/member-ships/",
        query: { serverId: server?.id, userId: user?.user.id },
      });

      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          router.push("/");
          router.refresh();
        });

    } catch (error) {
      console.error(error);
    }
  };

  const copyInviteCode = () => {
    if (!server?.inviteCode) return;
    navigator.clipboard.writeText(server.inviteCode);
    setIsCoppied(true);
    setInterval(() => setIsCoppied(false), 1000 * 60);
  };

  return (
    <div className=" flex items-center p-1.5 px-2.5 gap-6">
      <ActionTooltip label="Invite Code">
        <button
          className=" flex items-center gap-2 cursor-pointer bg-zinc-300 border border-zinc-800 rounded-xl px-2.5 py-0.5"
          onClick={() => copyInviteCode()}
        >
          <span ref={inviteCodeRef}>{server?.inviteCode}</span>
          {isCoppied && <ClipboardCheck className="w-4 h-4 text-zinc-700" />}
        </button>
      </ActionTooltip>
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
