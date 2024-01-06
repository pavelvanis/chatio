import authOptions from "@/lib/authoptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import Avatar from "@/../public/avatar.svg";

const Nickname = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex items-center gap-1 w-40 p-1.5 px-2.5 ">
      <Image
        className=" w-10 h-10"
        src={Avatar}
        width={48}
        height={48}
        alt="avatar"
      />
      {session?.user.name}
    </div>
  );
};

export default Nickname;
