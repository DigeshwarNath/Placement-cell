const express=require('express')
const passport=require('passport')
const router=express.Router()
const employeeController=require('..employeeController')



// ---------------🚨 CREATING THE Employee DATA USING PASSPORT🚨------------------------------
router.get('/sign_up',employeeController.SignUp)
router.post('/create',employeeController.create)
router.get('/sign_in',employeeController.signIn)
router.post('/create_session',employeeController.createSession)
router.get('/logout',employeeController.logout)

// ---------------🚨 SEEING THE DETAILS ABOUT THE STUDENT INTERVIEW SESSION🚨-----------------
router.get('/add_student_toInterview',employeeController.Add_Student_To_Interview)
router.post('/add_student_to_cell',employeeController.add_student_to_cell)
router.get('/add_interview',employeeController.add_interview)
router.post('/add_interview_to_cell',employeeController.add_interview_to_cell)

// ----------------🚨 STUDENT and Interview EDIT CONTROLLER 🚨-----------------------------------------------
router.get('/edit_student/:id',employeeController.edit_student)
router.post('/edit_student_detail/:id',employeeController.edit_student_details)
router.get('/edit_interview/:id',employeeController.edit_interview)
router.post('/edit_interview_detail/:id',employeeController.edit_interview_details)



module.exports=router