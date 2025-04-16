import db from "@/server/db";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";
import moment from "moment";
import { FileIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function Published() {
  const files = await db.file.findMany({
    where: {
      published: true,
    },
    include: {
      user: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
  });

  return (
    <div className="w-full py-4 pl-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">Name</TableHead>
            {["Type", "Created"].map((i, idx) => (
              <TableHead key={idx} className="text-center">
                {i}
              </TableHead>
            ))}
            <TableHead className="text-end">Author</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((i) => (
            <TableRow key={i.id}>
              <TableCell className="w-1/4">
                <Link
                  href={`/published/${i.id}`}
                  className="hover:underline hover:underline-offset-2 hover:cursor-pointer flex items-center gap-1 justify-start"
                >
                  <FileIcon size={15} />
                  {i.title}
                </Link>
              </TableCell>
              <TableCell className="text-center">File</TableCell>
              <TableCell className="text-center">
                <Button
                  variant={"ghost"}
                  className="dark:hover:bg-transparent hover:bg-transparent cursor-default"
                >
                  {moment(i.created_at).format("MM/DD/YY")}
                </Button>
              </TableCell>
              <TableCell className="text-end">
                <Badge>
                  {i.user.first_name} {i.user.last_name}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
