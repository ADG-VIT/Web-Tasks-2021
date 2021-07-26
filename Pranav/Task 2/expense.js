var names = document.querySelector('.name')
var searchbar = document.querySelector('input[name="searchbar"]')
const ul = document.querySelector('.ulclass')
var p = document.querySelector('.p')



const add = document.querySelector('.add')

add.addEventListener('submit',e=>{
    e.preventDefault()
    var desc = document.querySelector('#Description').value
    var amt = document.querySelector('#Amount').value
    var date = document.querySelector('#Date').value
    
    const li = document.createElement('li')
    const namespan = document.createElement('span')
    const amtspan = document.createElement('span')
    const datespan = document.createElement('span')
    const deletespan = document.createElement('span')
    
    namespan.textContent = desc
    amtspan.textContent = amt
    datespan.textContent = date
    deletespan.textContent = "delete"

    document.querySelector('#Description').value = ''
    document.querySelector('#Amount').value = ''
    document.querySelector('#Date').value = ''

    li.classList.add('liclass')
    deletespan.classList.add('delete')
    amtspan.classList.add('amount')

    li.appendChild(namespan)
    li.appendChild(amtspan)
    li.appendChild(datespan)
    li.appendChild(deletespan)
    ul.appendChild(li)
   
    
    var amount = document.querySelectorAll('.amount')
    console.log(amount)

    var addi = 0

    for(let i of amount)
    {
        addi += Number(i.textContent)
    }

    p.textContent = addi
    
    
})

ul.addEventListener('click',(e)=>{
    if(e.target.className == 'delete'){

        const date = e.target.previousSibling
        const amt = date.previousSibling
        p.textContent -= amt.textContent

        const li = e.target.parentElement
        ul.removeChild(li)
    
    }    
})

document.querySelector('#Description').value = ''
document.querySelector('#Amount').value = ''
document.querySelector('#Date').value = ''


searchbar.addEventListener('keyup',e => {
    const letter = e.target.value.toLowerCase()
    const li = document.querySelectorAll('li')
    li.forEach(item=>{
        const name = item.firstElementChild.textContent
        if(name.indexOf(letter) != -1)
        {
            item.style.display = 'flex'
        }
        else
        item.style.display = 'none'
    })
})