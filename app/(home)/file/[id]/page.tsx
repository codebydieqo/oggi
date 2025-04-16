"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { getFile } from "@/server/actions";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { updateFile } from "@/server/actions";
import { useState } from "react";
import { toast } from "sonner";
import { Block } from "@blocknote/core";

export default function File() {
  const { id } = useParams();
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );
  const { data } = useQuery({
    queryKey: ["file"],
    queryFn: async () => await getFile(id as string),
  });

  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState<Block[] | string | undefined>(undefined);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setBlocks(data.content);
    }
  }, [data]);

  const onSubmit = async () => {
    await updateFile({
      title,
      content: JSON.stringify(blocks),
      fileId: id as string,
    }).then(() => toast.success("File Updated"));
  };

  if (data)
    return (
      <div className="py-4 pl-4">
        <div className="w-full flex justify-end items-center">
          <Button onClick={onSubmit}>
            <Save size={15} /> Update
          </Button>
        </div>
        <div className="w-4/5 mx-auto space-y-4">
          <div className="px-[54px]">
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              defaultValue={data.title}
              className="text-4xl font-[600] outline-none"
            />
          </div>
          <Editor onChange={setBlocks} initialContent={data.content} />
        </div>
      </div>
    );
}
