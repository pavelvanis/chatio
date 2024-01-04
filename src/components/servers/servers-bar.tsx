import React from "react";
import { twMerge } from "tailwind-merge";

type Props = React.HTMLProps<HTMLDivElement> & {};

const ServersBar: React.FC<Props> = ({ className, ...props }) => {
  return (
    <nav className={twMerge(" h-full w-40 bg-slate-300", className)}>
      ServersBar
    </nav>
  );
};

export default ServersBar;
