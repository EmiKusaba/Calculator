let firstNum = ""
let secondNum = ""
let resultNum = ""
let operation = ""
let isError = false

const isFirst = (val) => {
  return operation === ""
}

const onNumber = (val) => {
  if (val === "0" || val === ".") {
    // Cannot start with 0 or .
    if ((isFirst() ? firstNum : secondNum) === "") {
      return
    }
  }
  if (isFirst()) {
    firstNum += val
  } else {
    secondNum += val
  }
  updateScreen()
}

const onOperation = (val) => {
  if (firstNum === "") {
    if (val === "-") {
      firstNum += val
      updateScreen()
    }
    return
  }
  if (secondNum !== "") {
    // If we already have 2 numbers, and we click an operator
    // calculate the intermediate result, store it as the first
    // number and clear the second number
    let result = operate()
    if (result === null) {
      isError = true
    }
    firstNum = result
    secondNum = ""
    updateScreen()
    return
  }
  if (resultNum !== "") {
    // We're continuing after pressing equals
    resultNum = ""
  }
  operation = (val)
  updateScreen()
}

const updateScreen = () => {
  let screen = document.getElementById("screen")

  if (isError) {
    screen.innerHTML = "ERROR"
    return
  }

  if (resultNum !== "") {
    screen.innerHTML = resultNum
    return
  }

  screen.innerHTML = secondNum === "" ? firstNum : secondNum
}

const onEquals = () => {
  let result = operate()
  if (result === null) {
    isError = true
  } else {
    resultNum = result
    // So that we can continue operating on this result
    firstNum = resultNum
    secondNum = ""
    operation = ""
  }
  updateScreen()
}

const add = (a, b) => {
  return a + b
}

const subtract = (a, b) => {
  return a - b
}

const multiply = (a, b) => {
  return a * b
}

const divide = (a, b) => {
  return a / b
}

const operate = () => {
  if (firstNum === "" || secondNum === "" || operation === "") {
    return null
  }
  const firstNumInt = parseFloat(firstNum)
  const secondNumInt = parseFloat(secondNum)
  switch (operation) {
    case "+":
      return add(firstNumInt, secondNumInt)
    case "-":
      return subtract(firstNumInt, secondNumInt)
    case "x":
      return multiply(firstNumInt, secondNumInt)
    case "/":
      return divide(firstNumInt, secondNumInt)
  }
  return null
}

const onClear = () => {
  firstNum = ""
  secondNum = ""
  resultNum = ""
  operation = ""
  isError = false
  updateScreen()
}

document.addEventListener('keyup', e => {
  let value = e.key;
  if (/[0-9\.]/.test(value)) onNumber(value);
  else if (/[-+/*]/.test(value)) onOperation(value);
  else if (value === "=") onEquals();
})