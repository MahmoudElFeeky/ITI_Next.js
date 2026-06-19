import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Resolve the absolute path to dev.db to prevent path mismatches in dev/prod builds
const dbPath = path.resolve(process.cwd(), "dev.db");
const dbUrl = `file:${dbPath}`;

const adapter = new PrismaBetterSqlite3({
  url: dbUrl,
});

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
