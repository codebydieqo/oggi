"use server";

import { db } from "./db/drizzle";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { users, folders, files } from "./db/schema";
import { and, eq } from "drizzle-orm";

export async function handleAuth() {
  const { userId } = await auth();

  const userExists = await db.query.users.findFirst({
    where: eq(users.userId, userId!),
  });

  if (!userExists) {
    const user = await currentUser();

    await db.insert(users).values({
      userId: userId!,
      email: user?.emailAddresses[0].emailAddress!,
      firstName: user?.firstName!,
      lastName: user?.lastName!,
      imageUrl: user?.imageUrl!,
    });
  }

  return { success: true };
}

export async function createFolder(body: { name: string }) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (body.name.replace(" ", "").length !== 0) {
    await db.insert(folders).values({
      userId: userId!,
      name: body.name,
    });
  } else {
    return null;
  }

  revalidatePath("/home");
}

export async function deleteFile(body: { fileId: string }) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db
    .delete(files)
    .where(and(eq(files.id, body.fileId), eq(files.userId, userId)));

  revalidatePath("/folder/:id");
}

export async function handlePublish(body: { fileId: string; status: boolean }) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (body.status) {
    await db
      .update(files)
      .set({ published: false })
      .where(and(eq(files.userId, userId), eq(files.id, body.fileId)));
  } else if (!body.status) {
    await db
      .update(files)
      .set({ published: true })
      .where(and(eq(files.userId, userId), eq(files.id, body.fileId)));
  }

  revalidatePath("/folder/:id");
}

export async function getUserFolders() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const data = await db.query.folders.findMany({
    where: eq(folders.userId, userId),
    columns: {
      id: true,
      name: true,
    },
  });

  return data;
}

export async function createFile(body: {
  title: string;
  folder_id: string;
  content: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.insert(files).values({
    title: body.title!,
    content: body.content!,
    folderId: body.folder_id!,
    userId: userId!,
  });

  redirect(`/folder/${body.folder_id}`);
}

export async function getFile(fileId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const file = await db.query.files.findFirst({
    where: and(eq(files.id, fileId)),
  });

  return file;
}

export async function updateFile(body: {
  fileId: string;
  title: string;
  content: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const fileBelongsToUser = await db.query.files.findFirst({
    where: and(eq(files.userId, userId), eq(files.id, body.fileId)),
  });

  if (fileBelongsToUser) {
    await db
      .update(files)
      .set({ title: body.title, content: body.content })
      .where(and(eq(files.id, body.fileId), eq(files.userId, userId)));
  }
}
