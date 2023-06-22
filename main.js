document.getElementById('resultCalc').readOnly = true;



let btnResult = document.querySelector('#btnResult');
let btnMinus = document.querySelector('#btnMinus');
let btnDel = document.querySelector('#btnDel');
let btnPlus = document.querySelector('#btnPlus');
let btnUmn = document.querySelector('#btnUmn');

let result;




btnMinus.onclick = () => {
 let firstNumber = document.getElementById('firstNumber').value;
 let secondNumber = document.getElementById('secondNumber').value;
 result = firstNumber - secondNumber;
 return result;
}

btnDel.onclick = () => {
 let firstNumber = document.getElementById('firstNumber').value;
 let secondNumber = document.getElementById('secondNumber').value;
 result = firstNumber / secondNumber;
 return result;
}

btnPlus.onclick = () => {
 let firstNumber = document.getElementById('firstNumber').value;
 let secondNumber = document.getElementById('secondNumber').value;
 firstNumber =  Number(firstNumber);
 secondNumber =  Number(secondNumber);
 result = firstNumber + secondNumber;
 console.log("result",result);
 return result;
}

btnUmn.onclick = () => {
 let firstNumber = document.getElementById('firstNumber').value;
 let secondNumber = document.getElementById('secondNumber').value;
 result = firstNumber * secondNumber;
 return result;
}


btnResult.onclick = () => {
 console.log("result",result);
}







