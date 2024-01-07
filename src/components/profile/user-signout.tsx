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

const UserSignout = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className=" cursor-pointer justify-self-end">
          <button
            type="button"
            className=" flex items-center w-fit h-fit border-none cursor-pointer bg-transparent"
            onClick={() => signOut()}
          >
            <LogOut className=" text-red-800 w-5 h-5" strokeWidth={2.6} />
          </button>
        </TooltipTrigger>
        <TooltipContent className=" bg-red-50 text-red-800 font-semibold">
          Signout
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserSignout;
