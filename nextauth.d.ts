import { IUser } from "@/models/user";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends IUser {
    user: IUser;
    token: string;
  }
}
