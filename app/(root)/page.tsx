import MaxWidthWrapper from "@/components/max-width-wrapper";
import { cn } from "@/lib/utils";
import { oi } from "@/lib/utils";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { db } from "@/server/db/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/server/db/schema";

export default function App() {
  return (
    <div className="relative">
      <ModeToggle className="absolute top-5 right-5" />
      <MaxWidthWrapper className="h-screen flex flex-col justify-center items-center gap-4 relative">
        <h1 className={cn("text-7xl", oi.className)}>Oggi</h1>
        <p className="w-3/5 text-muted-foreground text-center">
          Organize, Capture, Collaborate — All in One Place. Oggi helps you stay
          focused and productive with smart folders, easy note-taking, and
          seamless team collaboration.
        </p>
        <div className="space-x-4">
          <SignInButton mode="modal" forceRedirectUrl={"/auth-callback"}>
            <Button className="w-[150px] cursor-pointer" variant={"outline"}>
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal" forceRedirectUrl={"/auth-callback"}>
            <Button className="w-[150px] cursor-pointer group">
              Get Started{" "}
              <ArrowRight
                size={15}
                className="group-hover:translate-x-0.5 duration-700 ease-in-out"
              />
            </Button>
          </SignUpButton>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
