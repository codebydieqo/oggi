import { db } from "@/server/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import FoldersClient from "./folders-client";
import { eq } from "drizzle-orm";
import { folders } from "@/server/db/schema";

export default async function Folders() {
  const { userId } = await auth();
  const data = await db.query.folders.findMany({
    where: eq(folders.userId, userId!),
  });

  if (data) return <FoldersClient folders={data} />;
}
