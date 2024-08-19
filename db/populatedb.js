const {Client} = require("pg");
require("dotenv").config();

const SQL = `
    CREATE TYPE membership_status AS ENUM ('basic', 'member', 'admin');

    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        first_name VARCHAR (255),
        last_name VARCHAR (255),
        username VARCHAR (255),
        password VARCHAR (255),
        mem_status membership_status DEFAULT 'basic'
    );

    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR (255),
        text TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
        
`

async function main() {
    console.log("seeeding...");
    const client = new Client({
        connectionString: process.env.DB_URL,
    })

    await client.connect();
    await client.query(SQL);

    await client.end();
    console.log("done");
}

main();