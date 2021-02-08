const express = require("express")

const app = express()
const chatServer = express()
const chatServerHTTP = require("http").Server(app)
const io = require("socket.io")(chatServerHTTP)





const apiRouter = express.Router() // Routes for API Calls

app.use('/api',apiRouter)



// Send frontend web page and static files to user
app.get('/',(req,res)=>{
    res.sendFile(process.cwd() + "/frontend/login.html")
})

app.get('/:fileName',(req,res)=>{
        res.sendFile(process.cwd() + "/frontend/"+req.params.fileName)
}) 






app.listen(8080,()=>{
    console.log("Chat App started")
})
