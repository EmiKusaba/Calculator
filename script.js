let firstNum = ""
let secondNum = ""
let isFirst = true
let operation = ""

const onNumber = (val) => {
  if (isFirst) {
    firstNum += val
  } else {
    secondNum += val
  }
  console.log(val)

  updateScreen()
}

const onOperation = (val) => {
  if (firstNum === "") {
    return
  }
  isFirst = false
  operation = (val)
  console.log(operation)

  updateScreen()
}

const updateScreen = () => {
  document.getElementById("screen").innerHTML = firstNum + " " + operation + " " + secondNum
}

const onEquals = () => {
  if (firstNum === "" || secondNum === "" || operation === "") {
    return screen
  }
  let screen = document.getElementById("screen")
  const firstNumInt = parseInt(firstNum)
  const secondNumInt = parseInt(secondNum)
  switch (operation) {
    case "+":
      screen.innerHTML = firstNumInt + secondNumInt
      break
    case "-":
      screen.innerHTML = firstNumInt - secondNumInt
      break
    case "x":
      screen.innerHTML = firstNumInt * secondNumInt
      break
    case "/":
      screen.innerHTML = firstNumInt / secondNumInt
      break
    default:
      "Choose an operation"
      break
  }
}

const onClear = () => {
  firstNum = ""
  secondNum = ""
  isFirst = true
  operation = ""
  updateScreen()
}