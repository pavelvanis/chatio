"use client";
import React, { FormEvent, useRef, useState } from "react";
import Input from "../ui/input";
import Label from "../ui/label";
import Button from "../ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null | undefined>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const credentials = useRef({ email: "", password: "" });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const signin = await signIn("credentials", {
        ...credentials.current,
        redirect: false,
      });
      if (!signin?.ok) return setError(signin?.error);
      setError(null);
      formRef.current?.reset();
      router.push("/");
    } catch (error: any) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <div className="w-1/3 min-w-[300px] max-w-xl border rounded-lg shadow-md  p-5">
      <form
        className="space-y-4"
        ref={formRef}
        onSubmit={onSubmit}
      >
        <h1 className="mt-0 mb-5 font-bold text-xl">Login</h1>
        <div className=" space-y-1">
          <Label htmlFor="signupEmail">Email</Label>
          <Input
            id="signupEmail"
            type="email"
            placeholder="Email"
            required={true}
            onChange={(e) => (credentials.current.email = e.target.value)}
          />
        </div>
        <div className=" space-y-1">
          <Label htmlFor="signupPassword">Password</Label>
          <Input
            id="signupPassword"
            type="password"
            placeholder="Password"
            required={true}
            onChange={(e) => (credentials.current.password = e.target.value)}
          />
        </div>
        {error && (
          <p className=" mt-3 ms-1 mb-5 text-sm text-red-700">
            *<span className="ms-1">{error}</span>
          </p>
        )}
        <Button type="submit" className="w-full text-white bg-slate-800">
          Login
        </Button>
        <div className=" text-center">
            <Link href="/signup" className=" text-sm">Don&apos;t have an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
