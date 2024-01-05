import authOptions from "@/lib/authoptions";
import MemberShipModel from "@/models/member-ship";
import serversData from "@/test-data/servers";
import { InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { twMerge } from "tailwind-merge";

import ServerModel, { IServer } from "@/models/server";
import ServerItem from "./server-item";

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
  console.log("servers:", servers);
  // console.log(servers[0].name);
  return (
    <nav className={twMerge(" h-full w-40 bg-slate-300 flex flex-col", className)}>
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
        // <div key={index}>{server.name}</div>
      ))}
    </nav>
  );
};

export default ServersBar;
