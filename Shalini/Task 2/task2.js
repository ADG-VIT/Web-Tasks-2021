
let count=0
let mod_count=-1;

function xyz()
{
  const a=document.querySelector("#item");
  const b=document.querySelector("#amount");
  const c=document.querySelector("#date");
  if(mod_count===-1)
  {
    const d=document.querySelector("#output");
    d.innerHTML=d.innerHTML+ "<div class='commodity'>" + '<button type="button" name="button" id="clear" class="clear" onclick="abc('+count+')">clear</button>' +'<button type="button" name="button" id="modify" class="modify" onclick="def('+count+')">modify</button>' + 'Description:    ' + a.value +'<br>'+ 'Expense Amount:    '+ b.value+'<br>' + 'Date:    ' + c.value +'<br>'+  '<br>'+ "</div>";
    count=count+1;
  }
  else
  {
    console.log(mod_count);
    let e=document.querySelectorAll('.commodity');
    e[mod_count].innerHTML='<button type="button" name="button" id="clear" class="clear" onclick="abc('+mod_count+')">clear</button>' +'<button type="button" name="button" id="modify" class="modify" onclick="def('+mod_count+')">modify</button>' + 'Description:    ' + a.value +'<br>'+ 'Expense Amount:    '+ b.value+'<br>' + 'Date:    ' + c.value +'<br>'+  '<br>';
    mod_count=-1;
  }


}


function abc(i)
{
  let e=document.querySelectorAll('.commodity');
  e[i].innerHTML="";
}


function def(i)
{
  alert("Pls fill the form again to modify.");
  window.scrollTo(0,0);
  document.querySelector("#item").value="";
  document.querySelector("#amount").value="";
  document.querySelector("#date").value="";
  mod_count=i;
}
