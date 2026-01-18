import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core"

export const gameResultEnum = pgEnum("game_result", [
  "WHITE_WINS",
  "BLACK_WINS",
  "DRAW",
])

export const players = pgTable("players", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: text("username").notNull().unique(),
  rating: integer("rating").default(1200).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const games = pgTable("games", {
  id: uuid("id").defaultRandom().primaryKey(),

  whitePlayerId: uuid("white_player_id")
    .notNull()
    .references(() => players.id),

  blackPlayerId: uuid("black_player_id")
    .notNull()
    .references(() => players.id),

  winnerId: uuid("winner_id").references(() => players.id),

  result: gameResultEnum("result").notNull(),
  pgn: text("pgn").notNull(),

  timeControl: text("time_control").notNull(),
  endedAt: timestamp("ended_at").defaultNow().notNull(),
})
