document.getElementById('resultCalc').readOnly = true;

let firstNumberInput = document.querySelector('#firstNumber');
let secondNumberInput = document.querySelector('#secondNumber');

let btnResult = document.querySelector('#btnResult');
let btnMinus = document.querySelector('#btnMinus');
let btnDel = document.querySelector('#btnDel');
let btnPlus = document.querySelector('#btnPlus');
let btnUmn = document.querySelector('#btnUmn');
let btnClear = document.querySelector('#btnClear');
let result;

let btnOne = document.querySelector('#one');
let btnTwo = document.querySelector('#two');
let btnThree = document.querySelector('#three');
let btnFour = document.querySelector('#four');
let btnFive = document.querySelector('#five');
let btnSix = document.querySelector('#six');
let btnSeven = document.querySelector('#seven');
let btnEight = document.querySelector('#eight');
let btnNine = document.querySelector('#nine');
let btnZero = document.querySelector('#zero');
let btnDoubleZero = document.querySelector('#doubleZero');
let btnPoint = document.querySelector('#point');

let inputs;

firstNumberInput.onclick = () => {
 inputs = 'firstNumber';
 return inputs;
}

secondNumberInput.onclick = () => {
 inputs = 'secondNumber';
 return inputs;
}

function MissEnter() {
 if (inputs == null) {
  alert("Щелкните и введите значения в поля!");
 }
};


  btnOne.onclick = () => {
   MissEnter();
   document.getElementById(inputs).value += 1
  };
  btnTwo.onclick = () => {
   MissEnter();
   document.getElementById(inputs).value += 2
  };
  btnThree.onclick = () => {
   MissEnter();
   document.getElementById(inputs).value += 3
  };
  btnFour.onclick = () => {
   MissEnter();
   document.getElementById(inputs).value += 4
  };
  btnFive.onclick = () => {
   MissEnter();
   document.getElementById(inputs).value += 5
  };
  btnSix.onclick = () => {
   MissEnter();
   document.getElementById(inputs).value += 6
  };
  btnSeven.onclick = () => {
   MissEnter();
   document.getElementById(inputs).value += 7
  };
  btnEight.onclick = () => {
   MissEnter();
   document.getElementById(inputs).value += 8
  };
  btnNine.onclick = () => {
   MissEnter();
   document.getElementById(inputs).value += 9
  };
  btnZero.onclick = () => {
   MissEnter();
   document.getElementById(inputs).value += 0
  };
  btnDoubleZero.onclick = () => {
   MissEnter();
   document.getElementById(inputs).value += '00'
  };
  btnPoint.onclick = () => {
   MissEnter();
   btnPoint = document.getElementById(inputs).value += `.`
  };





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
 if (document.getElementById('resultCalc').value == null) {
   btnResult = document.getElementById('resultCalc').value+=result;
 } else {
   document.getElementById('resultCalc').value = null;
   btnResult = document.getElementById('resultCalc').value+=result;
 }
}

btnClear.onclick = () => {
  document.getElementById('resultCalc').value = null;
  document.getElementById('firstNumber').value = null;
  document.getElementById('secondNumber').value = null;
}






