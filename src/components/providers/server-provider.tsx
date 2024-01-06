"use client";
import { IServer } from "@/models/server";
import { useParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

// type ServerContextType = IServer & {};
type ServerContextType = {
  server: IServer | null;
  setServer: (server: IServer) => void;
};

const ServerContext = createContext<ServerContextType>({
  server: null,
  setServer: () => {},
});

export const useServer = () => {
  return useContext(ServerContext);
};

export const ServerProvider = ({ children }: { children: React.ReactNode }) => {
  const [server, setServer] = useState<IServer | null>(null);
  const params = useParams<{ serverId: string }>();

  useEffect(() => {
    console.log("PARAMS", params);

    // if (params?.serverId) {
    //   fetch(`/api/servers/${params.serverId}`)
    //     .then((response) => response.json())
    //     .then((server) => {
    //       setServer(server);
    //       console.log("Getter server: ",server);
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // }
  }, [params?.serverId]);

  return (
    <ServerContext.Provider value={{ server, setServer }}>
      {children}
    </ServerContext.Provider>
  );
};
