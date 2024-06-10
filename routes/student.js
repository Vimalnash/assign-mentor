import express from "express";
import { addNewStudent, assignMentor, assignMentorMultiple, getAllStudents, getMentorStudents, getStudent } from "../controllers/student.js";

const router = express.Router();

function serverError(error, res) {
    console.log(error);
    res.status(500).json({error: `Internal Server Error : ${error}`});
};

// API to Show All Students
router.get("/all", async (req, res) => {
    try {
        const allStudentData = await getAllStudents(req);
        if(allStudentData.length <=0 ) {
            return res.status(404).json({error: "No Data Found"});
        };
        if (!allStudentData) {
            return res.status(400).json({error: "Error Getting Data"});
        };
        return res.status(200).json({message: "Success", data: allStudentData});
    } catch (error) {
        serverError(error, res);
    }
});

//2.  POST API to Create New Student
router.post("/create", async(req, res) => {
    const  createdDate = new Date().toJSON().slice(0, 10);
    const  updatedDate = new Date().toJSON().slice(0, 10);
    try {
        const newStudent = await addNewStudent(req, createdDate, updatedDate);
        if(!newStudent) {
            return res.status(400).json({error: "Error Creating New Student"});
        };
        return res.status(201).json({message: "Successfully Created", data: newStudent});
    } catch (error) {
        serverError(error, res);
    }
});

// TODO
//3. API to Assign a student to Mentor
// •	Select one mentor and Add multiple Student 
// •	A student who has a mentor should not be shown in List

// TODO// req.body = {mentorId: "dlfjsdljf", studentIds: ["kjdskfjsd", "sdkfjdsfj", "kjldsjfdsfj"]}

router.put("/assignMentor/multiple", async (req, res) => {
    try {
        const {mentorId, studentIds} = req.body
        let  updatedData
        updatedData = await studentIds.map(async (studId) => {
            const assignedData = await assignMentorMultiple(mentorId, studId);
            return assignedData;
        })

        Promise.all(updatedData).then((values) => {
            if(values.length <= 0) {
                return res.status(404).json({message: "No Data Updated"});
            };
            if(!values) {
                return res.status(400).json({error: "Error Updation"});
            };
            return res.status(200).json({message: "Successfully Updated", data: values});
        })
    } catch (error) {
        serverError(error, res);
    }
});


//4. PUT API to Assign/Update a Mentor to a Student
router.put("/assignMentor/single/:studentId", async (req, res) => {
    const  updatedDate = new Date().toJSON().slice(0, 10);
    try {
        const studentData = await getStudent(req);
        const previousMentorId = studentData[0].mentorId;
        const resData = await assignMentor(req, previousMentorId, updatedDate);
        if(!resData) {
            return res.status(400).json({error: "Error Assigning Student to Mentor"})
        }
        return res.status(201).json({message: "Successfully Assigned", data: resData})
    } catch (error) {
        serverError(error, res);
    }
});


//5. API to Show All Students for a Particular Mentor
router.get("/mentor/:mentorId", async (req, res) => {
    try {
        const mentorStudentsData = await getMentorStudents(req);
        if(mentorStudentsData.length <=0 ) {
            return res.status(404).json({error: "No Data Found"});
        };
        if (!mentorStudentsData) {
            return res.status(400).json({error: "Error Getting Data"});
        };
        return res.status(200).json({message: "Success", data: mentorStudentsData});
    } catch (error) {
        serverError(error, res);
    }
});


//6. API to show the previously assigned mentor for a particular student.
router.get("/:studentId", async (req, res) => {
    try {
        const resData = await getStudent(req);
        if(!resData) {
            return res.status(400).json({error: "Error getting data"});
        }
        return res.status(200).json({message: "Success Getting Student Data", data: resData});
    } catch (error) {
        serverError(error, res);
    }
});


export const studentRouter = router;