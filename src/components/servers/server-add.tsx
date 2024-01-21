"use client";
import React, { FormEvent, useRef, useState } from "react";
import qs from "query-string";

import Input from "../ui/input";
import { PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ActionTooltip } from "../action-tooltip";
import { useModal } from "@/hooks/use-modal";

const AddServer = () => {
  const { onOpen } = useModal();

  return (
    <ActionTooltip label="Add server">
      <div
        className="flex bg-slate-50 rounded-lg py-1"
        onClick={() => onOpen("createServer")}
      >
        <PlusIcon className="w-6 h-6 text-zinc-600 hover:text-zinc-900 transition-all" />
        {/* <p className="m-0 ms-[.15rem] text-zinc-600 hover:text-zinc-900 transition-all uppercase text-sm">
          Add server
        </p> */}
      </div>
    </ActionTooltip>
  );
};

export default AddServer;
