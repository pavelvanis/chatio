"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const user = { email: "a@a.aa", password: "Heslo1!8" };

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
