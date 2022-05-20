        /*
            Future plans
            - remove the need for the operands array (a few global variables instead)
            - keyboard support
            - backspace button (call it something easily understood like "delete" not "clear")

            - use big.js for precise math
            - calculator history like chromebook calc
            - cool animations like chromebok calc

            - nice looking color coordinated design with CSS
            - display a consistent number of digits (for example 1/3). Need to understand when js abbreviates numbers with long decimals (1e20). Change the display box in response to this

            - mobile responsive layout? (Need to do more odin for this)

        */


        /* input cases to test for

        Basic Math
        1 + 1 = (simple operation) PASS
        2 * 2 = - 1 (perform two operations concurrently with entering "=") PASS
        4 / 2 + 1 (need to perform two operations concurrently without entering "=") PASS
        1 + 2 + 3 + 4 + 5 + 6 + 7 + 9 + 10 = 55 (multiple concurrent operations) PASS
        4 / 2 =, 1 + 1 = (perform two operations separately) PASS
        10 - 1 = = = = = = (repeated pressing of = performs to operation over and over) PASS

        Decimal Math
        need decimal math to be accurate - FAIL (beyond scope of this project)
        2.2 + 1.1 (entering decimals without a zero after decimal point) PASS
        0.01 - 0.05 (entering decimals with a zero after decimal point) PASS 
        entering .2 displays 0.2 PASS
        entering .2 + .1 produces a correct result PASS

        Negative number math - beyond scope of this project
        1 - 100 = -99 (result is a negative number) PASS 
        -99 + 99 = 0 (first operand is a negative number) PASS
        5 * -99 = (second operand is a negative number. entering - after entering operator makes a negative number, not change the operator to -) PASS - only if +/- button is pressed after entering second operand

        */
    
    // should I refactor code to remove these global variables?
    let operands = []; // stored as strings, not float

    let firstOperand;
    let secondOperand;
    let currentOperator;

    let curr_firstOperand;
    let curr_secondOperand;
    let curr_operator;

    let prev_firstOperand;
    let prev_secondOperad;
    let prev_operator;

    let waitingForOperand = true; 
    let waitingForSecondOperand = false; // for clearing the display after first operand and operator are entered
    let isFirstEqualsOperation = true; // if equals gets pressed multiple times, keep adding the second operand
    let pendingOperation = false; // true when there is an operation that hasn't be calculated yet (such as entering 3 + 1 + 2)

    initalizeCalculatorButtons();

    function allClear() {
        updateDisplay(); // clear display
        
        operands = []; 

        firstOperand = undefined;
        secondOperand = undefined;
        currentOperator = undefined;

        waitingForOperand = true;
        waitingForSecondOperand = false;
        isFirstEqualsOperation = true;
        pendingOperation = false;
    }    

    function add (x, y) {
        return x + y;
    }

    function subtract (x,y) {
        return x - y;
    }

    function multiply (x, y) {
        return x * y;
    }

    function divide (x, y) {
        return x / y;
    }

    function operate (x, operator, y) {
        
        // convert to number if input is a string
        const int_x = new Number(x);
        const int_y = new Number(y);
        // no need to convert operator, it will always be a string
        
        console.log(`${x} ${operator} ${y}`);

        switch(operator){
            case '+': 
                return add(int_x,int_y);
            case '-':
                return subtract(int_x, int_y);
            case '*':
                return multiply(int_x,int_y);
            case '/':
                return divide(int_x,int_y);
            default:
                console.log("Invalid operator: " + operator);
        }

    }

    function updateDisplay (displayValue) {
        const calculatorDisplay = document.querySelector("#calc-display");
        calculatorDisplay.textContent = displayValue;
    }

    function getDisplayValue () {
        const calculatorDisplay = document.querySelector("#calc-display");
        return calculatorDisplay.textContent;
    }

    // create event listeners on each button
    function initalizeCalculatorButtons() {
        const calc_numpad = document.querySelectorAll("#calc-numpad button");
        
        for (let button of calc_numpad) {
            
            if (button.id == "=") {
                button.addEventListener("click", ()=> {
                    equalsOperator();
                })
            }

            else if (button.id == ".") {
                button.addEventListener("click", ()=> {
                    enterDecimal();
                })
            }
            
            else {
                button.addEventListener("click", ()=> {
                    enterDigit(button.id);
                })
            }
        }

        const calc_operators = document.querySelectorAll("#calc-operators button");
        
        for (let button of calc_operators) {
            if (button.id == "AC") {
                button.addEventListener("click", ()=> {
                allClear();
                })
            } 
            else if (button.id == "+/-") {
                
                button.addEventListener("click", ()=> {
                positiveNegativeToggle();
                })
                
            }
            else {
                button.addEventListener("click", ()=> {
                enterOperator(button.id);
                })
            }
        }
    }

    // toggles number between positive and negative
    function positiveNegativeToggle() {
        let currentNumber = new Number(getDisplayValue());

        // if the display is empty, silently exit without disturbing display
        // if the operand is zero, silently exit
        if (currentNumber == 0) {
            return;
        }

        // prevent +/- from changing the first operand while its still being displayed after entering an operator (2 * +/- will silently exit). Makes it so that the operation can only be performed by pressing 2 * 3 +/-
        if(waitingForSecondOperand) {
            return;
        }

        let newNumber = currentNumber * -1;

        updateDisplay(newNumber);
        updateOperandsArray(newNumber);
    }

    function enterDigit (digit) {
        
        // entering a digit resets isFirstEqualsOperation to true
        setFirstEqualsOperation(true);

        // TODO: this part of code is giving strange results, needs further investigation
        // this allows the entering of a second operation that is unconnected from the first (do 1+1=2, then do 2+2=4)
        if(waitingForOperand) {
            updateDisplay();
        }
        
        // if the second operand needs to be inputted, clear the display in preparation
        // if second operand is being inputted, that means the final operator has been chosen
        if (waitingForSecondOperand) {
            updateDisplay();
            pendingOperation = true;
            waitingForSecondOperand = false;
        }

        let oldDisplayValue = new String(getDisplayValue()); // input may already be string but convert to string just in case
        const str_digit = new String(digit); // input may already be string but convert to string just in case
        let newDisplayValue = oldDisplayValue + str_digit; // js: + operator between two strings concatenates instead of adding

        updateDisplay(newDisplayValue);
        updateOperandsArray(newDisplayValue);

        setWaitingforOperand(false);

    }

    function updateOperandsArray(value) {
        // if waitingForOperand is true, push() digit into the operands array then switch waitingForOperand to false
        // if waitingForOperand is false, a new digit entered triggers the removal of the last entry, then replaced with the new value (updates the last entry)
        if (waitingForOperand) {
            operands.push(value);
            setWaitingforOperand(false);
        } else {
            operands.pop();
            operands.push(value);
        }
    }

    // for some reason I can only edit this global variable via function and not with a simple waitingForOperand = false in a function???? The variable is global and should be able to be accessed everywhere
    // need to look up this. Scope of waitingForOperand should be global but its not. 
    function setWaitingforOperand(boolean) {
        waitingForOperand = boolean;
    }

    // currentOperator is stored in operators in the enterDigit() function because the calculator needs to wait until the user selects the final operator (calc allows picking multiple operators, but only the last chosen operator is used)
    function enterOperator (operator) {

        // an existing operator in the array indicates that there is a previous operation that needs to be completed before the current one is done
        if(pendingOperation) {
            equalsOperator();
        }

        currentOperator = operator;

        setWaitingforOperand(true);
        waitingForSecondOperand = true;
    }

    function enterDecimal() {
        
 
        // if waiting for second operand, clear the display (allows math like .2 (converted to 0.2) + .1)
        if(waitingForSecondOperand) {
            updateDisplay();
            waitingForSecondOperand = false;
        }
        
        
        let oldDisplayValue = new String(getDisplayValue());

        // if a decimial already exists, exit the function silently
        if (oldDisplayValue.includes(".")) {
            return;
        }

        let newDisplayValue;

        if (oldDisplayValue == "") {
            newDisplayValue = "0.";
        }
        else {
            newDisplayValue = oldDisplayValue.concat(".");
        }

        updateDisplay(newDisplayValue);

        updateOperandsArray(newDisplayValue);

        setWaitingforOperand(false);
    }

    function equalsOperator () {

        // normally first operand comes first in the array, then the second operand
        if(isFirstEqualsOperation) {
            firstOperand = operands[operands.length-2]; 
            secondOperand = operands[operands.length-1];
            setFirstEqualsOperation(false);
        } 
        else { // if the equals button gets pressed multiple times, save the second operand and current operator (by not updating them) and only update the first operand as the last pushed value (the result of the last operation)
            firstOperand = operands[operands.length-1]; 
        }

        console.log(operands);

        // divide by zero resets the calculator and exits
        if(currentOperator == "/" && secondOperand == 0) {
            alert("Error: Divide by zero. Calculator reset");
            allClear();
            return;
        }
        // if any one of these variables in undefined, it means a complete math operation hasn't been entered. Exit the method silently to wait for additonal user input
        else if (firstOperand == undefined || secondOperand == undefined || currentOperator == undefined) {
            return;
        }
        else {
            let newDisplayValue = operate (firstOperand, currentOperator, secondOperand);

            updateDisplay(newDisplayValue);
            operands.push(newDisplayValue);
            setWaitingforOperand(true); // calculation complete, set calculator to wait for operand
            setPendingOperation(false); // no longer waiting to perform an operation
        }
    }

    function setFirstEqualsOperation(boolean) {
        isFirstEqualsOperation = boolean;
    }

    function setPendingOperation(boolean) {
        pendingOperation = boolean;
    }