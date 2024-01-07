import MemberShipModel from "@/models/member-ship";
import ServerModel, { IServer } from "@/models/server";

import authOptions from "@/lib/authoptions";

import { getServerSession } from "next-auth";
import React from "react";
import { twMerge } from "tailwind-merge";

import ServerItem from "./server-item";
import AddServer from "./server-add";
import CreateServer from "./server-create";

const getServers = async () => {
  const session = await getServerSession(authOptions);
  const memberships = await MemberShipModel.find({
    user: session?.user?.id,
  });
  const servers = await Promise.all(
    memberships.map(
      async (membership) => await ServerModel.findById(membership.server)
    )
  );
  return servers as IServer[];
};

type Props = React.HTMLProps<HTMLDivElement> & {};

const ServersBar: React.FC<Props> = async ({ className }) => {
  const servers = await getServers();

  return (
    <nav
      className={twMerge(
        " h-full w-40 bg-slate-300 flex flex-col p-2 space-y-2",
        className
      )}
    >
      <AddServer />
      <CreateServer />
      {servers.map((server, index) => (
        <ServerItem
          key={index}
          {...{
            id: server.id,
            name: server.name,
            description: server.description,
            private: server.private,
            inviteCode: server.inviteCode,
            owner: server.owner,
          }}
        />
      ))}
    </nav>
  );
};

export default ServersBar;
