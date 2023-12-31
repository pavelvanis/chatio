"use client";
import React, { FormEvent, useRef, useState } from "react";
import qs from "query-string";

import Input from "../ui/input";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AddServer = () => {
  const [error, setError] = useState<any | null>();
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const { data: user } = useSession();

  const userId = user?.user.id;

  const router = useRouter();

  const session = useSession();
  const token = session.data?.user.token;

  const url = qs.stringifyUrl({
    url: "/api/servers/invite",
    query: {
      inviteCode: inviteCode,
      userId: userId || "",
    },
  });

  const addServer = async (e: FormEvent) => {
    e.preventDefault();
    try {
      fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        onSubmit={addServer}
      >
        <button type="submit" className="flex items-center  justify-center">
          <Plus className="w-4 h-4 text-zinc-600 hover:text-zinc-900 transition-all" />
          <p className="m-0 ms-[.15rem] text-zinc-600 hover:text-zinc-900 transition-all uppercase text-sm">
            Add server
          </p>
        </button>
        <Input
          required
          placeholder="Invite code"
          className=" rounded-md"
          onChange={(e) => setInviteCode(e.target.value)}
        />
      </form>
      {error && <p className="text-red-900 text-xs">{error}</p>}
    </>
  );
};

export default AddServer;
