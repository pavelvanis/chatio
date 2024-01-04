import MembersBar from "@/components/members/members-bar";
import ProfileBar from "@/components/profile/profile-bar";
import ServersBar from "@/components/servers/servers-bar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
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
