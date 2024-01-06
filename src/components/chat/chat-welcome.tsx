import { Hash } from "lucide-react";
import React from "react";

type ChatWelcomeProps = {
  name: string | undefined;
};

const ChatWelcome: React.FC<ChatWelcomeProps> = ({ name }) => {
  return (
    <div>
      <div className=" bg-zinc-300 h-[75px] w-[75px] rounded-full flex items-center justify-center">
        <Hash className="text-white w-10 h-10" />
      </div>
      <p className=" text-xl md:text-3xl font-bold mt-4 mb-0 ">
        Welcome to #{name}
      </p>
      <p className="text-sm mt-2">This is the start of the {name} server</p>
    </div>
  );
};

export default ChatWelcome;
