let firstNum = ""
let secondNum = ""
let resultNum = ""
let operation = ""
let isError = false

const isFirst = (val) => {
  return operation === ""
}

const onNumber = (val) => {
  if (isFirst()) {
    firstNum += val
  } else {
    secondNum += val
  }
  updateScreen()
}

const onOperation = (val) => {
  if (firstNum === "") {
    return
  }
  if (secondNum !== "") {
    // If we already have 2 numbers, and we click an operator
    // calculate the intermediate result, store it as the first
    // number and clear the second number
    let result = operate()
    if(result === null) {
      isError = true
    }
    firstNum = result
    secondNum = ""
    updateScreen()
    return
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
  const firstNumInt = parseInt(firstNum)
  const secondNumInt = parseInt(secondNum)
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
  operation = ""
  updateScreen()
}