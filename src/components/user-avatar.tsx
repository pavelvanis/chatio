import Image from "next/image";
import React from "react";

import DefaultAvatar from "@/../public/avatar.svg";


interface UserAvatarProps {
  src: string;
  name: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src, name }) => {
  return (
    <div className=" bg-zinc-300 w-9 h-9 rounded-full">
      <Image
        src={DefaultAvatar}
        width={24}
        height={24}
        alt={name}
        onError={(e) => {
          (e.target as HTMLImageElement) = DefaultAvatar;
        }}
        className=" h-9 w-9"
      />
    </div>
  );
};

export default UserAvatar;
