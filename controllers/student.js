import { Student } from "../models/student.js";



export function getAllStudents(req) {
    return Student.find().populate("mentorId previousMentorId");
};

// 2. Create New Student
export function addNewStudent(req, createdDate, updatedDate) {
    return new Student({
        ...req.body,
        isActive: true,
        createdDate, 
        updatedDate
    }).save();
};


// 3. Select one mentor and Add multiple Student 
//A student who has a mentor should not be shown in List

// req.body = {
//     mentorId: "kjflsdjfl"
//     studentId: ["dsfsdfsd", "werwdfsdfj"]
// }

export async function assignMentorMultiple(mentorId, studId) {
    console.log("controller", mentorId, studId);
    return Student.findOneAndUpdate(
        {_id: studId},
        {$set: {mentorId: mentorId}}
        )
}

// 4. Assign or Change Mentor for Particular Student
// req.body = {mentorId: "dlfjsdljf", previousMentorId: "lkjlerel"}
export function assignMentor(req, previousMentorId, updatedDate) {
    let mentorId;
    if(req.body.mentorId == "-") {
        mentorId = null
    } else {
        mentorId = req.body.mentorId
    }
    console.log(mentorId)
    return Student.findOneAndUpdate(
        {_id: req.params.studentId},
        {$set: {mentorId, previousMentorId, updatedDate}}
    );
};

// 5. All Students for Particular Mentor
export function getMentorStudents(req) {
    return Student.find({mentorId: req.params.mentorId}).populate("mentorId previousMentorId");
};

// 6. Previously Assigned Mentor For Particular Student
export function getStudent(req) {
    return Student.find({_id: req.params.studentId}).populate("mentorId previousMentorId");
};
