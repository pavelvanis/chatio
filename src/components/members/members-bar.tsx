import React from "react";
import { twMerge } from "tailwind-merge";

type Props = React.HTMLProps<HTMLDivElement> & {

};

const MembersBar: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div {...props} className={twMerge("h-full w-48 bg-slate-50", className)}>
      MembersBar
    </div>
  );
};

export default MembersBar;
