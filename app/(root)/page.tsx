import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Folder, FileText, Share2, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-primary text-white p-8 md:p-12 lg:p-16 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to Oggi
          </h1>
          <p className="text-xl mb-8">
            Your personal workspace for organizing documents and ideas.
          </p>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <Folder className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Organize Everything</h3>
                <p className="text-emerald-100">
                  Create folders to keep your files neatly organized and
                  accessible.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Create & Edit</h3>
                <p className="text-emerald-100">
                  Write and edit documents directly within the app.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <Share2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Access Anywhere</h3>
                <p className="text-emerald-100">
                  Your files are securely stored in the cloud, accessible from
                  any device.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md px-8 py-12 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
            <p className="text-gray-500 mt-2">Access your personal workspace</p>
            <SignInButton mode="modal">
              <Button className="w-full my-4" variant={"outline"}>
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="w-full">
                Get Started <ArrowRight size={15} />
              </Button>
            </SignUpButton>
          </div>
        </div>
      </div>
    </div>
  );
}
