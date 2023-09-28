import { sql } from "./db.js";

await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

sql`
CREATE TABLE videos (
    id UUID DEFAULT uuid_generate_v4(),
    title TEXT,
    description TEXT,
    duration INTEGER,
    PRIMARY KEY (id)
);
`.then(() => console.log("Videos table was created"));
