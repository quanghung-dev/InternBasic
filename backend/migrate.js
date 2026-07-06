const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('Error: DATABASE_URL is not defined in the .env file.');
  process.exit(1);
}

const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function runMigration() {
  try {
    console.log('Connecting to NeonDB...');
    await client.connect();
    console.log('Connected successfully.');

    const sqlFilePath = path.join(__dirname, 'migration.sql');
    console.log(`Reading SQL file from: ${sqlFilePath}`);
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    console.log('Executing migration script...');
    await client.query(sql);
    console.log('Migration executed successfully! Products table and seed data have been inserted.');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await client.end();
    console.log('Connection closed.');
  }
}

runMigration();
