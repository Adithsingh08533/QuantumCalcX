// script.js
const calculateBtn = document.getElementById('calculate');
const resultDiv = document.getElementById('result');
const historyDiv = document.getElementById('history');
const clearBtn = document.getElementById('clear-history');
const newBtn = document.getElementById('new-calc');
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
let history = [];

calculateBtn.addEventListener('click', () => {
  const num1 = parseFloat(num1Input.value);
  const num2 = parseFloat(num2Input.value);
  const op = operationSelect.value;
  let result, expression;

  if ((isNaN(num1) || (['add','sub','mul','div','pow','mod'].includes(op) && isNaN(num2))) && op !== 'sqrt' && op !== 'abs') {
    resultDiv.textContent = 'Please enter valid inputs';
    return;
  }

  switch (op) {
    case 'add': result = num1 + num2; expression = `${num1} + ${num2}`; break;
    case 'sub': result = num1 - num2; expression = `${num1} - ${num2}`; break;
    case 'mul': result = num1 * num2; expression = `${num1} × ${num2}`; break;
    case 'div': result = num2 !== 0 ? num1 / num2 : 'Cannot divide by zero'; expression = `${num1} ÷ ${num2}`; break;
    case 'pow': result = Math.pow(num1, num2); expression = `${num1}^${num2}`; break;
    case 'sqrt': result = num1 >= 0 ? Math.sqrt(num1) : 'Invalid input'; expression = `√${num1}`; break;
    case 'mod': result = num1 % num2; expression = `${num1} % ${num2}`; break;
    case 'abs': result = Math.abs(num1); expression = `|${num1}|`; break;
  }

  resultDiv.textContent = `${expression} = ${result}`;
  history.unshift(`${expression} = ${result}`);
  if (history.length > 6) history.pop();
  updateHistory();
});

clearBtn.addEventListener('click', () => {
  history = [];
  updateHistory();
});

newBtn.addEventListener('click', () => {
  num1Input.value = '';
  num2Input.value = '';
  resultDiv.textContent = 'Result will appear here';
});

function updateHistory() {
  historyDiv.innerHTML = history.map(h => `<div class="history-item">${h}</div>`).join('') || '<div class="history-item">No history yet</div>';
}

