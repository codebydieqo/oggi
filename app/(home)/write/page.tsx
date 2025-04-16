"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { type Block } from "@blocknote/core";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getUserFolders } from "@/server/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createFile } from "@/server/actions";
import { toast } from "sonner";

const formShema = z.object({
  title: z.string().min(1),
  content: z.string(),
  folder_id: z.string(),
});

type FormSchema = z.infer<typeof formShema>;

export default function Write() {
  const [blocks, setBlocks] = useState<Block[] | string | undefined>([]);
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );
  const { data } = useQuery({
    queryKey: ["user-folders"],
    queryFn: async () => await getUserFolders(),
  });
  const form = useForm<FormSchema>({
    resolver: zodResolver(formShema),
    defaultValues: {
      title: "",
      content: "",
      folder_id: "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    const payload = {
      ...values,
      content: JSON.stringify(blocks),
    };

    await createFile(payload);
    toast.success("File Saved");
  };
  if (data)
    return (
      <Form {...form}>
        <form
          className="space-y-4 w-full mx-auto"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="w-full h-full py-4 pl-4 flex flex-col gap-4">
            <div className="w-full flex justify-end items-center gap-4">
              <FormField
                control={form.control}
                name="folder_id"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a folder" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data.map((i) => (
                          <SelectItem key={i.id} value={i.id}>
                            {i.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button>
                <PlusCircle size={15} /> Post
              </Button>
            </div>
            <div className="w-4/5 mx-auto space-y-4">
              <div className="px-[54px]">
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          type="text"
                          className="text-4xl font-[600] outline-none"
                          placeholder="Title"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Editor onChange={setBlocks} />
            </div>
          </div>
        </form>
      </Form>
    );
}
