import { randomBytes } from "crypto"

// All chat related code (socket.io events etc.) will go here.


var socket = io("http://localhost:8080",{
    query:{
        "token":getCookieValue("token")
    }
})
socket.on('wrongtoken',()=>{
    window.location="/login.html"
})
socket.on('message',(data)=>{
    if(data.dataType=="text")
    {
        console.log(data.sendTo)
        if(data.sender == getActiveUser())
        {
            addMessageByReciever(data.data,data.date,"")
        }
    }
  
})


async function search()
{
    query = document.getElementById("searchBox").value
    
    
    fetch("/api/search/"+query).then(async (res)=>{
        result = await res.json()
        console.log(result)
        usersList = []
        result.forEach((user)=>{
            usersList.push(new User(user.name,user.username,"",false))

        })
        setUsersList(usersList)
        

    })
}



function uploadFile()
{
   
   file = document.getElementById("fileBox").files[0];
   fileSize= file.size()
   fileName=file.name()
   fileId = fileName+Math.random().toString() // Unique identifier for the file
   chunkSize = 128
   totalChunks = ceil(fileSize/chunkSize);
   chunks = []
   for(let i=0;i<totalChunks;i=i+chunkSize)
   {
        chunks.push(file.slice(i,i+chunkSize-1))
   }
   for(i in chunks)
   {
       chunk = chunks[i]
       socket.emit("sendMessage",{dataType:"file",totalChunks:totalChunks,chunkPosition:i,data:chunk,sendTo:getActiveUser(),fileName:fileName,fileSize:fileSize,fileId:fileId})
       
   }

   
}

function send()
{
    message = document.getElementById("messageBox").value
    sendTo = document.getElementById("sendTo").value
    date = new Date()
    socket.emit("sendMessage",{sendTo:sendTo,dataType:"text",data:message,date:date})
    addMessageBySender(message,date,"")
}
