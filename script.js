//TODO : 
// . on keyboard not works
// divide operation
// +/-
// % 
const numbers = document.querySelectorAll(".num")
const operations = document.querySelectorAll(".operation")

console.log(operations)

const acButton = document.querySelector("#ac")

const display = document.querySelector(".display")

let currentDisplay = "0";
let previousDisplay = "0"
let currentOperation = undefined
let summary = 0

let isLastClickEquals = false

numbers.forEach(num => addNumberEventListener(num))
operations.forEach(operationDiv => addOperationEventListener(operationDiv))

acButton.addEventListener("click", acButtonClick)

function addNumberEventListener(numberDiv) {
    numberDiv.addEventListener("click", onNumberClick)
    // console.log(numberDiv)
    // console.log(`id = ${numberDiv.id}`)
}

function addOperationEventListener(operationDiv) {
    operationDiv.addEventListener("click", onOperationClick)
    console.log(operationDiv)
    console.log(`id = ${operationDiv.id}`)
}

function onNumberClick(e) {
    if(currentDisplay.length > 8) {
        return
    }
    if(currentDisplay == "0" && e.target.id != "point") {
        currentDisplay = e.target.id
    } else if (e.target.id == "point" && currentDisplay.includes(".")) {
        return;
    } else {
        currentDisplay += (e.target.id == "point" ? "." : e.target.id)
    }
    updateCurrentDisplay()
    console.log(currentDisplay)
}

function updateCurrentDisplay() {
    display.textContent = currentDisplay
}

function acButtonClick() {
    clearCurrentDisplay()
    previousDisplay = "0"
    currentOperation = undefined
    summary = 0
    isLastClickEquals = false
}

function clearCurrentDisplay() {
    currentDisplay = "0";
    updateCurrentDisplay()
}


window.addEventListener('keydown', function(e){
    if (e.shiftKey == true) {
        if(e.code == "Digit8") {
            const key = document.getElementById("multiply");
            key.click()
            return
        }
        if(e.code == "Equal") {
            const key = document.getElementById("plus");
            key.click()
            return
        }
    }
    console.log(`key = ${e.key}, code = ${e.code}`)

    const key = document.querySelector(`div[keyCode='${e.code == "Enter" ? "Equal" : e.code}']`);
    // console.log(key)
    if(key == null) {
        if(e.code == "Backspace") {
            backspaceClick()
        }
        return
    }
    key.click();
});


function onOperationClick(e) {
    if (e.target.id == "equals") {
        onEqualsClick()
        return
    }
    if (isLastClickEquals) {
        currentOperation = undefined
        isLastClickEquals = false
    }

    if (currentOperation == undefined) {
        summary = currentDisplay
        console.log("current operation is undefined")

    } else if (currentOperation == 'plus') {
        summary = Number(summary) + Number(currentDisplay)
    } else if (currentOperation == 'minus') {
        summary = Number(summary) - Number(currentDisplay)
    } else if (currentOperation == 'multiply') {
        summary = Number(summary) * Number(currentDisplay)
    } else if (currentOperation == 'divide') {
        if (currentDisplay == "0") {
            return
        }
        summary = Number(summary) / Number(currentDisplay)
    } 

    currentOperation = e.target.id
    clearCurrentDisplay()
}

function onEqualsClick() {
    if (currentOperation == undefined ) {
        return
    }
    let numberToProcess = isLastClickEquals ? previousDisplay : currentDisplay
    previousDisplay = isLastClickEquals ? previousDisplay : currentDisplay
    if (currentOperation == 'plus') {
        summary = Number(summary) + Number(numberToProcess)
    } else if (currentOperation == 'minus') {
        summary = Number(summary) - Number(numberToProcess)
    } else if (currentOperation == 'multiply') {
        summary = Number(summary) * Number(numberToProcess)
    } else if (currentOperation == 'divide') {
        if (currentDisplay == "0") {
            return
        }
        summary = Number(summary) / Number(numberToProcess)
    }
    currentDisplay = summary
    isLastClickEquals = true

    updateCurrentDisplay()

}

function backspaceClick() {
    currentDisplay = currentDisplay.length == 1 ? "0" : currentDisplay.substring(0, currentDisplay.length - 1)
    updateCurrentDisplay()
}