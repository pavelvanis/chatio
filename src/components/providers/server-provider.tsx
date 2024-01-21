"use client";
import { IServer } from "@/models/server";
import { IUser } from "@/models/user";
import { useSession } from "next-auth/react";
import { notFound, useParams, usePathname } from "next/navigation";
import { useRouter } from "next/router";
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
  const pathname = usePathname();

  const session = useSession();
  const token = session.data?.user.token;
  // console.log(token);

  useEffect(() => {
    if (pathname === "/") {
      return setServer(null);
    }

    if (params?.serverId && token) {
      fetch(`/api/servers/${params.serverId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((server) => {
          if (server.error) {
            return notFound();
          }
          setServer(server);
        })
        .catch((error) => {
          console.error(error);
        });
      fetch(`/api/servers/${params.serverId}/members`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((members) => {
          setMembers(members);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [params, server, token]);

  return (
    <ServerContext.Provider value={{ server, members }}>
      {children}
    </ServerContext.Provider>
  );
};
