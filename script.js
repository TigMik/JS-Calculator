const numberButtons = document.querySelectorAll('[data-number]');
console.log(numberButtons, numberButtons[0]);

const operationButtons = document.querySelectorAll("[data-operation]");
console.log(operationButtons, operationButtons[3]);

const equalsButton = document.querySelector("[data-equals]");
console.log(equalsButton);

const deleteButton = document.querySelector("[data-delete]");
console.log(deleteButton);

const allClearButton = document.querySelector("[data-all-clear]");
console.log(allClearButton);

const previousOperandTextElement = document.querySelector("[data-previous-operand]");
console.log(previousOperandTextElement);

const currentOperandTextElement = document.querySelector("[data-current-operand]")
console.log(currentOperandTextElement);

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (this.currentOperand.includes(".") && number === '.') return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand == '') return;
        if (this.previousOperand != '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let result;
        let prev = parseFloat(this.previousOperand);
        let curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr)) return;
        if (this.operation == "+") {
            result = prev + curr
        } else if (this.operation == "-") {
            result = prev - curr
        } else if (this.operation == "*") {
            result = prev * curr;
        } else if (this.operation == "÷") {
            result = prev / curr;
        } else return;
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
console.log(calculator);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});


operationButtons.forEach(operate);

function operate(button) {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
}

equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
})
