const a1 = document.querySelector('.des');
const a2 = document.querySelector('.amt');
const a3 = document.querySelector('.date');
const a4 = document.querySelector('h1');

console.log(a4.innerText);

console.log("20");
console.log(a1);
console.log(a2);
console.log(a3);
const info = document.querySelector('.info');
const ppl = ['mario', 'luigi', 'yoshi'];

ppl.forEach(person => {
    info.innerHTML += `<p>${person}</p>`;
});