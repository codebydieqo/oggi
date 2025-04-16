import db from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import FoldersClient from "./folders-client";

export default async function Folders() {
  const { userId } = await auth();
  const folders = await db.folder.findMany({
    where: {
      user_id: userId!,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return <FoldersClient folders={folders} />;
}
