import MembersBar from "@/components/members/members-bar";
import ProfileBar from "@/components/profile/profile-bar";
import AuthProvider from "@/components/providers/auth-provider";
import ServersBar from "@/components/servers/servers-bar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default MainLayout;
