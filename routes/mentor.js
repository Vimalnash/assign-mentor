import express from "express";
import { addNewMentor, getAllMentors } from "../controllers/mentor.js";

const router = express.Router();

// Catch Error Handling Called in All Try Catch
function serverError(error, res) {
    console.log(error);
    return res.status(500).json({error: `Internal Server Error : ${error}`});
};

//1. Post api to Create New Mentor
router.post("/create", async (req, res) => {
    const  createdDate = new Date().toJSON().slice(0, 10);
    try {
        const newMentorData = await addNewMentor(req, createdDate);
        if(!newMentorData) {
            return res.status(400).json({error: "Error Creating New Mentor"});
        };
        return res.status(201).json({message: "Successfully Created", data: newMentorData});
    } catch (error) {
        serverError(error, res);
    }
});

// API to Show All Mentors
router.get("/all", async (req, res) => {
    try {
        const allMentorData = await getAllMentors(req);
        if(allMentorData.length <=0 ) {
            return res.status(404).json({error: "No Data Found"});
        };
        if (!allMentorData) {
            return res.status(400).json({error: "Error Getting Data"});
        };
        return res.status(200).json({message: "Success", data: allMentorData});
    } catch (error) {
        serverError(error, res);
    }
});

export const mentorRouter = router;