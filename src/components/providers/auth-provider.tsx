import authOptions from "@/lib/authoptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const AuthProvider = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  // console.log(session);
  
  // Redirect when user is not logged in
  if (!session) return redirect("/login");

  return <>{children}</>;
};

export default AuthProvider;
