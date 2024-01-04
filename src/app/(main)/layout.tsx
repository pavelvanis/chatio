import MembersBar from "@/components/members/members-bar";
import ProfileBar from "@/components/profile/profile-bar";
import ServersBar from "@/components/servers/servers-bar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex max-w-7xl mx-auto">
      <div className="grow max-h-[calc(100vh-3rem)]">
        <ProfileBar />
        <div className=" h-full flex">
          <ServersBar className="hidden mobile:block" />
          <main className="grow">{children}</main>
        </div>
      </div>
      <MembersBar className="hidden tablet:block" />
    </div>
  );
};

export default MainLayout;
