import MembersBar from "@/components/members/members-bar";
import { ServerProvider } from "@/components/providers/server-provider";
import React from "react";

const ServerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ServerProvider>
      <div className="flex grow">
        <div className="grow">{children}</div>
        <MembersBar />
      </div>
    </ServerProvider>
  );
};

export default ServerLayout;
