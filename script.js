var e = React.createElement;

function App() {
  var displayState = React.useState("0");
  var display = displayState[0];
  var setDisplay = displayState[1];

  var firstState = React.useState(null);
  var firstNumber = firstState[0];
  var setFirstNumber = firstState[1];

  var operatorState = React.useState(null);
  var operator = operatorState[0];
  var setOperator = operatorState[1];

  var newNumberState = React.useState(false);
  var newNumber = newNumberState[0];
  var setNewNumber = newNumberState[1];

  function addNumber(number) {
    if (display === "Error" || newNumber === true) {
      setDisplay(number);
      setNewNumber(false);
    } else if (display === "0") {
      setDisplay(number);
    } else if (display.length < 10) {
      setDisplay(display + number);
    }
  }

  function addDot() {
    if (newNumber === true) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  }

  function clearAll() {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setNewNumber(false);
  }

  function chooseOperator(symbol) {
    if (display === "Error") {
      return;
    }

    setFirstNumber(Number(display));
    setOperator(symbol);
    setNewNumber(true);
  }

  function calculate() {
    if (firstNumber === null || operator === null || display === "Error") {
      return;
    }

    var secondNumber = Number(display);
    var answer = 0;

    if (operator === "+") {
      answer = firstNumber + secondNumber;
    }

    if (operator === "-") {
      answer = firstNumber - secondNumber;
    }

    if (operator === "×") {
      answer = firstNumber * secondNumber;
    }

    if (operator === "÷") {
      if (secondNumber === 0) {
        setDisplay("Error");
        setFirstNumber(null);
        setOperator(null);
        return;
      }
      answer = firstNumber / secondNumber;
    }

    answer = Math.round(answer * 100000) / 100000;
    setDisplay(String(answer));
    setFirstNumber(null);
    setOperator(null);
    setNewNumber(true);
  }

  function changeSign() {
    if (display === "0" || display === "Error") {
      return;
    }

    if (display.charAt(0) === "-") {
      setDisplay(display.substring(1));
    } else {
      setDisplay("-" + display);
    }
  }

  function percentage() {
    if (display !== "Error") {
      setDisplay(String(Number(display) / 100));
    }
  }

  function deleteLast() {
    if (display === "Error" || newNumber === true) {
      return;
    }

    if (display.length <= 1) {
      setDisplay("0");
    } else {
      setDisplay(display.substring(0, display.length - 1));
    }
  }

  function makeButton(text, cssClass, clickFunction) {
    return e(
      "button",
      {
        className: cssClass,
        onClick: clickFunction
      },
      text
    );
  }

  var smallText = "";
  if (firstNumber !== null && operator !== null) {
    smallText = firstNumber + " " + operator;
  }

  return e(
    "div",
    { className: "calculator" },
    e("h1", { className: "title" }, "Calculator"),
    e(
      "div",
      { className: "screen" },
      e("div", { className: "operation" }, smallText),
      e("div", { className: "result" }, display)
    ),
    e(
      "div",
      { className: "buttons" },
      makeButton("AC", "gray", clearAll),
      makeButton("+/-", "gray", changeSign),
      makeButton("%", "gray", percentage),
      makeButton("÷", "operator", function () { chooseOperator("÷"); }),

      makeButton("7", "", function () { addNumber("7"); }),
      makeButton("8", "", function () { addNumber("8"); }),
      makeButton("9", "", function () { addNumber("9"); }),
      makeButton("×", "operator", function () { chooseOperator("×"); }),

      makeButton("4", "", function () { addNumber("4"); }),
      makeButton("5", "", function () { addNumber("5"); }),
      makeButton("6", "", function () { addNumber("6"); }),
      makeButton("-", "operator", function () { chooseOperator("-"); }),

      makeButton("1", "", function () { addNumber("1"); }),
      makeButton("2", "", function () { addNumber("2"); }),
      makeButton("3", "", function () { addNumber("3"); }),
      makeButton("+", "operator", function () { chooseOperator("+"); }),

      makeButton("DEL", "gray", deleteLast),
      makeButton("0", "", function () { addNumber("0"); }),
      makeButton(".", "", addDot),
      makeButton("=", "operator", calculate)
    ),
    e("p", { className: "note" }, "By Mohamed Anwar")
  );
}

var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(e(App));
