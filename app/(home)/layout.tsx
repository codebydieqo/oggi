import { ReactNode } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Nav from "@/components/nav";

export default async function Layout({ children }: { children: ReactNode }) {
  const { userId } = await auth();

  if (!userId) redirect("/");
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
}
