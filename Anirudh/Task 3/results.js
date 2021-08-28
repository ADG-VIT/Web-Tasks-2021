const mostRecentScore=localStorage.getItem('mostRecentScore');
const maxScore=localStorage.getItem('max');
const userName=localStorage.getItem('userName');
const highScores=JSON.parse(localStorage.getItem('highScores')) || [];

var final=document.querySelector(".final");
final.innerText=mostRecentScore;
var max1=document.querySelector(".max1");
max1.innerText=maxScore;

var save=document.querySelector(".save")
save.addEventListener("click",(event)=>{
    const score={
        score: mostRecentScore,
        name: userName
    }
    highScores.push(score);
    highScores.sort((a,b) => b.score-a.score );
    highScores.splice(5);
    localStorage.setItem('highScores',JSON.stringify(highScores));

    event.preventDefault();
})