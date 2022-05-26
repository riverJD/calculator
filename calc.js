
const numPad = document.querySelector('.numpad')

console.log(numPad);
function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}


function operate(opFunction, a, b){
    return (opFunction(a, b))
}


function createNumpad(){
         
    numPad.style.gridTemplate = `repeat(3, 1fr) / repeat(3, 1fr)`;

    for (let i = 0; i < 10; i++){
        const numButton = document.createElement('button');
        setAttributes(numButton, {'class' : 'number', 'id': `num${i}`});
        numButton.textContent = i;
        if (i == 0) {
            numPad.appendChild(numButton)       
        }
        else {

        numPad.insertBefore(numButton, numPad.lastChild);
        }
    }
    const enterKey = document.createElement('button');
    setAttributes(enterKey, {'class' : 'operator', 'id': 'enter'});
    enterKey.textContent = '=';
    numPad.appendChild(enterKey);

 
}

createNumpad();

// Helper functiodn
// Set multiple attributes from one function call
function setAttributes(element, attributes)
{
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value)
    });
}

console.log(add(10, 2));
console.log(subtract(10,2));
console.log(multiply(10,2));
console.log(divide(10,2));