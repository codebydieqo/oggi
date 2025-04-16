"use client";

import { Folder } from "@/server/db/schema";
import Link from "next/link";
import { Button } from "./ui/button";
import { FolderIcon, FolderOpen, FolderPlus } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { createFolder } from "@/server/actions";
import { useState } from "react";

export default function FoldersClient({ folders }: { folders: Folder[] }) {
  const pathname = usePathname();
  const [name, setName] = useState("");

  const onSubmit = async () => {
    if (name.replace(" ", "").length === 0) {
      return null;
    } else {
      await createFolder({ name });
      setName("");
    }
  };
  return (
    <div className="w-1/5 h-full border-r py-4 pr-4 flex flex-col gap-2">
      <div className="w-full flex justify-between items-center">
        <p className="font-[600]">My Folders</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"ghost"}>
              <FolderPlus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
              <DialogDescription>
                Enter a name for your new folder.
              </DialogDescription>
            </DialogHeader>
            <Input
              placeholder="Folder Name"
              className="my-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <DialogFooter>
              <Button onClick={onSubmit}>Create Folder</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {folders.map((i) => (
        <Link href={`/folder/${i.id}`} key={i.id}>
          <Button
            variant={"ghost"}
            className="w-full justify-start items-center"
          >
            {pathname === `/folder/${i.id}` ? (
              <FolderOpen className="text-[#4682B4]" />
            ) : (
              <FolderIcon />
            )}
            {i.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}
