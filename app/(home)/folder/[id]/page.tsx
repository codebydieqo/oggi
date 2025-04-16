import DeleteButton from "@/components/delete-button";
import PublishCheck from "@/components/publish-check";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/server/db/drizzle";
import { files, folders } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { FileIcon } from "lucide-react";
import moment from "moment";
import Link from "next/link";

export default async function Folder({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { userId } = await auth();

  const folder = await db.query.folders.findFirst({
    where: and(eq(folders.userId, userId!), eq(folders.id, id)),
    with: {
      files: {
        orderBy: (files, { desc }) => [desc(files.createdAt)],
      },
    },
  });

  if (folder)
    return (
      <div className="w-full py-4 pl-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">Name</TableHead>
              {["Type", "Created", "Published"].map((i, idx) => (
                <TableHead key={idx} className="text-center">
                  {i}
                </TableHead>
              ))}
              <TableHead className="text-end">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {folder.files.map((i) => (
              <TableRow key={i.id}>
                <TableCell className="w-1/4">
                  <Link
                    href={`/file/${i.id}`}
                    className="hover:underline hover:underline-offset-2 hover:cursor-pointer flex items-center gap-1 justify-start"
                  >
                    <FileIcon size={15} />
                    {i.title}
                  </Link>
                </TableCell>
                <TableCell className="text-center">File</TableCell>
                <TableCell className="text-center">
                  {moment(i.createdAt).format("MM/DD/YY")}
                </TableCell>
                <TableCell className="text-center">
                  <PublishCheck published={i.published} fileId={i.id} />
                </TableCell>
                <TableCell className="text-end">
                  <DeleteButton fileId={i.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
}
