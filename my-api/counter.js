const prompt = require('prompt-sync')();

let counter = 0;

function displayCounter() {
  console.log(`Counter: ${counter}`);
}

function changeCounter(action) {
  if (action === 'increment') {
    counter++;
  } else if (action === 'decrement') {
    counter--;
  }
}

while (true) {
  displayCounter();
  const action = prompt('Enter action (increment/decrement/exit): ').toLowerCase();
  
  if (action === 'exit') break;
  
  if (action === 'increment' || action === 'decrement') {
    changeCounter(action);
  } else {
    console.log('Invalid action.');
  }
}
