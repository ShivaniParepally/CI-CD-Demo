const display = document.getElementById("display");
const keypad = document.querySelector(".keypad");

const state = {
    currentValue: "0",
    previousValue: null,
    operator: null,
    shouldResetDisplay: false,
};

function updateDisplay() {
    display.textContent = state.currentValue;
}

function inputDigit(digit) {
    if (state.shouldResetDisplay) {
        state.currentValue = digit;
        state.shouldResetDisplay = false;
        updateDisplay();
        return;
    }

    state.currentValue = state.currentValue === "0" ? digit : state.currentValue + digit;
    updateDisplay();
}

function calculate() {
    if (state.previousValue === null || state.operator === null) {
        return Number(state.currentValue);
    }

    const previous = Number(state.previousValue);
    const current = Number(state.currentValue);

    if (state.operator === "+") {
        return previous + current;
    }

    return previous - current;
}

function chooseOperator(nextOperator) {
    if (state.operator && !state.shouldResetDisplay) {
        state.currentValue = String(calculate());
        updateDisplay();
    }

    state.previousValue = state.currentValue;
    state.operator = nextOperator;
    state.shouldResetDisplay = true;
}

function runEquals() {
    if (state.operator === null || state.previousValue === null) {
        return;
    }

    state.currentValue = String(calculate());
    state.previousValue = null;
    state.operator = null;
    state.shouldResetDisplay = true;
    updateDisplay();
}

function clearCalculator() {
    state.currentValue = "0";
    state.previousValue = null;
    state.operator = null;
    state.shouldResetDisplay = false;
    updateDisplay();
}

keypad.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const { action, value } = button.dataset;

    if (action === "digit") {
        inputDigit(value);
        return;
    }

    if (action === "operator") {
        chooseOperator(value);
        return;
    }

    if (action === "equals") {
        runEquals();
        return;
    }

    clearCalculator();
});

updateDisplay();