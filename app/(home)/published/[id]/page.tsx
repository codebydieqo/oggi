"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { getFile } from "@/server/actions";

export default function PublishedFile() {
  const { id } = useParams();
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );
  const { data } = useQuery({
    queryKey: ["file"],
    queryFn: async () => await getFile(id as string),
  });

  if (data)
    return (
      <div className="py-4 pl-4">
        <div className="w-4/5 mx-auto space-y-4">
          <div className="px-[54px]">
            <p className="text-4xl font-[600]">{data.title}</p>
          </div>
          <Editor
            onChange={() => {}}
            initialContent={data.content}
            editable={false}
          />
        </div>
      </div>
    );
}
