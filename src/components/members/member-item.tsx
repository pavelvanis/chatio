import { IUser } from "@/models/user";
import React from "react";

export type MemberItemProps = IUser & {};

const MemberItem: React.FC<MemberItemProps> = ({ name }) => {
  return <div>{name}</div>;
};

export default MemberItem;
