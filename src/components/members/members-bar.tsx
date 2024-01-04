import React from "react";

type Props = {
  min: number;
};

const MembersBar: React.FC<Props> = ({ min }) => {
  return (
    <div className=" h-full w-48 bg-slate-50">
       MembersBar
  </div>
  );
};

export default MembersBar;
