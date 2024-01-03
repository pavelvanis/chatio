import serversData from "@/test-data/servers";
import { HomeIcon } from "lucide-react";
import React from "react";
import ServerIconButton from "../buttons/server";

const Bar = () => {
  return (
    // Left side bar with servers
    <div className="bar p-3 flex flex-col gap-2">
      <ServerIconButton>
        <HomeIcon className="w-[1.65rem] h-[1.65rem]" strokeWidth={1.6} />
      </ServerIconButton>
      {serversData.map((server) => (
        <ServerIconButton key={server.id} {...server} />
      ))}
    </div>
  );
};

export default Bar;
