const mongoose = require("mongoose")
const models = require("./models")
const express = require("express")



mongoose.connect('mongodb://localhost:27017/letschat', {useNewUrlParser: true, useUnifiedTopology: true});

let errors = [
    "Successful",
    "Invalid username/password",
   "Operation not allowed",
    "Username already exists",
    "Data missing",
    "Unknown Error"
];

function apiMessage(errorCode,data)
{
    return {status:errorCode,message:errors[errorCode],data:data}



}


let router = express.Router()



router.post('/login',(req,res)=>{
        let username = req.params.username;
        let password = req.params.password;
        models.User.findOne({username:username,password:password},(err,user)=>{
            if(err)
            {
                return res.json(apiMessage(errors.length-1,{trace:err}))

            }
            else
            {
                if(user)
                {
                    // Send JWT
                }
                else
                {
                    return res.json(apiMessage(1,{}))
                }

            }



        })
     
        
})


router.post('/register',(req,res)=>{
        let username = req.params.username;
        let password = req.params.password;
        let name = req.params.store;
         // Check if username already exists
        models.User.find({username:username},(err,users)=>{
            if(users.length>0)
            {
                if(err)
                {
                    return res.json(apiMessage(error.length-1,{trace:err}))
                }   
                return res.json(apiMessage(3,{}));
            }
       });
        // Store inside database
        let newUser = new models.User({username:username,password:password,name:name})
        newUser.save().then((err)=>{
            if(err)
            {
                return res.json(apiMessage(error.length-1,{trace:err}))
            }
            
           return res.json(apiMessage(0,{}))

        })
    
});