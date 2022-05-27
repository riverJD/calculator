
const numPad = document.querySelector('.numpad')
const screen = document.querySelector('.screen')

let digits = "";


let calculation = {
    num1 : null,
    num2 : null,
    total : 0,
    operator : ""

}

let displayNumber;

//console.log(numPad);
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


// Update screen
function refreshScreen(){

    // Remove leading 0s if theye exist
    screen.textContent = displayNumber;
}

function clearDigits(){
    displayNumber = digits.join('');
}



// Clear array and refresh screen
function resetScreen(){
    digits = []
    displayNumber = 0
    calculation.num1, calculation.num2 = null; 
    
    refreshScreen()
}

// Generate DIV/Buttons for numpad
function createNumpad(){
         
    numPad.style.gridTemplate = `repeat(3, 1fr) / repeat(3, 1fr)`;

    for (let i = 0; i < 10; i++){
        const numButton = document.createElement('button');
        setAttributes(numButton, {'class' : 'number', 'id': `num${i}`, 'data-num': i});
        numButton.textContent = i;
        if (i == 0) {
            numPad.appendChild(numButton)       
        }
        else {

        numPad.insertBefore(numButton, numPad.lastChild);
        }
    }

 
}

createNumpad();


function arrayToScreen(){

}



// Store value currently on the screen, along with operator pressed,
// in object for future manipulation
const operation = document.querySelectorAll('.operator');
operation.forEach(operator => {
    operator.addEventListener('click', () => {  
        

    

        if (calculation.num1 != null){
            equal();
            digits = ''
            if (calculation.operator != window[`${operator.id}`]){
                calculation.num2 = null
            }

            
        }
        digits = ''
        
        calculation.operator = window[`${operator.id}`]
        calculation.num1 = displayNumber


    })

})



const equalButton = document.querySelector('#equals');
    equalButton.addEventListener('click', () => {
      
       
        if (calculation.num1 != null){
        equal();
        calculation.num1 = null;
        calculation.num2 = null;
        }

       
    })



function equal(){
    console.log('=')
    if (digits.length > 0){
    calculation.num2 = parseInt(digits);
    }
    calculation.total = operate(calculation.operator, calculation.num1, calculation.num2)

    displayNumber = calculation.total;

    refreshScreen();


}


// store as an array for easy manipulation and display
const numberInput = document.querySelectorAll('.number');
numberInput.forEach(num => {
    num.addEventListener('click', () => {
        
        // Cap screen size
        if (digits.length < 8){
        digits += (num.getAttribute('data-num'));
        console.log(digits);
        displayNumber =  parseInt(digits);
        refreshScreen();
        }
    })
})

const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', () => {
    console.log('click')
    resetScreen();
});


// Helper functiodn
// Set multiple attributes from one function call
function setAttributes(element, attributes)
{
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value)
    });
}


/*
console.log(add(10, 2));
console.log(subtract(10,2));
console.log(multiply(10,2));
console.log(divide(10,2));
*/