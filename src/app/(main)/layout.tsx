import MembersBar from "@/components/members/members-bar";
import ProfileBar from "@/components/profile/profile-bar";
import ServersBar from "@/components/servers/servers-bar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex">
      <div className="grow max-h-[calc(100vh-3rem)]">
        <ProfileBar />
        <div className=" h-full flex">
          <ServersBar />
          <main className="grow">{children}</main>
        </div>
      </div>
      <MembersBar min={750} />
    </div>
  );
};

export default layout;
