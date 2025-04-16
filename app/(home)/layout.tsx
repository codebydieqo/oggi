import MaxWidthWrapper from "@/components/max-width-wrapper";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";
import { oi } from "../layout";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import Folders from "@/components/folders";
import { ModeToggle } from "@/components/mode-toggle";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className="w-full h-[8vh] border-b">
        <MaxWidthWrapper className="h-full flex justify-between items-center">
          <Link href="/home" className={cn("text-4xl", oi.className)}>
            Oggi
          </Link>
          <nav className="space-x-2 flex items-center">
            <Link href="/published">
              <Button className="w-[100px]">Published</Button>
            </Link>
            <Link href="/write">
              <Button className="w-[100px]">Write</Button>
            </Link>
            <SignOutButton>
              <Button variant={"destructive"} className="w-[100px]">
                Sign Out
              </Button>
            </SignOutButton>
            <ModeToggle />
          </nav>
        </MaxWidthWrapper>
      </header>
      <MaxWidthWrapper>
        <main className="w-full flex h-[92vh]">
          <Folders />
          <div className="w-4/5 h-full">{children}</div>
        </main>
      </MaxWidthWrapper>
    </div>
  );
}
