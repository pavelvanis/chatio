import React from "react";
import SessionReader from "../session-reader";

const ProfileBar = () => {
  return (
    <header className="w-full h-12 bg-slate-200">
      ProfileBar
      <SessionReader />
    </header>
  );
};

export default ProfileBar;
