"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { Dispatch, SetStateAction } from "react";
import { Block } from "@blocknote/core";
import { useTheme } from "next-themes";

type EditorProps = {
  initialContent?: string;
  editable?: boolean;
  onChange: Dispatch<SetStateAction<Block[] | string | undefined>>;
};

export default function Editor({
  initialContent,
  editable,
  onChange,
}: EditorProps) {
  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
  });
  const { resolvedTheme } = useTheme();

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      onChange={() => onChange(editor.document)}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
