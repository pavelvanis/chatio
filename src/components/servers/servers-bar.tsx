import authOptions from "@/lib/authoptions";
import MemberShipModel from "@/models/member-ship";
import serversData from "@/test-data/servers";
import { InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { twMerge } from "tailwind-merge";

const getServers = async () => {
  const session = await getServerSession(authOptions)
  const memberships = await MemberShipModel.find({user: session?.user?.id}).populate('server');
  console.log(memberships);
  return serversData;
};

type Props = React.HTMLProps<HTMLDivElement> & {};

const ServersBar: React.FC<Props> = async ({ className }) => {
  const servers = await getServers();
  // console.log("servers:", servers);
  return (
    <nav className={twMerge(" h-full w-40 bg-slate-300", className)}>
      ServersBar
    </nav>
  );
};

export default ServersBar;
