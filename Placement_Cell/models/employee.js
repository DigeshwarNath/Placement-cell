const mongoose=require('mongoose')

const employeeSchema=new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
},{timestamps:true})


const Employee=mongoose.model('Employee',employeeSchema)

module.exports=Employee