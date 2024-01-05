"use client";
import React, { FormEvent, useRef, useState } from "react";
import Input from "../ui/input";
import Label from "../ui/label";
import Button from "../ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IUser } from "@/models/user";

type SignupCredentialsType = IUser & {
  password: string;
};

const SignupForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null | undefined>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const credentials = useRef<SignupCredentialsType>({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // request to create user
      const signup = await fetch("api/users", {
        method: "POST",
        body: JSON.stringify({ ...credentials.current }),
      });
      // response
      const res = await signup.json();
      console.log(res);
      // check error
      if (!signup.ok) {
        return setError(res.message);
      }

      // console.log(res);
      const signin = await signIn("credentials", {
        ...credentials.current,
        redirect: false,
      });
      if (!signin?.ok) return setError(signin?.error);
      // clear error state
      setError(null);
      // clear form
      formRef.current?.reset();
      // redirect to user page
      router.replace(`/`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-1/3 min-w-[300px] max-w-xl border border-sky-500 rounded  p-5">
      <form className="space-y-4" ref={formRef} onSubmit={onSubmit}>
        <h1 className="mt-0">Sign up</h1>
        <div className=" space-y-1">
          <Label htmlFor="signupName">Name</Label>
          <Input
            id="signupName"
            type="text"
            placeholder="Nickname"
            required={true}
            onChange={(e) => (credentials.current.name = e.target.value)}
          />
        </div>
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
          <Label htmlFor="signupImage">Image</Label>
          <Input
            id="signupImage"
            type="url"
            placeholder="Image URL"
            required={true}
            onChange={(e) => (credentials.current.avatar = e.target.value)}
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
          <Link href="/signup" className=" text-sm">
            Already have account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
