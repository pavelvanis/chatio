import { IServer } from "@/models/server";
import Link from "next/link";
import React from "react";

export type ServerItemProps = IServer & {};

const ServerItem: React.FC<ServerItemProps> = ({name, id}) => {
    console.log(id);
    return <Link href={`/servers/${id}`} className="p-2">{name}</Link>;
};

export default ServerItem;
