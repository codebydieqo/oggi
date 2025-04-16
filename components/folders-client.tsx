"use client";

import { Folder as TFolder } from "@/lib/generated/prisma";
import Link from "next/link";
import { Button } from "./ui/button";
import { Folder, FolderOpen, FolderPlus } from "lucide-react";
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

export default function FoldersClient({ folders }: { folders: TFolder[] }) {
  const pathname = usePathname();

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
            <Input placeholder="Folder Name" className="my-4" />
            <DialogFooter>
              <Button>Create Folder</Button>
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
              <Folder />
            )}
            {i.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}
