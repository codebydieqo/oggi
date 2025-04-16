"use client";

import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { deleteFile } from "@/server/actions";
import { toast } from "sonner";

export default function DeleteButton({ fileId }: { fileId: string }) {
  return (
    <Button
      variant={"destructive"}
      size={"icon"}
      onClick={() => {
        deleteFile({ fileId }).then(() => {
          toast.success("File Deleted");
        });
      }}
    >
      <Trash />
    </Button>
  );
}
