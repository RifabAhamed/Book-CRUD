import dotenv from 'dotenv';
import dbConfig from "./config/dbConfig.js";
import app from './app.js';
import dataSeeder from './seeder/dataSeeder.js';

dotenv.config();

const PORT = process.env.PORT || 8000;

async function startServer() {
  try {
    await dbConfig();
    await dataSeeder();
    app.listen(PORT, () => {
      console.log(`Sample server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();