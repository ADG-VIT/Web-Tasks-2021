let count=0
let mod_count=-1;
let sum=0;
function xyz()
{
  const a=document.querySelector("#item");
  const b=document.querySelector("#amount");
  const c=document.querySelector("#date");
  if(mod_count===-1)
  {
    const d=document.querySelector("#output");
    d.innerHTML=d.innerHTML+ "<div class='commodity'>" + "<div class='expense2'>"+'<button type="button" name="button" id="clear" class="clear" onclick="abc('+count+')">Delete</button>' +'<button type="button" name="button" id="modify" class="modify" onclick="def('+count+')">modify</button>' + "</div>" + "<div class='expense2'>" + 'Description:    ' + "<div class='expense3'>" + a.value + " </div> " +"</div>"+ "<div class='expense2'>" + 'Expense Amount:    '+ "<div id='expense1'>"  + b.value+ "</div>" + "</div>"  + "<div class='expense2'>" + 'Date:    ' + "<div class='expense3'>" + c.value + "</div>" + "</div>" +'<br>'+  '<br>'+ "</div>";
    sum=sum+ parseInt(b.value);
    let temp=document.querySelectorAll('.headings')[1];
    temp.innerHTML="<h2>'Expense Database'</h2>" + "<br>" + "<h2>Money Spent:" + sum + "</h2>";
    count=count+1;
  }
  else
  {
    let e=document.querySelectorAll('.commodity');
    let f=document.querySelectorAll("#expense1");
    sum=sum-parseInt(f[mod_count].innerHTML);
    e[mod_count].innerHTML="<div class='expense2'>"+'<button type="button" name="button" id="clear" class="clear" onclick="abc('+mod_count+')">clear</button>' +'<button type="button" name="button" id="modify" class="modify" onclick="def('+mod_count+')">modify</button>' + "</div>" + "<div class='expense2'>" +'Description:    ' + "<div class='expense3'>" + a.value + "</div>" +"</div>"+"<div class='expense2'>"+ 'Expense Amount:    '+ "<div id='expense1'>" + b.value+"</div>" + "</div>" + "<div class='expense2'>" + 'Date:    ' + "<div class='expense3'>" + c.value + "</div>" + "</div>" + '<br>'+  '<br>';
    sum=sum+parseInt(b.value);
    let temp=document.querySelectorAll('.headings')[1];
    temp.innerHTML="<h2>'Expense Database'</h2>" + "<br>" + "<h2>Money Spent:" + sum + "</h2>";
    mod_count=-1;
  }


}


function abc(i)
{
  let e=document.querySelectorAll('.commodity');
  let f=document.querySelectorAll("#expense1");
  sum=sum-parseInt(f[i].innerHTML);
  let temp=document.querySelectorAll('.headings')[1];
  temp.innerHTML="<h2>'Expense Database'</h2>" + "<br>" + "<h2>Money Spent:" + sum + "</h2>";
  e[i].innerHTML="<div id='expense1'></div>";
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