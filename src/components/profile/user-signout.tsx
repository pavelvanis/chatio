"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { ActionTooltip } from "../action-tooltip";

const UserSignout = () => {
  return (
    <ActionTooltip label="Signout">
      <button
        type="button"
        className=" flex items-center w-fit h-fit border-none cursor-pointer bg-transparent"
        onClick={() => signOut()}
      >
        <LogOut className=" text-red-800 w-5 h-5" strokeWidth={2.6} />
      </button>
    </ActionTooltip>
  );
};

export default UserSignout;
