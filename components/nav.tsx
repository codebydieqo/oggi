import Link from "next/link";
import MaxWidthWrapper from "./max-width-wrapper";
import { UserButton } from "@clerk/nextjs";

export default function Nav() {
  return (
    <header className="w-full h-20 border-b border-zinc-200 bg-white sticky top-0 z-50">
      <MaxWidthWrapper className="h-full flex justify-between items-center">
        <Link href="/home" className="text-5xl font-black">
          Oggi
        </Link>
        <UserButton />
      </MaxWidthWrapper>
    </header>
  );
}
