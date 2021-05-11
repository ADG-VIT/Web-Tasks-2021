const form = document.querySelector('.details .expense-form form');
const submit = document.querySelector('.details .expense-form form button');
const desp = document.querySelector('.details .expense-form form input[name = description]');
const amnt = document.querySelector('.details .expense-form form input[name = amount]');
const date = document.querySelector('.details .expense-form form input[name = date]')
const disp = document.querySelector('.display .board');
const update = function() {
    let sum = 0;
    const prices = document.querySelectorAll('.display .board .dashboard .price-plate');
    const length = prices.length;
    for (let i = 0; i < length; i++) {
        sum += Number(prices[i].querySelector('.price').innerText);
    }
    const sumbox = document.querySelector('.display .sum');
    if (sum != 0) sumbox.innerText = `Sum of all items is Rs. ${sum}`;
    else sumbox.innerText = '';
}
update();
form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const itemdesp = desp.value;
    const itemamnt = amnt.value;
    const itemdate = date.value;
    desp.value = '';
    date.value = '';
    amnt.value = '';
    const newDiv = document.createElement('div');
    const lineBreak = document.createElement('br');
    newDiv.classList += 'dashboard';
    newDiv.innerHTML = `<div class="price-plate"><div><span>Item Description:</span> ${itemdesp}</div><div><span>Item Cost:</span>
    <span class="price">${itemamnt}</span></div><div><span>Purchase Date: </span>${itemdate}</div><button type = "button" id = "del-button">Delete</button></div>`;
    newDiv.querySelector('#del-button').addEventListener('click', function(evt) {
        this.parentElement.parentElement.remove();
        update();
    })
    disp.append(newDiv);
    update();
})