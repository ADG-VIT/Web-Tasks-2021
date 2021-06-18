const arr = document.getElementsByTagName("input");

for(let i = 0; i<3;i++){
    arr[i].addEventListener("keyup", (e)=>{
        arr[i].classList.remove("invalid");
        document.getElementById(`${i}`).style.display = "none";
    })
}
const btn = document.getElementById("3");
const var1 = document.getElementsByTagName("select");
btn.addEventListener("click", (e)=>{
    var count = 0
    for(let i = 0; i<3;i++){
        if(arr[i].value == ""){
            arr[i].classList.add("invalid");
            document.getElementById(`${i}`).style.display = "inline";
        } else {
            arr[i].classList.remove("invalid");
            count += 1;
        }
    }
    if(var1[0].value == ""){
        var1[0].classList.add("invalid");
        document.getElementById("select-span").style.display = "inline";
    } else {
        count += 1;
    }
    if (count != 4){
        e.preventDefault();
    }
});


var1[0].addEventListener("change", (e)=>{
    if(var1[0].value != ""){
        var1[0].classList.remove("invalid")
        document.getElementById("select-span").style.display = "none";
    }
})