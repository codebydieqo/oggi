import CreateFolderButton from "@/components/create-folder-button";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Folder, MoreVertical, Plus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const folders = [
    { id: 1, name: "Code" },
    { id: 2, name: "Design" },
  ];

  return (
    <MaxWidthWrapper className="py-10 space-y-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Folders</h1>
        <div className="flex gap-3">
          <CreateFolderButton />
          <Link href="/write">
            <Button>
              <Plus size={15} /> Write
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {folders.map((folder) => (
          <Link href={`/folder/${folder.id}`} key={folder.id}>
            <Card
              key={folder.id}
              className="cursor-pointer hover:shadow-md transition-shadow py-1"
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Folder className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-800 font-semibold">
                        {folder.name}
                      </h3>
                      <p className="text-sm text-gray-500">10 files</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
