import { Mentor } from "../models/mentor.js";

// 1. Create New Mentor
export function addNewMentor(req, createdDate) {
    return new Mentor({
        ...req.body,
        isActive: true,
        createdDate
    }).save();
};

export function getAllMentors(req) {
    return Mentor.find();
};
