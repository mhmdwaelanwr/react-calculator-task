var firstNumber = 0;
var mathOperator = "";
var startNewNumber = false;

function addNumber(number) {
  var screen = document.getElementById("screen");

  if (screen.value == "0" || startNewNumber == true) {
    screen.value = number;
    startNewNumber = false;
  } else {
    screen.value = screen.value + number;
  }
}

function addDot() {
  var screen = document.getElementById("screen");

  if (screen.value.indexOf(".") == -1) {
    screen.value = screen.value + ".";
  }
}

function clearScreen() {
  document.getElementById("screen").value = "0";
  firstNumber = 0;
  mathOperator = "";
  startNewNumber = false;
}

function setOperator(op) {
  firstNumber = Number(document.getElementById("screen").value);
  mathOperator = op;
  startNewNumber = true;
}

function calculate() {
  var screen = document.getElementById("screen");
  var secondNumber = Number(screen.value);
  var answer = 0;

  if (mathOperator == "+") {
    answer = firstNumber + secondNumber;
  }

  if (mathOperator == "-") {
    answer = firstNumber - secondNumber;
  }

  if (mathOperator == "*") {
    answer = firstNumber * secondNumber;
  }

  if (mathOperator == "/") {
    if (secondNumber == 0) {
      screen.value = "Error";
      return;
    }
    answer = firstNumber / secondNumber;
  }

  screen.value = answer;
  startNewNumber = true;
}

function changeSign() {
  var screen = document.getElementById("screen");
  screen.value = Number(screen.value) * -1;
}

function percentage() {
  var screen = document.getElementById("screen");
  screen.value = Number(screen.value) / 100;
}

function deleteNumber() {
  var screen = document.getElementById("screen");

  if (screen.value.length > 1) {
    screen.value = screen.value.substring(0, screen.value.length - 1);
  } else {
    screen.value = "0";
  }
}
