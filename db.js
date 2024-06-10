import mongoose from "mongoose";

export function dbConnection(MONGO_URL) {
    try {
        mongoose.connect(MONGO_URL);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log(`Error Connecting Database : ${error}`);
    }
};