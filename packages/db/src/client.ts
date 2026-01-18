import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"

const globalForDrizzle = global as unknown as {
  pool?: Pool
}

export const pool =
  globalForDrizzle.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  })

if (process.env.NODE_ENV !== "production") {
  globalForDrizzle.pool = pool
}

export const db = drizzle(pool, { schema })
