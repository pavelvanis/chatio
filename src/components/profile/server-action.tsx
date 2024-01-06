import React from "react";
import { twMerge } from "tailwind-merge";

export type ServerActionProps = React.HTMLAttributes<HTMLDivElement> & {
  icon?: JSX.Element;
};

const ServerAction: React.FC<ServerActionProps> = ({
  className,
  icon,
  ...props
}) => {
  return (
    <div className={twMerge(" flex cursor-pointer", className)} {...props}>
      {icon}
    </div>
  );
};

export default ServerAction;
