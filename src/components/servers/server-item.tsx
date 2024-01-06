"use client";
import { IServer } from "@/models/server";
import { HardDrive } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export type ServerItemProps = IServer & {};

const versions = {
  base: "p-2 w-full hover:bg-blue-50 flex justify-start gap-2 no-underline rounded-lg transition-all",
  active: "bg-blue-200 border-l-4 border-blue-500",
};

const ServerItem: React.FC<ServerItemProps> = ({ name, id }) => {
  const [active, setActive] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith(`/servers/${id}`)) setActive(true);
    else setActive(false);
  }, [pathname]);

  return (
    <Link
      href={`/servers/${id}`}
      className={twMerge(versions.base, active && versions.active)}
    >
      <HardDrive />
      <span className=" mt-[.1rem] text-sm font-semibold">{name}</span>
    </Link>
  );
};

export default ServerItem;
