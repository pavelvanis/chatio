import React from "react";
import Nickname from "./nickname";
import ServerInfo from "./server-info";

const ProfileBar = () => {
  return (
    <header className="w-full h-14 bg-slate-200 flex items-center">
      <Nickname />
      <ServerInfo />
    </header>
  );
};

export default ProfileBar;
