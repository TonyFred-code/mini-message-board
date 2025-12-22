#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL,
  text TEXT NOT NULL,
  added TIMESTAMP DEFAULT NOW()
);

INSERT INTO messages (user_name, text)
VALUES
  ('Amando', 'Hi there!'),
  ('Charles', 'Hello World!');
`;

async function main() {
  const dbUrl = process.argv[2];

  if (!dbUrl) {
    console.error("Usage: node db/populatedb.js <database-url>");
    process.exit(1);
  }

  const client = new Client({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
  });

  console.log("Seeding messages...");

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("Done.");
}

main();
