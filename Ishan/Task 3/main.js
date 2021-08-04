const mostRecentScore = localStorage.getItem('mostRecentScore');
var finalScore = document.getElementById('finalScore');
finalScore.innerText = 'Yor Score Is ${mostRecentScore}/ 10';
