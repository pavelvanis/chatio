import Link from "next/link";
import React from "react";

type ServerIconButtonProps = {
  id?: string;
  name?: string;
  image?: string;
  children?: React.ReactNode;
};

const ServerIconButton: React.FC<ServerIconButtonProps> = ({
  name,
  children,
}) => {
  return (
    <Link
      href={`server/${name}`}
      className=" bg-red-500 w-[2.7rem] h-[2.7rem] rounded-full hover:rounded-xl transition-all flex items-center justify-center"
    >
      {children}
    </Link>
  );
};

export default ServerIconButton;
