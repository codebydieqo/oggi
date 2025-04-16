import { ReactNode } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: ReactNode }) {
  const { userId } = await auth();

  if (userId) redirect("/home");
  return <div>{children}</div>;
}
