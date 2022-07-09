class Calculator {
    constructor(previousOutputTextElement, currentOutputTextElement) {
        this.previousOutputTextElement = previousOutputTextElement;
        this.currentOutputTextElement = currentOutputTextElement;
        this.clear();
        this.memoryStorage = 0;
        this.openCounter = 0;
    }

    clear() {
        this.currentOutput = '';
        this.previousOutput = '';
        this.operation = undefined;
        this.stringOutput = '';
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

    chooseTrigOperation(operation) {
        this.currentOutput += operation.toString();
        this.currentOutput += "(";
        let currentOutputString = this.currentOutput.toString();

        if (currentOutputString[currentOutputString.length - 1] === ")") {
            this.computeTrig();
        }

        this.trigFunction = operation;
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
                if (current < 0) {
                    this.stringOutput = 'Imaginary';
                    computation = '';
                } else {
                computation = Math.sqrt(current)
                };
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

    computeTrig(angle) {
        let computation;
        let angleValue = parseFloat(angle);
        let sinIndex = currentOutputTextElement.innerText.indexOf("sin(");
        let cosIndex = currentOutputTextElement.innerText.indexOf("cos(");
        let tanIndex = currentOutputTextElement.innerText.indexOf("tan(");
        let trigIndex;

        if (sinIndex !== -1) {
            trigIndex = sinIndex;
        } else if (cosIndex !== -1) {
            trigIndex = cosIndex;
        } else if (tanIndex !== -1) {
            trigIndex = tanIndex;
        }

        if (document.getElementById('DEGRAD').value === "RAD") {
            switch (this.trigFunction) {
                case 'sin':
                    computation = Math.sin(angleValue);
                    break;
                case 'cos':
                    computation = Math.cos(angleValue);
                    break;
                case 'tan':
                    computation = Math.tan(angleValue);
                    break;
                default:
                    return;
            }
        } else if (document.getElementById('DEGRAD').value === "DEG") {
            angleValue = parseFloat(toRadians(angle));

            switch (this.trigFunction) {
                case 'sin':
                    computation = Math.sin(angleValue);
                    break;
                case 'cos':
                    computation = Math.cos(angleValue);
                    break;
                case 'tan':
                    computation = Math.tan(angleValue);
                    break;
                default:
                    return;
            }
        }

        if (trigIndex !== 0) {
            let prev = parseFloat(currentOutputTextElement.innerText.slice(0, trigIndex));

            this.currentOutput = computation * prev;
            this.operation = undefined;
            this.previousOutput = '';
        } else {
            this.currentOutput = computation;
            this.operation = undefined;
            this.previousOutput = '';
        }
    }

    appendLog(value) {
        this.currentOutput += "log("
    }

    computeLog(value) {
        let logIndex = currentOutputTextElement.innerText.indexOf('log(');

        if (logIndex !== 0) {
            let prev = parseFloat(currentOutputTextElement.innerText.slice(0, logIndex));
            this.currentOutput = Math.log10(parseFloat(value)) * prev;
            this.operation = undefined;
            this.previousOutput = '';
        } else {
            this.currentOutput = Math.log10(parseFloat(value))
            this.operation = undefined;
            this.previousOutput = '';
        }
    }

    parenthesis() {
        let prev = this.currentOutput[this.currentOutput.length - 1];

        if ((this.openCounter > 0 && Number.isInteger(parseFloat(prev))) || (this.openCounter > 0 && prev === ")")) {
            this.currentOutput += ")";
            this.openCounter--;
        } else if (this.openCounter === 0 || !Number.isInteger(parseFloat(prev))) {
            this.currentOutput += "(";
            this.openCounter++;
        }
    }

    //remove for now as it does not work with strings in the current output
    // getDisplayNumber(number) {
    //     const stringNumber = number.toString();
    //     const integerDigits = parseFloat(stringNumber.split('.')[0]);
    //     const decimalDigits = stringNumber.split('.')[1];
    //     let integerDisplay;

    //     if (isNaN(integerDigits)) {
    //         integerDisplay = ''
    //     } else {
    //         integerDisplay = integerDigits.toLocaleString('en', {
    //         maximumFractionDigits: 0}) //maximumFractionDigits makes sure there's no decimal points after this point
    //     }

    //     if (decimalDigits != null) {
    //         return `${integerDisplay}.${decimalDigits}`
    //     } else {
    //         return integerDisplay;
    //     }
    //     // .toLocaleString('en'); this adds the commas to the integers
    // }

    updateDisplay() {
        // this.currentOutputTextElement.innerText = `${this.getDisplayNumber(this.currentOutput)} ${this.stringOutput}`;
        if (this.stringOutput !== '') {
            this.currentOutputTextElement.innerText = `${this.currentOutput} ${this.stringOutput}`;
        } else {
            this.currentOutputTextElement.innerText = this.currentOutput
        }

        if (this.operation != null) {
            // this.previousOutputTextElement.innerText = `${this.getDisplayNumber(this.previousOutput)} ${this.operation}`
            this.previousOutputTextElement.innerText = `${(this.previousOutput)} ${this.operation}`
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
const trigOperationButtons = document.querySelectorAll('[data-trig-operation]')
const logButton = document.querySelector('[data-log-operation]');

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

// let beforeParentheses = '';
// let afterParentheses = '';
// let insideParentheses = '';

// function parenthesesOrder(value) {
//     if ()
// }

equalButton.addEventListener('click', button => {
    // if (currentOutputTextElement.innerText.includes("(")) {
    //     parenthesesOrder (currentOutputTextElement.innerText);
    // }

    if (currentOutputTextElement.innerText.includes('sin') || currentOutputTextElement.innerText.includes('cos') || currentOutputTextElement.innerText.includes('tan')) {
        let sinIndex = currentOutputTextElement.innerText.indexOf("sin(");
        let cosIndex = currentOutputTextElement.innerText.indexOf("cos(");
        let tanIndex = currentOutputTextElement.innerText.indexOf("tan(");
        let startIndex;

        if (sinIndex !== -1) {
            startIndex = sinIndex + 4;
        } else if (cosIndex !== -1) {
            startIndex = cosIndex + 4;
        } else if (tanIndex !== -1) {
            startIndex = tanIndex + 4;
        }

        let endIndex = currentOutputTextElement.innerText.length;
        let angle = currentOutputTextElement.innerText.slice(startIndex, endIndex);

        calculator.computeTrig(angle);
        calculator.updateDisplay();
    } else if (currentOutputTextElement.innerText.includes('log')) {
        let logIndex = currentOutputTextElement.innerText.indexOf('log(');
        let startIndex = logIndex + 4;
        let endIndex = currentOutputTextElement.innerText.length;
        let value = currentOutputTextElement.innerText.slice(startIndex, endIndex);

        calculator.computeLog(value);
        calculator.updateDisplay();
    } else {
        calculator.compute();
        calculator.updateDisplay();
    }
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})


deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

parenthesisButton.addEventListener('click', button => {
    calculator.parenthesis();
    calculator.updateDisplay();
})

const hiddenRow = document.querySelector('.hidden-row');
const expandButton = document.getElementById('expand-button');
const mainRow = document.querySelector('.main-row');

expandButton.addEventListener('click', button => {
    if (hiddenRow.classList.value.includes('hidden-row--hidden')) {
        hiddenRow.classList.remove('hidden-row--hidden');
        mainRow.classList.remove('main-row--show');
        mainRow.classList.add('main-row--shrunk');
    } else {
        hiddenRow.classList.add('hidden-row--hidden');
        mainRow.classList.remove('main-row--shrunk');
        mainRow.classList.add('main-row--show')
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

function flip() {
    let element = document.getElementById("expand-button");
    if (element.value === "v") element.value = "ʌ";
    else element.value = "v";
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


//need to include mobile compatiblity
//need to make functions work with parentheses

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

trigOperationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseTrigOperation(button.innerText);
        calculator.updateDisplay();
    })
})

logButton.addEventListener('click', button => {
    calculator.appendLog();
    calculator.updateDisplay();
})
