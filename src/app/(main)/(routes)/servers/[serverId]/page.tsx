"use client"

import { useServer } from "@/components/providers/server-provider";

export default function Page() {
  const {server} = useServer();
  return <div>server: {server?.name}</div>;
}
