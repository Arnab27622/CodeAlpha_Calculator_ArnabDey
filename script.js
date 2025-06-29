let string = "";
let lastResult = null;
let buttons = document.querySelectorAll('.button');

// Initialize memory if not exists
if (!localStorage.getItem('memory')) {
    localStorage.setItem('memory', '0');
}

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        const targetValue = e.target.innerHTML;
        document.getElementById('input').style.color = "black";

        // Clear error if present
        if (document.getElementById('input').value === "Error") {
            string = "";
        }

        if (targetValue === '=') {
            calculateResult();
        } else if (targetValue === 'C') {
            clearCalculator();
        } else if (targetValue === '%') {
            calculatePercentage();
        } else if (targetValue === 'M+') {
            addToMemory();
        } else if (targetValue === 'M-') {
            subtractFromMemory();
        } else if (targetValue === 'MR') {
            recallMemory();
        } else if (targetValue === '.') {
            addDecimalPoint();
        } else if (['+', '-', '*', '/'].includes(targetValue)) {
            addOperator(targetValue);
        } else {
            // Number buttons
            string += targetValue;
            document.getElementById('input').value = string;
        }
    });
});

function calculateResult() {
    try {
        if (!string && lastResult !== null) {
            string = lastResult;
        }

        const result = eval(string);
        lastResult = result.toString();
        string = lastResult;
        document.getElementById('input').value = lastResult;
    } catch (error) {
        document.getElementById('input').value = "Error";
        document.getElementById('input').style.color = "red";
        string = "";
        lastResult = null;
    }
}

function clearCalculator() {
    string = "";
    lastResult = null;
    document.getElementById('input').value = "";
}

function calculatePercentage() {
    try {
        if (!string && lastResult !== null) {
            string = lastResult;
        }

        // Calculate percentage value
        const result = eval(string) / 100;
        lastResult = result.toString();
        string = lastResult;
        document.getElementById('input').value = lastResult;
    } catch (error) {
        document.getElementById('input').value = "Error";
        document.getElementById('input').style.color = "red";
        string = "";
        lastResult = null;
    }
}

function addToMemory() {
    try {
        const currentValue = parseFloat(string || document.getElementById('input').value || '0');
        let memory = parseFloat(localStorage.getItem('memory'));
        memory += currentValue;
        localStorage.setItem('memory', memory.toString());
    } catch (error) {
        // Handle error silently
    }
}

function subtractFromMemory() {
    try {
        const currentValue = parseFloat(string || document.getElementById('input').value || '0');
        let memory = parseFloat(localStorage.getItem('memory'));
        memory -= currentValue;
        localStorage.setItem('memory', memory.toString());
    } catch (error) {
        // Handle error silently
    }
}

function recallMemory() {
    const memory = localStorage.getItem('memory');
    string = memory;
    document.getElementById('input').value = memory;
}

function addDecimalPoint() {
    // Only add decimal if last number doesn't have one
    const parts = string.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];

    if (!lastPart.includes('.')) {
        string += '.';
        document.getElementById('input').value = string;
    }
}

function addOperator(operator) {
    // Only add operator if last character isn't already an operator
    const lastChar = string.slice(-1);
    if (!['+', '-', '*', '/'].includes(lastChar)) {
        string += operator;
        document.getElementById('input').value = string;
    }
}