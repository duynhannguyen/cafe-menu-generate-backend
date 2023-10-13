import express, { json } from "express";
import "dotenv/config";

const app = express();
app.express(json());

const PORT = process.env.PORT;

app.listen(() => {
  console.log(`Server is running at ${PORT} `);
});
