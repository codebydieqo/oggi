import { db } from "@/server/db/drizzle";
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
import { eq } from "drizzle-orm";
import { files } from "@/server/db/schema";

export default async function Published() {
  const data = await db.query.files.findMany({
    where: eq(files.published, true),
    with: {
      user: {
        columns: {
          firstName: true,
          lastName: true,
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
          {data.map((i) => (
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
                  {moment(i.createdAt).format("MM/DD/YY")}
                </Button>
              </TableCell>
              <TableCell className="text-end">
                <Badge>
                  {i.user.firstName} {i.user.lastName}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
