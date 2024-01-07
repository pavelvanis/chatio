"use client";

import { useSession } from "next-auth/react";
import React from "react";

const SessionReader = () => {
  const session = useSession();
  // console.log(session);
  return <>{session?.data?.user?.email}</>;
};

export default SessionReader;
