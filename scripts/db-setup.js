const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config({ path: ".env" });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createTablesAndSeed() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        uid SERIAL PRIMARY KEY,
        wallet_address VARCHAR(255) UNIQUE NOT NULL,
        avatar_url VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = now();
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await client.query(`
      CREATE OR REPLACE TRIGGER update_users_updated_at
      BEFORE UPDATE ON users
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `);

    await client.query(`
      INSERT INTO users (wallet_address, avatar_url) VALUES
        ('0x123abc456def789ghi012jkl345mno678pqr', 'https://example.com/avatar1.png'),
        ('0x987zyx654wvu321tsr098qpo765nml432kjh', 'https://example.com/avatar2.png'),
        ('0xabcdef1234567890abcdef1234567890abcdef', 'https://example.com/avatar3.png'),
        ('0x0987654321fedcba0987654321fedcba0987', 'https://example.com/avatar4.png');
    `);

    console.log("Tables created and seeded successfully!");
  } catch (error) {
    console.error("Error creating tables and seeding data:", error);
  } finally {
    client.release();
    await pool.end();
  }
}

createTablesAndSeed();
