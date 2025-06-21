
var txtNum=document.getElementById("inputNum");

function clr()
{
   txtNum.value="";
}

function cancel(){
txtNum.value=txtNum.value.substr(0,txtNum.value.length-1);
}


function calculate(){
txtNum.value=eval(txtNum.value);
}


function concat(v){
txtNum.value+=v;
}

