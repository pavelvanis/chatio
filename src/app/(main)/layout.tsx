import MembersBar from "@/components/members/members-bar";
import ProfileBar from "@/components/profile/profile-bar";
import ServersBar from "@/components/servers/servers-bar";
import authOptions from "@/lib/authoptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  console.log("session", session);

  // Redirect when user is not logged in
  if (!session) return redirect("/login");
  return (
    <div className="h-full flex">
      <div className="grow">
        <ProfileBar />
        <div className="h-full flex max-h-[calc(100vh-3rem)]">
          <ServersBar />
          {children}
        </div>
      </div>
      <MembersBar />
    </div>
  );
};

export default MainLayout;
