"use client";

import { useModal } from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";

import { Tab, TabContent, TabList, TabTrigger } from "../ui/tabs";
import { FormEvent, useRef, useState } from "react";

import * as z from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type CreateServerProps = {
  name: string | null;
  description: string | null;
  isPrivate: boolean | null;
};

type AddServerProps = {
  inviteCode: string;
};

export const CreateServerModal = () => {
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === "createServer";

  const [createError, setCreateError] = useState<any | null>(null);
  const [addError, setAddError] = useState<any | null>(null);
  const formRefCreate = useRef<HTMLFormElement | null>(null);
  const formRefAdd = useRef<HTMLFormElement | null>(null);

  const router = useRouter();

  const session = useSession();
  const token = session?.data?.user.token;
  const userId = session?.data?.user.id;

  const addServerProps = useRef<AddServerProps>({ inviteCode: "" });

  const createServerProps = useRef<CreateServerProps>({
    name: null,
    description: null,
    isPrivate: false,
  });

  const CreateServer = async (e: FormEvent) => {
    e.preventDefault();
    try {
      fetch("/api/servers", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: createServerProps.current.name,
          description: createServerProps.current.description,
          private: createServerProps.current.isPrivate,
          owner: userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            setCreateError(data.error);
          } else {
            setCreateError(null);
            formRefCreate.current?.reset();
            router.push(`/servers/${data.id}`);
            router.refresh();
            onClose();
          }
        });
    } catch (error) {
      setCreateError(error);
      console.log(error);
    }
  };

  const AddServer = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/servers/invite", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user: userId,
        inviteCode: addServerProps.current.inviteCode,
      }),
    });

    if (!response.ok) {
      setAddError(response.statusText);
    } else {
      const data = await response.json();

      setAddError(null);
      formRefCreate.current?.reset();
      router.push(`/servers/${data.id}`);
      router.refresh();
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <Tab>
          <DialogHeader className="pt-6 px-6">
            <TabList>
              <TabTrigger value="create">Create Server</TabTrigger>
              <TabTrigger value="add">Add Server</TabTrigger>
            </TabList>
          </DialogHeader>
          <TabContent value="create" className="p-0">
            <form ref={formRefCreate} onSubmit={CreateServer}>
              <div className="p-5 space-y-3">
                <fieldset className="px-3">
                  <input
                    type="text"
                    required
                    placeholder="Server name"
                    className="w-full border p-2 px-4 rounded-lg"
                    onChange={(e) =>
                      (createServerProps.current.name = e.target.value)
                    }
                  />
                </fieldset>
                <fieldset className="px-3">
                  <input
                    type="text"
                    required
                    placeholder="Description"
                    className="w-full border p-2 px-4 rounded-lg"
                    onChange={(e) =>
                      (createServerProps.current.description = e.target.value)
                    }
                  />
                </fieldset>
                <fieldset className="px-3 flex p-2 justify-start items-center gap-4">
                  <label htmlFor="isPrivate" className="">
                    Private
                  </label>
                  <input
                    id="isPrivate"
                    type="checkbox"
                    className="p-2 px-4 rounded-lg w-5 h-5 cursor-pointer"
                    onChange={(e) =>
                      (createServerProps.current.isPrivate = e.target.checked)
                    }
                  />
                </fieldset>
                {createError && <p className="text-red-700">{createError}</p>}
              </div>
              <DialogFooter className="bg-gray-100 px-6 py-4">
                <button className=" bg-gray-300 px-2 py-1 rounded-lg transition-all duration-200 hover:bg-gray-200 font-light">
                  Submit
                </button>
              </DialogFooter>
            </form>
          </TabContent>
          <TabContent value="add" className="p-0">
            <form ref={formRefAdd} onSubmit={AddServer}>
              <div className="p-5">
                <fieldset>
                  <input
                    type="text"
                    required
                    placeholder="Invite code"
                    minLength={5}
                    maxLength={10}
                    className="w-full border p-2 px-4 rounded-lg"
                    onChange={(e) =>
                      (addServerProps.current.inviteCode = e.target.value)
                    }
                  />
                </fieldset>
                {addError && <p className="text-red-700">{addError}</p>}
              </div>
              <DialogFooter className="bg-gray-100 px-6 py-4">
                <button className=" bg-gray-300 px-2 py-1 rounded-lg transition-all duration-200 hover:bg-gray-200 font-light">
                  Submit
                </button>
              </DialogFooter>
            </form>
          </TabContent>
        </Tab>
      </DialogContent>
    </Dialog>
  );
};
