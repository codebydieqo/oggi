import { FolderPlus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

export default function CreateFolderButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="text-blue-400 border-blue-400 hover:bg-blue-50 hover:text-blue-400"
        >
          <FolderPlus size={15} />
          New Folder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogDescription>
            Enter a name for your new folder.
          </DialogDescription>
        </DialogHeader>
        <div>
          <p className="text-sm mb-1">Folder Name</p>
          <Input placeholder="My New Folder" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="text-blue-400 border-blue-400 hover:bg-blue-50 hover:text-blue-400"
              variant={"outline"}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button>Create Folder</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
