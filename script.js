class Calculator {
    constructor(previousOutputTextElement, currentOutputTextElement) {
        this.previousOutputTextElement = previousOutputTextElement;
        this.currentOutputTextElement = currentOutputTextElement;
        this.clear();
        this.memoryStorage = 0;
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

        if(number === "π") {
            this.currentOutput = this.currentOutput.toString() + Math.PI.toString();
        } else
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
        this.memoryStorage = 0;
        this.currentOutput = '';
    }

    computeMemoryOperation(operation) {
        let computation;
        const current = parseFloat(this.currentOutput);
        const memory = parseFloat(this.memoryStorage);
        if (isNaN(current)) return;

        switch (operation) {
            case 'M-':
                computation = memory - current;
                break;
            case 'M+':
                computation = memory + current;
                break;
            default:
                return;
        }

        this.memoryStorage = computation;
        this.currentOutput = computation;
        this.operation = undefined;
    }

    storeMemory() {
        this.memoryStorage = this.currentOutput;
        this.currentOutput = '';
    }

    recallMemory() {
        this.currentOutput = this.memoryStorage;
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
            case '^':
                computation = Math.pow(prev, current);
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
        const current = parseFloat(this.currentOutput);

        if (isNaN(current)) return;

        switch (singleOperationButton) {
            case '%':
                computation = current * 0.01;
                break;
            case '√':
                // if (current < 0) {
                //     computation = 'error';
                // } else {
                computation = Math.sqrt(current)
                // };
                break;
            case '±':
                computation = current * -1;
                break;
            case '!':
                computation = factorial(current);
                break;
            default:
                return;
        }

        this.currentOutput = computation;
        this.operation = undefined;
        this.previousOutput = '';
    }

    // parenthesis() {
    //     const current = parseFloat(this.currentOutput);
    //     let counter = 0;

    //     if (counter === 0) {
    //         this.appendNumber("(");
    //         counter ++;
    //     }
    // }

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
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const singleOperationButtons = document.querySelectorAll('[data-single-operation]');
const equalButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const memoryClearButton = document.querySelector('[data-memory-clear]');
const memoryStoreButton = document.querySelector('[data-memory-storage]');
const memoryRecallButton = document.querySelector('[data-memory-recall]');
const memoryOperationButtons = document.querySelectorAll('[data-memory-operation]');
const previousOutputTextElement = document.querySelector('[data-previous-output]');
const currentOutputTextElement = document.querySelector('[data-current-output]');
const parenthesisButton = document.querySelector('[data-parenthesis]');

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

// parenthesisButton.addEventListener('click', button => {
//     calculator.parenthesis();
//     calculator.updateDisplay();
// })


//need to code in memory functions
//need to code in some additional functions?
//need to include mobile compatiblity


const hiddenRow = document.querySelector('.hidden-row');
const expandButton = document.querySelector('.expand-button');
const mainRow = document.querySelector('.main-row');

expandButton.addEventListener('click', button => {
    if (hiddenRow.classList.value.includes('hidden-row--hidden')) {
        hiddenRow.classList.remove('hidden-row--hidden');
        mainRow.classList.add('main-row--shrunk');
    } else {
        hiddenRow.classList.add('hidden-row--hidden');
        mainRow.classList.remove('main-row--shrunk');
    }
})

function factorial(number) {
    if (number === 0 || number === 1) {
        return 1;
    }

    let prev = factorial(number - 1);
    let product = number * prev;
    return product;
}

function change() {
    let element = document.getElementById("DEGRAD");
    if (element.value === "DEG") element.value = "RAD";
    else element.value = "DEG";
}

memoryStoreButton.addEventListener('click', button => {
    calculator.storeMemory();
    calculator.updateDisplay();
})

memoryRecallButton.addEventListener('click', button => {
    calculator.recallMemory();
    calculator.updateDisplay();
})

memoryClearButton.addEventListener('click', button => {
    calculator.memoryClear();
    calculator.updateDisplay();
})

memoryOperationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.computeMemoryOperation(button.innerText);
        calculator.updateDisplay();
    })
})
