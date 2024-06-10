import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
    mentorName: { type: String, required: [true, "mentorName Required"], trim: true },
    mentorEmail: { type: String, required: [true, "mentorEmail Required"], unique: true, trim: true },
    mentorPhone: { type: Number, required: [true, "mentorPhone Required"], unique: true, trim: true },
    isActive: {type: Boolean, required: true},
    createdDate: {type: String, required: true}
});

const Mentor = mongoose.model("mentor", mentorSchema);
export { Mentor };