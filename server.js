import express, { json } from "express";
import "dotenv/config";
import { connectToDatabase } from "./config/database.js";

const app = express();
const PORT = process.env.PORT;

connectToDatabase();

app.use(express.json());
app.listen(() => {
  console.log(`Server is running at ${PORT} `);
});
