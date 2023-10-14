import express, { json } from "express";
import "dotenv/config";
import { connectToDatabase } from "./config/database.js";
import handleErrorMdw from "./middlewares/handleError.mdw.js";
import cors from "cors";
import appRouter from "./routes/index.js";
const whiteList = [
  "https://social-app-server-p5cm.onrender.com",
  "https://social-app-client-a2fz.onrender.com",
  "http://localhost:3001",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (process.env.NODE_ENV === "development") {
      return callback(null, true);
    }
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "PUT,PATCH,GET,DELETE,UPDATE",
};

const app = express();
const PORT = process.env.PORT;

connectToDatabase();

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/v1", appRouter);
app.use(handleErrorMdw);
app.listen(() => {
  console.log(`Server is running at ${PORT} `);
});
