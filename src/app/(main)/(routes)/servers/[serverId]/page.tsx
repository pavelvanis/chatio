"use client";
import { useServer } from "@/components/providers/server-provider";
import { useParams } from "next/navigation";
import { use, useEffect } from "react";

const ServerIdPage = () => {
  const { server, setServer } = useServer();
  const params = useParams<{ serverId: string }>();

  useEffect(() => {
    console.log("params",params?.serverId);
  }, [params?.serverId]);
  
  return <div>server: {server?.name}</div>;
};

export default ServerIdPage;
