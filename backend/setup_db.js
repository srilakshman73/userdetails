const mysql = require("mysql2/promise");
require("dotenv").config();

async function setupDatabase() {
  try {
    // Connect without database selected to create it
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
    });

    console.log("Connected to MySQL server.");

    // Create database
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || "empdb1"}`);
    console.log(`Database '${process.env.DB_NAME || "empdb1"}' created or already exists.`);

    // Use the database
    await connection.changeUser({ database: process.env.DB_NAME || "empdb1" });

    // Create table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS employee (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        EmpName VARCHAR(255) NOT NULL,
        EmpAge INT,
        EmpDept VARCHAR(255),
        photo VARCHAR(255)
      )
    `;
    await connection.query(createTableQuery);
    console.log("Table 'employee' created or already exists.");

    await connection.end();
    console.log("Database setup complete.");
    process.exit(0);
  } catch (error) {
    console.error("Error setting up database:", error);
    process.exit(1);
  }
}

setupDatabase();
