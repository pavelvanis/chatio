"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { useServer } from "../providers/server-provider";
import MemberItem from "./member-item";

type Props = React.HTMLProps<HTMLDivElement> & {};

const MembersBar: React.FC<Props> = ({ className, ...props }) => {
  const { server, members } = useServer();

  return (
    <div
      {...props}
      className={twMerge("h-full w-48 bg-slate-50 p-3", className)}
    >
      <h3 className="m-0 mb-3">Members:</h3>
      {members?.map((member, index) => (
        <MemberItem key={index} {...member} />
      ))}
    </div>
  );
};

export default MembersBar;
