import { useState } from 'react'

function App() {
  const [display, setDisplay] = useState('0')
  const [fristNumber, setFristNumber] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForNumber, setWaitingForNumber] = useState(false)

  function addNumber(number) {
    if (waitingForNumber) {
      setDisplay(number)
      setWaitingForNumber(false)
      return
    }

    if (display === '0') {
      setDisplay(number)
    } else if (display.length < 12) {
      setDisplay(display + number)
    }
  }

  function addDecimal() {
    if (waitingForNumber) {
      setDisplay('0.')
      setWaitingForNumber(false)
      return
    }

    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  function clearCalculator() {
    setDisplay('0')
    setFristNumber(null)
    setOperator(null)
    setWaitingForNumber(false)
  }

  function deleteLast() {
    if (waitingForNumber) return

    if (display.length === 1 || (display.length === 2 && display.startsWith('-'))) {
      setDisplay('0')
    } else {
      setDisplay(display.slice(0, -1))
    }
  }

  function changeSign() {
    if (display === '0') return

    if (display.startsWith('-')) {
      setDisplay(display.slice(1))
    } else {
      setDisplay('-' + display)
    }
  }

  function percentage() {
    const number = Number(display)
    setDisplay(String(number / 100))
  }

  function doMath(first, second, mathOperator) {
    if (mathOperator === '+') return first + second
    if (mathOperator === '-') return first - second
    if (mathOperator === '×') return first * second
    if (mathOperator === '÷') return second === 0 ? 'Error' : first / second
    return second
  }

  function chooseOperator(nextOperator) {
    const inputValue = Number(display)

    if (operator && !waitingForNumber && fristNumber !== null) {
      const result = doMath(fristNumber, inputValue, operator)

      if (result === 'Error') {
        setDisplay('Error')
        setFristNumber(null)
        setOperator(null)
        setWaitingForNumber(true)
        return
      }

      const shortResult = Number(result.toFixed(8))
      setDisplay(String(shortResult))
      setFristNumber(shortResult)
    } else {
      setFristNumber(inputValue)
    }

    setOperator(nextOperator)
    setWaitingForNumber(true)
  }

  function calculate() {
    if (operator === null || fristNumber === null || waitingForNumber) return

    const secondNumber = Number(display)
    const result = doMath(fristNumber, secondNumber, operator)

    if (result === 'Error') {
      setDisplay('Error')
    } else {
      setDisplay(String(Number(result.toFixed(8))))
    }

    setFristNumber(null)
    setOperator(null)
    setWaitingForNumber(true)
  }

  return (
    <main className="page">
      <div className="calculator">
        <div className="top-text">
          <span>Calculator</span>
          <small>React Task</small>
        </div>

        <div className="screen">
          <div className="small-operation">
            {fristNumber !== null && operator ? `${fristNumber} ${operator}` : ' '}
          </div>
          <div className="result">{display}</div>
        </div>

        <div className="buttons">
          <button className="gray" onClick={clearCalculator}>AC</button>
          <button className="gray" onClick={changeSign}>+/-</button>
          <button className="gray" onClick={percentage}>%</button>
          <button className="orange" onClick={() => chooseOperator('÷')}>÷</button>

          <button onClick={() => addNumber('7')}>7</button>
          <button onClick={() => addNumber('8')}>8</button>
          <button onClick={() => addNumber('9')}>9</button>
          <button className="orange" onClick={() => chooseOperator('×')}>×</button>

          <button onClick={() => addNumber('4')}>4</button>
          <button onClick={() => addNumber('5')}>5</button>
          <button onClick={() => addNumber('6')}>6</button>
          <button className="orange" onClick={() => chooseOperator('-')}>-</button>

          <button onClick={() => addNumber('1')}>1</button>
          <button onClick={() => addNumber('2')}>2</button>
          <button onClick={() => addNumber('3')}>3</button>
          <button className="orange" onClick={() => chooseOperator('+')}>+</button>

          <button className="delete" onClick={deleteLast}>DEL</button>
          <button onClick={() => addNumber('0')}>0</button>
          <button onClick={addDecimal}>.</button>
          <button className="orange" onClick={calculate}>=</button>
        </div>

        <p className="note">Simple calculator made with React useState.</p>
      </div>
    </main>
  )
}

export default App
