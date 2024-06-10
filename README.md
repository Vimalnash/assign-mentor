# Assign-Mentor
Welcome to Student Mentor Relation Setting
    API to create Mentor
        https://assign-mentor-v98r.onrender.com/api/mentor/create
        frontend - Master - Mentor

    API to create Student
        https://assign-mentor-v98r.onrender.com/api/student/create
        frontend - Master - Student

    API to Assign a student to Mentor
        https://assign-mentor-v98r.onrender.com/api/student/assignMentor/multiple
        Select one mentor and Add multiple Student
        A student who has a mentor should not be shown in List
            frontend - Transaction - AssignMentor-Single

    API to Assign or Change Mentor for particular Student
        https://assign-mentor-v98r.onrender.com/api/student/assignMentor/single/:studentId
        Select One Student and Assign one Mentor
            frontend - Transaction - AssignMentor-Multiple

    API to show all students for a particular mentor
        https://assign-mentor-v98r.onrender.com/api/student/mentor/:mentorId
        frontend - Reports - StudentListForMentor
        
    API to show the previously assigned mentor for a particular student.
        https://assign-mentor-v98r.onrender.com/api/student/:studentId
        frontend - Reports - PreviousMentorForaStudent