const Employee=require('..employee')
const Student=require('..student')
const INTERVIEW=require('..interview')
const Interview = require('..interview')


module.exports.SignUp=function(req,res){
    res.render('employee_SignUp')
}
// console.log("hey we are here to sort the issue between two and more compaies okay so dont worry we will do it perfectly ")

module.exports.create=async function(req,res){
    console.log(req.body)
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    Employee.findOne({email: req.body.email}, function(err, user){
        if(err){
            // req.flash('error', err);
                return
        }

        if (!user){
            Employee.create(req.body, function(err, user){
                if(err){
                    // req.flash('error', err); 
                    return}

                return res.redirect('sign_in');
            })
        }else{
            // req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }

    });
    // res.redirect('back')
}


module.exports.signIn=function(req,res){
    
    res.render('employee_SignIn')
}


module.exports.createSession=async function(req,res){

    console.log(req.body.email,req.body.password)

    const user=await Employee.findOne({email:req.body.email,password:req.body.password})
    if (user){

        console.log('signed in ')
        // req.flash('success',"You are Logged In successfully")
        res.redirect('/')

    }
    else{
        console.log('employee does not exists');
        // req.flash('error',"your account does not exists")
        res.redirect('back')
    }

    
}


module.exports.Add_Student_To_Interview=function(req,res){
    // res.send('this is working')
    res.render('add_student')
}


module.exports.add_student_to_cell=async function(req,res){
    console.log("we are ")
    console.log(req.body)
    const student= await Student.create({
        name:req.body.name,
        email:req.body.email,
        batch:req.body.batch,
        status:req.body.Status,
        dsa_score:req.body.dsa_score,
        webD_score:req.body.webD_score,
        react_score:req.body.react_score
    })
    console.log(student)
    res.redirect('/')
}


module.exports.add_interview=function(req,res){
    res.render('add_interview')
}


module.exports.add_interview_to_cell=async function(req,res){
    console.log(req.body)
    const interview=await INTERVIEW.create(req.body)
    console.log(interview)
    res.redirect('/')
}

module.exports.logout=function(req,res){
    res.redirect('/employee/sign_in')
}

module.exports.edit_student=async function(req,res){
    console.log(req.params.id)
    const student=await Student.findById(req.params.id)
    res.render('edit_student',{
        student:student

    })
}

module.exports.edit_student_details=async function(req,res){
    var student=await Student.findById(req.params.id)
    if(req.body.status!=student.status && req.body.status=="Placed"){
        await Student.deleteOne({_id:req.params.id})
        return  res.redirect('/')
    }
    else{
        var updated_student=await Student.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            email:req.body.email,
            batch:req.body.batch,
            status:req.body.status,
            dsa_score:req.body.dsa_score,
            webD_score:req.body.webD_score,
            react_score:req.body.react_score,
            $push:{
                interviews:[
                    {
                        company: req.body.company,
                        date: req.body.date,
                        result: req.body.result,
                    }
                ]
        }
        })
        var company=await  Interview.findOne({company_name:req.body.company})
        if(!company){

            company=await Interview.create({
                company_name:req.body.company,
                date:req.body.date,
                
            })
        }
        await company.students.push(updated_student)
        company.save()
        student.save()

    }  
    console.log(student,company)
    res.redirect('/')
}

module.exports.edit_interview=async function(req,res){   
    const interview=await Interview.findOne({_id:req.params.id}).populate('students')
    const student=await Student.find({})
    console.log(interview,student)
    res.render('edit_interview',{
        interview:interview,
        student:student
    })
}

module.exports.edit_interview_details=async function(req,res){
    console.log(req.body)
    var interview=await Interview.findById(req.params.id)   
    var updated_interview=await Interview.findByIdAndUpdate(req.params.id,{        
        name:req.body.company_name,
        date:req.body.date

    })
    res.redirect('/');
    // var i=0;
}