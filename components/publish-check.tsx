"use client";

import { Checkbox } from "./ui/checkbox";
import { handlePublish } from "@/server/actions";
import { toast } from "sonner";

export default function PublishCheck({
  published,
  fileId,
}: {
  published: boolean;
  fileId: string;
}) {
  return (
    <Checkbox
      checked={published}
      className="cursor-pointer"
      onCheckedChange={() => {
        handlePublish({ fileId, status: published }).then(() => {
          if (published) {
            toast.success("File Unpublished");
          } else {
            toast.success("File Published");
          }
        });
      }}
    />
  );
}
