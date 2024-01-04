import authOptions from "@/lib/authoptions";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const AuthProvider = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  console.log(session);

  // if (!session) return redirect("/login");
  if (!session) return redirect("/login");

  return <>{children}</>;
};

export default AuthProvider;
