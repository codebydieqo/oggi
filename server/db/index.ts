import { PrismaClient } from "@/prisma/generated/prisma/client";

const db = new PrismaClient();

export default db;
