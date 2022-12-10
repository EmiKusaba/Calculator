let state = {
  firstNum: "",
  secondNum: "",
  operation: "",
  isError: false
}

const isFirst = () => {
  return state.operation === ""
}

const onNumber = (val) => {
  // console.log(val)
  if (val === "0" || val === ".") {
    // Cannot start with 0 or .
    if ((isFirst() ? state.firstNum : state.secondNum) === "") {
      return
    }
  }
  if (isFirst()) {
    state.firstNum += val
  } else {
    state.secondNum += val
  }
  updateScreen()
}

const onOperation = (val) => {
  // console.log(val)
  if (state.firstNum === "") {
    if (val === "-") {
      state.firstNum += val
      updateScreen()
    }
    return
  }
  if (state.secondNum !== "") {
    // If we already have 2 numbers, and we click an operator
    // calculate the intermediate result, store it as the first
    // number and clear the second number
    operate()
  }
  state.operation = (val)
  updateScreen()
}

const updateScreen = () => {
  // console.log(state)
  let screen = document.getElementById("screen")

  if (state.isError) {
    screen.innerHTML = "ERROR"
    return
  }

  screen.innerHTML = state.secondNum === "" ? state.firstNum : state.secondNum
}

const onEquals = () => {
  operate()
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
  if (state.firstNum === "" || state.secondNum === "" || state.operation === "") {
    state.isError = true
    return
  }
  const firstNumParsed = parseFloat(state.firstNum)
  const secondNumParsed = parseFloat(state.secondNum)
  let result = null
  switch (state.operation) {
    case "+":
      result = add(firstNumParsed, secondNumParsed)
      break
    case "-":
      result = subtract(firstNumParsed, secondNumParsed)
      break
    case "x":
      result = multiply(firstNumParsed, secondNumParsed)
      break
    case "/":
      result = divide(firstNumParsed, secondNumParsed)
      break
  }
  if (result === null) {
    state.isError = true
  } else {
    state.firstNum = result
    state.secondNum = ""
    state.operation = ""
  }
}

const onClear = () => {
  state.firstNum = ""
  state.secondNum = ""
  state.resultNum = ""
  state.operation = ""
  state.isError = false
  updateScreen()
}

document.addEventListener('keyup', e => {
  let value = e.key;
  if (/[0-9\.]/.test(value)) {
    onNumber(value);
  } else if (/[-+/*]/.test(value)) {
    onOperation(value);
  } else if (value === "=" || value === "Enter") {
    onEquals();
  }
})