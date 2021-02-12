// All chat related code (socket.io events etc.) will go here.
var socket = io("http://localhost:8080",{
    query:{
        "token":getCookieValue("token")
    }
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


function send()
{
    message = document.getElementById("messageBox").value
    sendTo = document.getElementById("sendTo").value
    date = new Date()
    socket.emit("sendMessage",{sendTo:sendTo,dataType:"text",data:message,date:date})
    addMessageBySender(message,date,"")
}

function getCookieValue(name)
{
    arr = document.cookie.split(';')
    for(i in arr)
    {
        el = arr[i]
        
        if(el.split("=")[0].trim()==name)
        {
          
            return el.split("=")[1]
        }
    }

    
}
