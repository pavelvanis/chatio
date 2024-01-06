import React from "react";
import ServerAction, { ServerActionProps } from "./server-action";
import { MinusCircle } from "lucide-react";

const serverActions: ServerActionProps[] = [
  {
    icon: <MinusCircle strokeWidth={2.6} className=" h-6 w-6 text-red-700" />,
  },
];

const ServerActions = () => {
  return (
    <div className=" p-1.5 px-2.5">
      {serverActions.map((action, i) => (
        <ServerAction key={i} {...action} />
      ))}
    </div>
  );
};

export default ServerActions;
