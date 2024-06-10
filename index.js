
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./db.js";
import { mentorRouter } from "./routes/mentor.js";
import { studentRouter } from "./routes/student.js";
// env configuration
dotenv.config();

// Initializing Express
const app = express();

// Initializing Env
const PORT = process.env.PORT;
// const MONGO_URL_LOCAL = process.env.MONGO_URL_LOCAL;
const MONGO_URL_ATLAS = process.env.MONGO_URL_ATLAS;

// Connecting Database
dbConnection(MONGO_URL_ATLAS);

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/mentor", mentorRouter);
app.use("/api/student", studentRouter);

// Activating and Listen to server
app.listen(PORT, () => {
    console.log(`
    Server Started at ${PORT}, 
    Listening to http://localhost:${PORT}`);
});