const express=require('express')
const router=express.Router()
const Student=require('..student')
const INTERVIEW=require('..interview')


router.use('employee',require('.employee'))
router.use('placement',require('.placement'))
router.get('/',async function(req,res){

    const student=await Student.find({})
    const interview= await INTERVIEW.find({})

    res.render('home',{
        student:student,
        interview:interview
    })
    // return res.send('<h1>🍾 server running 🍾</h1>')
    
})

module.exports=router
