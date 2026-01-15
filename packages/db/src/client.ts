
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client.js';

declare global {
  // Allow global reuse in development to prevent exhausting DB connections across module reloads
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClient | undefined;
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prismaInstance = global.__prisma__ ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  global.__prisma__ = prismaInstance;
}

export const prisma = prismaInstance;
