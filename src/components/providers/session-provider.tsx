"use client";
import React from "react";
import { SessionProvider as SessionProv } from "next-auth/react";

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProv>{children}</SessionProv>;
};

export default SessionProvider;
