import { pgTable, serial, text, timestamp, varchar, integer } from 'drizzle-orm/pg-core';

// Example tables for chess game tracking
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const games = pgTable('games', {
  id: serial('id').primaryKey(),
  whitePlayerId: integer('white_player_id').references(() => users.id),
  blackPlayerId: integer('black_player_id').references(() => users.id),
  status: varchar('status', { length: 50 }).notNull().default('ongoing'), // ongoing, completed, abandoned
  result: varchar('result', { length: 50 }), // white_wins, black_wins, draw
  pgn: text('pgn'), // Portable Game Notation for the game
  startedAt: timestamp('started_at').defaultNow().notNull(),
  endedAt: timestamp('ended_at'),
});

export const moves = pgTable('moves', {
  id: serial('id').primaryKey(),
  gameId: integer('game_id').references(() => games.id).notNull(),
  moveNumber: integer('move_number').notNull(),
  move: varchar('move', { length: 10 }).notNull(),
  fen: text('fen').notNull(), // Position after the move
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});
