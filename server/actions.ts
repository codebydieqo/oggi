"use server";

import db from "./db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleAuth() {
  const { userId } = await auth();

  const userExists = await db.user.findUnique({
    where: {
      user_id: userId!,
    },
  });

  if (!userExists) {
    const user = await currentUser();

    if (user)
      await db.user.create({
        data: {
          user_id: user.id!,
          email: user.emailAddresses[0].emailAddress!,
          first_name: user.firstName,
          last_name: user.lastName,
          image_url: user.imageUrl,
        },
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
    await db.folder.create({
      data: {
        user_id: userId,
        name: body.name,
      },
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

  await db.file.delete({
    where: {
      user_id: userId,
      id: body.fileId,
    },
  });

  revalidatePath("/folder/:id");
}

export async function handlePublish(body: { fileId: string; status: boolean }) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (body.status) {
    await db.file.update({
      where: {
        user_id: userId,
        id: body.fileId,
      },
      data: {
        published: false,
      },
    });
  } else if (!body.status) {
    await db.file.update({
      where: {
        user_id: userId,
        id: body.fileId,
      },
      data: {
        published: true,
      },
    });
  }

  revalidatePath("/folder/:id");
}

export async function getUserFolders() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const folders = await db.folder.findMany({
    where: {
      user_id: userId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return folders;
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

  await db.file.create({
    data: {
      title: body.title,
      content: body.content,
      folder_id: body.folder_id,
      user_id: userId,
    },
  });

  redirect(`/folder/${body.folder_id}`);
}

export async function getFile(fileId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const file = await db.file.findUnique({
    where: {
      user_id: userId,
      id: fileId,
    },
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

  const fileBelongsToUser = await db.file.findUnique({
    where: {
      user_id: userId,
      id: body.fileId,
    },
  });

  if (fileBelongsToUser) {
    await db.file.update({
      where: {
        id: body.fileId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
  }
}
