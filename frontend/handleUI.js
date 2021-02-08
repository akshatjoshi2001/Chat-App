/*
    Made for Shaastra Workshop 2021. Created by Akshat Joshi.
    

    This is the javascript file which handles all UI related events. You don't need to edit this file.
    This file exposes an API which can be used for controlling the User Interface.
    The API documentation is availaible on the github page.
    



*/






$(document).ready(function(){
    $('#action_menu_btn').click(function(){
        $('.action_menu').toggle();
    });
        });
/** The User class. It is used for describing the meta data of User(s) for the UI */
class User
{
    /**
     * 
     * @param {string} name - The name of the user
     * @param {string} desc - The description of the user
     * @param {string} profile_image - The profile picture URL
     * @param {boolean} online - If true then user is online, if false then user is offline 
     */
    constructor(name,desc,profile_image,online)
    {
        this.name = name
        this.desc = desc
        this.profile_image = profile_image
        this.online = online
    }
}




/**
 * 
 * @param {Array<User>} userList - List of Users 
 */
function setUsersList(userList)
{
    document.getElementById("users_list").innerHTML = ""
    
    userList.forEach((user,i)=>{

        html = '<li id="user'+i+'">'
        html+='<div class="d-flex bd-highlight">'
        html+='<div class="img_cont">'
        html+='    <img src="'+user.profile_image+'" class="rounded-circle user_img">'
        if(user.online)
        {
        html+='    <span class="online_icon"></span>'
        }
        html+='</div>'
        html+='<div class="user_info">'
        html+='<span>'+user.name+'</span>'
        html+='<p>'+user.desc+'</p>'
        html+='</div></div></li>'
        document.getElementById("users_list").innerHTML=document.getElementById("users_list").innerHTML+html



    });
    


}


/** Sets the active user in the users' list 
 * @param {Array<User>} userList - List of users
 * @param {Number} activeIndex - The 0 based index of the active user in the list. activeIndex < size of userList
*/
function setActiveUserInList(userList,activeIndex)
{
    if(userList.length <= activeIndex)
    {
        console.error("UI Error: activeIndex cannot be greater than size of userList")
    }
    else
    {
        userList.forEach((user,index)=>{

            if(index==activeIndex)
            {
                document.getElementById("user"+index).setAttribute("class","active")
            }
            else
            {
                document.getElementById("user"+index).setAttribute("class","")
            }


        })
    }
}


/**
 * Clears the entire conversation
 */

function clearConversation()
{
    document.getElementById("messages").innerHTML=""
}


/**
 * Set attributes on the top bar of the conversation
 * @param {string} title - The title bar of the conversation
 * @param {string} desc  - The description of the conversation (May include stuff like number of unread messages in the conversation)
 * @param {string} profile_image - The URL of the profile picture of the reciever in the conversation
 * @param {boolean} online - If true then reciever is online, if false then reciever is offline 
 */

function setConversationTop(title,desc,online,profile_image)
{
    document.getElementById("title").innerHTML=title
    document.getElementById("desc").innerHTML=desc
    if(online)
    {
    document.getElementById("online_status").style.visibility="visible"
    }
    else{
        document.getElementById("online_status").style.visibility="hidden"

    }
    document.getElementById("profile_image").setAttribute("src",profile_image)



    
}
/**
 * 
 * @param {string} message - Message by the sender 
 * @param {string} date - Date and Time when the message was sent
 * @param {string} image -  URL of the profile picture of the sender
 */


function addMessageBySender(message,date,image)
{


    html=""
    html+='<div class="d-flex justify-content-end mb-4">'

    html+=' <div class="msg_cotainer_send">'
    html+=message
    html+=   '<span class="msg_time_send">'+ date + '</span>'
    html+='</div>'
    html+='<div class="img_cont_msg">'
    html+='<img src="">'
    html+= '</div>'

    document.getElementById("messages").innerHTML= document.getElementById("messages").innerHTML+html




}
/**
 * 
 * @param {string} message - Message by the reciever 
 * @param {string} date - Date and Time when the message was recieved
 * @param {string} image -  URL of the profile picture of the reciever
 */
function addMessageByReciever(message,date,image)
{
    
    html=""
    html+='<div class="d-flex justify-content-start mb-4">'

    html+=' <div class="msg_cotainer">'
    html+=message
    html+=   '<span class="msg_time">'+ date + '</span>'
    html+='</div>'
    html+='<div class="img_cont_msg">'
    html+='<img src="">'
    html+= '</div>'

    document.getElementById("messages").innerHTML= document.getElementById("messages").innerHTML+html

}      