var next=document.querySelector(".start");
var userName=document.querySelector("#name");
userName.addEventListener("keyup",()=>{
    
})
next.addEventListener("click",(event)=>{
    event.preventDefault(); 
    localStorage.setItem("userName",userName.value);
    return window.location.assign("./quiz.html");
})
