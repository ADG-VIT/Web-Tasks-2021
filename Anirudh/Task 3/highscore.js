var list = document.querySelector(".list");
const highScores=JSON.parse(localStorage.getItem('highScores'));

highScores.map((score)=>{
    list.innerHTML+= '<li>'+score.name+' - '+score.score+'</li>'
})