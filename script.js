const calculatorScreen = document.querySelector('.calculator-screen');
const calculatorKeys = document.querySelector('.calculator-keys');
const calculatorHistory = document.querySelector('.calculator-history table');
const historyClearButton = document.querySelector('.history-clear');

let calculationHistory = [];

function updateScreen(value) {
  calculatorScreen.value = value;
}

function clearScreen() {
  calculatorScreen.value = '';
}



function clearHistory() {
  calculationHistory = [];
  calculatorHistory.innerHTML = '';
}

function calculate(historyIndex = null) {
  if (historyIndex !== null) {
    const { calculation, result } = calculationHistory[historyIndex];
    updateScreen(calculation);
    addHistoryItem(calculation);
    updateScreen(result);
  } else {
    const calculation = calculatorScreen.value;
    const result = eval(calculation);
    updateScreen(result);
    addHistoryItem(calculation);
  }
}

calculatorKeys.addEventListener('click', (event) => {
  if (!event.target.matches('button')) return;

  const key = event.target;
  const keyValue = key.value;
  const screenValue = calculatorScreen.value;

  if (key.classList.contains('operator')) {
    updateScreen(screenValue + keyValue);
  } else if (key.classList.contains('decimal')) {
    if (!screenValue.includes('.')) {
      updateScreen(screenValue + keyValue);
    }
  } else if (key.classList.contains('all-clear')) {
    clearScreen();
  } else if (key.classList.contains('equal')) {
    calculate();
  } else if (key.classList.contains('history-item')) {
    const historyIndex = parseInt(key.dataset.historyIndex);
    calculate(historyIndex);
  } else {
    updateScreen(screenValue + keyValue);
  }
});



// function addHistoryItem(calculation) {
//   const nameInput = document.getElementById('my-input');

//   const name = nameInput.value;
//   const result = eval(calculation);

//   const table = document.getElementById('history-table');
//   const saveButton = document.getElementById('save-button');
//   const row = table.insertRow();
//  calculationHistory.push({name,calculation,result})

//   // insert the calculation name and result into the appropriate cells
//   const namecell = row.insertCell(0);
//   const namecalCell = row.insertCell(1);
//   const resultCell = row.insertCell(2);
//   const refreshcell = row.insertCell(3);
//   const deleteCell = row.insertCell(4);
//   saveButton.addEventListener('click', function () {
//     const inputValue = nameInput.value;
  
//     if (inputValue !== '') {
//       namecell.innerHTML = inputValue;
//     } else {
//       namecell.innerHTML = name;
//     }
//     nameInput.value = '';
//   });

//   if (name !== '') {
    
//     namecell.innerHTML = name;
   
   
//   } else {
//     namecell.innerHTML = ' ';
//   }
 
// namecell.innerHTML=name
//   namecalCell.innerHTML = calculation;
//   resultCell.innerHTML = result;
//   refreshcell.innerHTML = '<i class="fa fa-retweet"></i>';
//   deleteCell.innerHTML =
//     '<i class="fa fa-trash" onclick="deleteHistoryItem(this)"></i>';
  
  
// }
function addHistoryItem(calculation) {
  const nameInput = document.getElementById('my-input');
  const name = nameInput.value;
  const result = eval(calculation);

  const table = document.getElementById('history-table');
  const row = table.insertRow();
  
  // Create the cells for the row
  const nameCell = row.insertCell(0);
  const calculationCell = row.insertCell(1);
  const resultCell = row.insertCell(2);
  const refreshCell = row.insertCell(3);
  const deleteCell = row.insertCell(4);
  
  // Create a save button to save the name input value
  const saveButton = document.createElement('button');
  // saveButton.innerText = 'Save';
  
  // Create a text node for the name input field and append it to the name cell
  const nameInputField = document.createElement('input');
  nameInputField.type = 'text';
  nameInputField.value = name;
  nameInputField.style.display = 'none';
  nameCell.appendChild(nameInputField);
  
  // Create a text node for the name display field and append it to the name cell
  const nameDisplayField = document.createElement('span');
  nameDisplayField.innerText = name || 'Unnamed';
  nameDisplayField.style.display = 'inline-block';
  nameDisplayField.style.width = '70%';
  nameCell.appendChild(nameDisplayField);
  
  // Add the save button to the name cell
  nameCell.appendChild(saveButton);
  
  // Set the text content for the calculation and result cells
  calculationCell.innerText = calculation;
  resultCell.innerText = result;
  
  // Add the refresh and delete buttons to their respective cells
  refreshCell.innerHTML = '<i class="fa fa-retweet"></i>';
  deleteCell.innerHTML = '<i class="fa fa-trash" onclick="deleteHistoryItem(this)"></i>';
  
  // Add an event listener to the save button
  saveButton.addEventListener('click', function() {
    const newName = nameInputField.value;
    if (newName.trim() !== '') {
      nameDisplayField.innerText = newName;
    } else {
      nameDisplayField.innerText = 'Unnamed';
    }
    nameInputField.style.display = 'none';
    nameDisplayField.style.display = 'inline-block';
  });
  
  // Add an event listener to the name display field to show the input field when clicked
  nameDisplayField.addEventListener('click', function() {
    nameInputField.style.display = 'inline-block';
    nameDisplayField.style.display = 'none';
    nameInputField.focus();
  });
  
  // Add the calculation, name, and result to the calculationHistory array
  calculationHistory.push({ calculation, name, result });
}


function deleteHistoryItem(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}




historyClearButton.addEventListener('click', clearHistory);
