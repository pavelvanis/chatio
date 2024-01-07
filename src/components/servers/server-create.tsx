"use client";
import React, { FormEvent, useRef, useState } from "react";
import qs from "query-string";

import Input from "../ui/input";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type CreateServerProps = {
  name: string;
  description: string;
  isPrivate: boolean;
};

const CreateServer = () => {
  const [error, setError] = useState<any | null>();
  const formProps = useRef<CreateServerProps>({
    name: "",
    description: "",
    isPrivate: false,
  });
  const formRef = useRef<HTMLFormElement | null>(null);
  const { data: user } = useSession();

  const userId = user?.user.id;

  const router = useRouter();

  const session = useSession();
  const token = session.data?.user.token;

  const url = qs.stringifyUrl({
    url: "/api/servers/",
  });

  const createServer = async (e: FormEvent) => {
    e.preventDefault();
    try {
      fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formProps.current.name,
          description: formProps.current.description,
          private: formProps.current.isPrivate,
          owner: userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            setError(data.error);
          } else {
            setError(null);
            formRef.current?.reset();
            router.push(`/servers/${data.id}`);
          }
        });
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <>
      <form
        className="flex flex-col items-center justify-center gap-1 p-2"
        ref={formRef}
        onSubmit={createServer}
      >
        <button type="submit" className="flex items-center  justify-center">
          <p className="m-0 ms-[.15rem] text-zinc-600 hover:text-zinc-900 transition-all uppercase text-sm">
            Create server
          </p>
        </button>
        <Input
          required
          type="text"
          maxLength={30}
          placeholder="Name"
          className=" rounded-md"
          onChange={(e) => (formProps.current.name = e.target.value)}
        />
        <Input
          required
          type="text"
          maxLength={100}
          placeholder="Description"
          className=" rounded-md"
          onChange={(e) => (formProps.current.description = e.target.value)}
        />
        <div className="flex justify-start items-center gap-3">
          <label htmlFor="isPrivate" className=" lowercase text-sm">
            Private
          </label>
          <Input
            required
            id="isPrivate"
            type="checkbox"
            placeholder="Private"
            className=" rounded-md w-4 h-4 cursor-pointer"
            onChange={(e) => (formProps.current.isPrivate = e.target.checked)}
          />
        </div>
      </form>
      {error && <p className="text-red-900 text-xs">{error}</p>}
    </>
  );
};

export default CreateServer;
