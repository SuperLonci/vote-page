import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import { building } from '$app/environment';
import { env } from '$env/dynamic/private';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

if (!env.DATABASE_URL && !building) {
    throw new Error('DATABASE_URL is not set');
}

let sqlite;

if (!building) {
    // Use the real database instance during runtime
    sqlite = new Database(env.DATABASE_URL);
} else {
    // Only return a fake instance during build time
    sqlite = new Database(':memory:'); 
}

export const db = drizzle(sqlite, { schema });

if (!building) {
    try {
        console.log("⏳ Running migrations...");
        migrate(db, { migrationsFolder: "drizzle" });
        console.log("✅ Migrations complete.");
    } catch (err) {
        console.error("❌ Migration failed:", err);
    }
}
