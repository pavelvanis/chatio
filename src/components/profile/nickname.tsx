import authOptions from "@/lib/authoptions";
import { getServerSession } from "next-auth";
import React from "react";

import UserAvatar from "../user-avatar";
import UserSignout from "./user-signout";

const Nickname = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    const user = session.user;
    return (
      <div className="flex items-center justify-between gap-2 w-40 p-1.5 px-2 ">
        <div className="flex items-center gap-2">
          <UserAvatar src={user.avatar} name={user.name} />
          <p className=" text-zinc-600 font-normal">{session?.user.name}</p>
        </div>
        <UserSignout/>
      </div>
    );
  }
};

export default Nickname;
