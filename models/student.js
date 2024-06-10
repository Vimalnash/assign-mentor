import { ObjectId } from "bson";
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    studentName: {type: String, required: true, trim: true},
    studentEmail: {type: String, required: true, unique: true, trim: true},
    studentPhone: {type: Number, required: true, unique: true, trim: true},
    mentorId: {type: ObjectId, ref: "mentor", default: null},
    previousMentorId: {type: ObjectId, ref: "mentor", default: null},
    isActive: {type: Boolean, required: true},
    createdDate: {type: String, required: true},
    updatedDate: {type: String, required: true}
});

const Student = mongoose.model("student", studentSchema);
export { Student };