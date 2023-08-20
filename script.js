
// this programme will start out with three empty variables:
let currentNum = "";
let previousNum = "";
let operator = "";

// All variables below are retrieved by their HTML class name. 
const currentDisplayNumber = document.querySelector(".currentNumber"); // current number display. 
const previousDisplayNumber = document.querySelector(".previousNumber"); // previous number display. 
const numberButtons = document.querySelectorAll(".number"); // all number buttons. 
const operators = document.querySelectorAll(".operator"); // all operation buttons. 
const equal = document.querySelector(".equal"); // the = button. 
const clear = document.querySelector(".clear"); // the clear button 

clear.addEventListener("click", clearCalculator);


equal.addEventListener("click", () => {   // if both the current and previous number exists, do the calculation when "=" is pressed. 
  if (currentNum != "" && previousNum != "") {
    compute();
  }
});

numberButtons.forEach((btn) => { // each number button should activate the "handlenumber" function. 
    btn.addEventListener("click", (e) => {
      handleNumber(e.target.textContent); // the argument is the button number. 
    });
  });

  operators.forEach((btn) => {  //each operator button should activate the "handleoperator" function. 
    btn.addEventListener("click", (e) => {
      handleOperator(e.target.textContent);
    });
  });

  function handleNumber(number) 
  { 
    if (previousNum !== "" && currentNum !== "" && operator === "") // will be skipped the first time. 
    {
      previousNum = "";
      currentDisplayNumber.textContent = currentNum;
    }
    if (currentNum.length <= 11) // while the current number has less than or is equal to 11 characters, append it on the screen. 
     {
      currentNum += number;
      currentDisplayNumber.textContent = currentNum;
    }
  }

  function handleOperator(op)
   {
    if (previousNum === "" && currentNum!=='') // if an operator is chosen, and the previous number is empty..
    {
      previousNum = currentNum; // ..then make the current number into the previous number. 
      operatorCheck(op); // print the operator 
    } 
    else if (previousNum!="" && currentNum === "") // if the previous number is already set, then just print the operator. 
    {
      operatorCheck(op);
    } 
    else if (previousNum!="" && currentNum!="") 
    {
      compute();
      operator = op;
      currentDisplayNumber.textContent = "0";
      previousDisplayNumber.textContent = previousNum + " " + operator;
    }
  }
  
  function operatorCheck(text) 
  {
    operator = text;
    previousDisplayNumber.textContent = previousNum + " " + operator;
    currentDisplayNumber.textContent = "0";
    currentNum = "";
  }

  function roundNumber(num)
   {
    return Math.round(num * 100000) / 100000;
  }

  function clearCalculator() {
    currentNum = "";
    previousNum = "";
    operator = "";
    currentDisplayNumber.textContent = "0";
    previousDisplayNumber.textContent = "";
  }

  function displayResults() 
  {
    if (previousNum.length <= 11) 
    {
      currentDisplayNumber.textContent = previousNum;
    } else 
    {
      currentDisplayNumber.textContent = previousNum.slice(0, 11) + "...";
    }
    previousDisplayNumber.textContent = "";
    operator = "";
    currentNum = "";
  }
  

function compute() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);
  
    if (operator === "+") 
    {
      previousNum += currentNum;
    }
     else if (operator === "-") 
    {
      previousNum -= currentNum;
    } 
    else if (operator === "x") 
    {
      previousNum *= currentNum;
    }
     else if (operator === "/") 
    {
      if (currentNum <= 0) {
        previousNum = "Error";
        displayResults();
        return;
      }
      previousNum /= currentNum;
    }
    previousNum = roundNumber(previousNum);
    previousNum = previousNum.toString();
    displayResults();
  }
  
