document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".buttons button");

    let currentInput = "";
    let operator = "";
    let firstOperand = null;

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            const value = button.textContent;

            if (isNumeric(value) || value === ".") {
                currentInput += value;
                updateDisplay(currentInput);
            } else if (isOperator(value)) {
                if (currentInput !== "") {
                    if (firstOperand === null) {
                        firstOperand = parseFloat(currentInput);
                        operator = value;
                        currentInput = "";
                    } else {
                        calculate();
                        operator = value;
                    }
                }
            } else if (value === "=") {
                calculate();
            } else if (value === "C") {
                clearCalculator();
            }
        });
    });

    function calculate() {
        if (operator && currentInput !== "") {
            const secondOperand = parseFloat(currentInput);
            let result;

            switch (operator) {
                case "+":
                    result = firstOperand + secondOperand;
                    break;
                case "-":
                    result = firstOperand - secondOperand;
                    break;
                case "*":
                    result = firstOperand * secondOperand;
                    break;
                case "/":
                    result = firstOperand / secondOperand;
                    break;
            }

            currentInput = result.toString();
            operator = "";
            firstOperand = null;
            updateDisplay(currentInput);
        }
    }

    function clearCalculator() {
        currentInput = "";
        operator = "";
        firstOperand = null;
        updateDisplay(currentInput);
    }

    function updateDisplay(value) {
        display.value = value;
    }

    function isNumeric(value) {
        return /^\d*\.?\d+$/.test(value);
    }

    function isOperator(value) {
        return value === "+" || value === "-" || value === "*" || value === "/";
    }
});
