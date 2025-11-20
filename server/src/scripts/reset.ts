import { db } from '../db/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function reset() {
  console.log('Resetting database...');

  try {
    // Drop all tables
    console.log('Dropping tables...');
    db.exec('DROP TABLE IF EXISTS likes');
    db.exec('DROP TABLE IF EXISTS comments');
    db.exec('DROP TABLE IF EXISTS blogs');
    db.exec('DROP TABLE IF EXISTS users');

    console.log('✅ Database reset successfully!');
    console.log('\nAll tables have been dropped.');
    console.log('Run "npm run seed" to populate with test data.');
    console.log('Or start the server and it will recreate empty tables.');

  } catch (error) {
    console.error('❌ Error resetting database:', error);
    process.exit(1);
  }
}

reset();
