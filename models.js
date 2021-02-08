const mongoose = require("mongoose")


// Define Database schema here


let usersSchema = mongoose.Schema({

    username:String,
    password:String,
    name:String

});


let chatSchema  = mongoose.Schema({
    sender:String,
    reciever:String,
    content:String,
    datetime:Date
})

const User = mongoose.model(usersSchema,"User")
const Chat = mongoose.model(chatSchema,"Chat")

module.exports = {User:User,Chat:Chat}
