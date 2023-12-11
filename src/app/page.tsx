"use client";
import { signIn } from "next-auth/react";

export default function Home() {
  const user = { email: "email", password: "pwd" };

  const handler = async () => {
    try {
      const login = await signIn("credentials", {
        ...user,
        redirect: false,
      });
      console.log(login);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <button onClick={handler}>login</button>
    </>
  );
}
