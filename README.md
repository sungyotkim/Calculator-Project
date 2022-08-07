# Calculator-Project
Creating a calculator using html/css/js. Basic calculator functionality inspired by [Web Dev Simplified](https://www.youtube.com/watch?v=j59qQ7YWLxw&ab_channel=WebDevSimplified) and calculator design inspired by [Ranjan-Beginner's Guide](https://www.youtube.com/watch?v=1jAEyP9a1hg&ab_channel=Ranjan-Beginner%27sGuide). In order to challenge myself and incorporate what I've learned, I took it a few steps further to incorporate more functionality beyond the basic 4 calculator functions. 

# Technologies
* Vanilla Javascript
* HTML/CSS

# Functionality
## Currently available functions
*Addition, subtraction, multiplication, division
*Conversion to a decimal
*Conversion from positive to negative or negative to positive
*square root
*exponents (positive)
*compatility with decimals
*expansion of calculator to reveal additional functions
*Memory store, memory recall, memory clear, memory add, memory subtract
*sin, cos, tan with the option to calculate in degrees or in radians
*log (base 10)
*factorial

## Functions to implement (WIP)
*Proper appendage of parentheses 
*Mathematical compatilibity of parentheses via order of operations
*Compatibility with negative exponents
*Proper size adjustment to mobile devices

# Development
## Class, methods, and interaction between HTML document and javascript
In order to diversify my calculator functionality, I opted to incorporate a basic trigonometry computation ability to calculate sine, cosine, and tangent of a given value dependent on whether the calculator is currently presenting DEG or RAD as these can affect the final output. I chose to implement the display of DEG or RAD in the calculator buttons directly by utilizing HTML and CSS to switch the button's display upon user's click and having javascript logic to take into account which current value is displayed before final computation. Snippet of the javascript code below:

```
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
```

## Interactive button display
This was inspired by smartphone calculator apps. I noticed that in order to save space, developers incorporated a button to show and hide additional calculator functions based on the user's click. I realized this could be achieved by taking advantage of CSS transition properties but had to account for size distribution of the buttons. The buttons below the revealed row, as a result, dynamically shrinks in size upon revelation of the hidden row and dynamically returns to normal size upon hiding the row again. I used javascript to run the script of hiding and revealing the hidden rows of buttons.
Snippets of CSS code below:
```
.calculator-grid {
    display: grid;
    justify-content: center;
    align-content: center;
    grid-template-columns: repeat(4, 6.25rem);
    grid-template-rows: minmax(7.5rem, auto) repeat(6, 6.25rem);
    background-color: #ecf0f3;
    box-shadow: inset -0.375rem -0.375rem 0.8125rem rgba(0, 0, 0, .1),
                inset 0.375rem 0.375rem 0.8125rem rgba(0, 0, 0, .2),
                0.375rem 0.375rem 0.8125rem rgba(0, 0, 0, .1),
                0.375rem 0.375rem 0.8125rem rgba(0, 0, 0, .2);
    border-radius:  2.5rem;
    border: 0.0625rem solid rgba(0, 0, 0, .4);
    margin: 6.25rem;
    min-width: 28.125rem;
    min-height: 50rem;
    max-height: 100%;
    max-width: 100%;
    position: relative;
}

.main-row {
    display: grid;
    grid-column: 1 / -1;
    grid-row: 3 / 8;
    grid-template-columns: repeat(4, 6.25rem);
    position: relative;
    padding-bottom: 0.3125rem;
}

.main-row > button {
    cursor: pointer;
    font-size: 20px;
    outline: none;
    box-shadow: inset 0.375rem 0.375rem 0.8125rem #fff,
                0.375rem 0.375rem 0.8125rem rgba(0, 0, 0, .2);
    background-color: #ecf0f3;
    border: none;
    border-radius: 2.5rem;
    width: auto;
    height: auto;
    margin: 0.625rem;
}

.hidden-row {
    display: grid;
    grid-column: 1 / -1;
    grid-row-start: 3;
    grid-template-columns: repeat(6, 4.375rem);
    justify-content: space-evenly;
    position: absolute;
}

.hidden-row > button {
    cursor: pointer;
    font-size: 15px;
    outline: none;
        box-shadow: inset 0.375rem 0.375rem 0.8125rem #fff,
                0.375rem 0.375rem 0.8125rem rgba(0, 0, 0, .16);
    background-color: #ecf0f3;
    border: none;
    border-radius: 2.5rem;
    width: 2.8125rem;
    height: 2.8125rem;
    margin: 0.3125rem;
}
```

Snippets of JS code below:
```
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
```

Sample image of basic calculator functionality
[sample](/sample1.PNG)

Sample image of expanded calculator
[sample2](/sample2.PNG)