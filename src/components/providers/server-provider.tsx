"use client";
import { IServer } from "@/models/server";
import { IUser } from "@/models/user";
import { useParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type ServerContextType = { server: IServer | null; members: IUser[] | null };

const ServerContext = createContext<ServerContextType>({
  server: null,
  members: null,
});

export const useServer = () => {
  return useContext(ServerContext);
};

export const ServerProvider = ({ children }: { children: React.ReactNode }) => {
  const [server, setServer] = useState<IServer | null>(null);
  const [members, setMembers] = useState<IUser[] | null>(null);

  const params = useParams<{ serverId: string }>();

  useEffect(() => {
    if (params?.serverId) {
      fetch(`/api/servers/${params.serverId}`)
        .then((response) => response.json())
        .then((server) => {
          setServer(server);
        })
        .catch((error) => {
          console.error(error);
        });
      fetch(`/api/servers/${params.serverId}/members`)
        .then((response) => response.json())
        .then((members) => {
          setMembers(members);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [params?.serverId]);

  return (
    <ServerContext.Provider value={{ server, members }}>
      {children}
    </ServerContext.Provider>
  );
};
