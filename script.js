class Calculator {
    constructor(previousOutputTextElement, currentOutputTextElement) {
        this.previousOutputTextElement = previousOutputTextElement;
        this.currentOutputTextElement = currentOutputTextElement;
        this.clear();
    }

    clear() {
        this.currentOutput = '';
        this.previousOutput = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOutput = this.currentOutput.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOutput.includes('.')) return;
        this.currentOutput = this.currentOutput.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOutput === '') return;
        if (this.previousOutput !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOutput = this.currentOutput;
        this.currentOutput = '';
    }

    memoryClear() {

    }

    chooseMemoryOperation(operation) {

    }

    storeMemory() {

    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOutput);
        const current = parseFloat(this.currentOutput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '÷':
                computation = prev / current;
                break;
            case 'x':
                computation = prev * current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '+':
                computation = prev + current;
                break;
            default:
                return;
        }

        this.currentOutput = computation;
        this.operation = undefined;
        this.previousOutput = '';
    }

    computeSingle(singleOperationButton) {
        let computation;
        // const prev = parseFloat(this.previousOutput);
        const current = parseFloat(this.currentOutput);

        if (isNaN(current)) return;

        switch (singleOperationButton) {
            case '%':
                computation = current * 0.01;
                break;
            case '√':
                computation = Math.sqrt(current);
                break;
            case '±':
                    computation = current * -1;
                break;
            default:
                return;
        }

        this.currentOutput = computation;
        this.operation = undefined;
        this.previousOutput = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0}) //maximumFractionDigits makes sure there's no decimal points after this point
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
        // .toLocaleString('en'); this adds the commas to the integers :)
    }

    updateDisplay() {
        this.currentOutputTextElement.innerText = this.getDisplayNumber(this.currentOutput);

        if (this.operation != null) {
            this.previousOutputTextElement.innerText = `${this.getDisplayNumber(this.previousOutput)} ${this.operation}`
        } else {
            this.previousOutputTextElement.innerText = '';
        }
    }

    updateSingleDisplay() {
        this.currentOutputTextElement.innerText = this.getDisplayNumber(this.currentOutput);

        if (this.operation != null) {
            this.previousOutputTextElement.innerText = '';
        } else {
            this.previousOutputTextElement.innerText = `${this.getDisplayNumber(this.previousOutput)} ${this.operation}`
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const singleOperationButtons = document.querySelectorAll('[data-single-operation]');
const equalButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const memoryClearButton = document.querySelector('[data-memory-clear]');
const memoryOperationButtons = document.querySelectorAll('[data-memory-operation]');
const previousOutputTextElement = document.querySelector('[data-previous-output]');
const currentOutputTextElement = document.querySelector('[data-current-output]');

const calculator = new Calculator(previousOutputTextElement, currentOutputTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

singleOperationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.computeSingle(button.innerText);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})


deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})


//but what if I want to use - to make a negative number
//need to add % operator and square root
//need to code in memory functions
//need to code in +/- functions


//maybe do an additinoal functions tab animation? i.e. something like your phone calculator
