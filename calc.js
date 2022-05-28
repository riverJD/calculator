
const numPad = document.querySelector('.numpad')
const screen = document.querySelector('.screen')

let digits = "";

const MAX_SCREEN_LENGTH = 14;

let calculation = {
    num1 : null,
    num2 : null,
    total : 0,
    operator : "",
    errorFlag : 0

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
    

   
    
    if (b != null){
        return a * b
    }
    else {return a}
    
  
}

function divide(a, b){
    
    if (b === 0){
        //displayNumber = "NO DIV ZERO BUD"
        calculation.errorFlag = 1;
        displayNumber = "NO DIV ZERO :(";
        return;
        
    }

    if (b != null){
        return a / b
    }
    else {return a}
}


function operate(opFunction, a, b){
    return (opFunction(a, b))
}

// Update screen
function refreshScreen(){

    // Remove leading 0s if theye exist

    if (digits.length > 0){
        displayNumber = parseFloat(digits)
    }

    const displayText = displayNumber.toString();

    const places = displayText.indexOf('.')
    //console.log(displayText.length)
    // 12345678.00
    // 12.00000000
    // Will decide how many decimal places to show based on availible screen length. 
    // A larger number will allow for less decimal spaces. 
    if (displayText.length <= MAX_SCREEN_LENGTH ) {
        screen.textContent = Number((displayNumber).toFixed(MAX_SCREEN_LENGTH - places));
    }
    else {
        screen.textContent = (displayNumber.toExponential(6));
    }

}

function clearDigits(){
    displayNumber = digits.join('');
}

// Clear array and refresh screen
function resetCalculator(){
    digits = ''
    displayNumber = 0
    calculation.num1 = null
    calculation.num2 = null
    calculation.operator = ""
    calculation.total = null
    calculation.errorFlag = 0;
    
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

    const periodButton = document.createElement('button')
    setAttributes(periodButton, {'class' : 'number', 'id': `period`, 'data-num': '.'});
    periodButton.textContent = '.'
    numPad.appendChild(periodButton)

 
}

createNumpad();


// Store value currently on the screen, along with operator pressed,
// in object for future manipulation
const operation = document.querySelectorAll('.operator');
operation.forEach(operator => {
    operator.addEventListener('click', () => {  
        
     // Force CE if error
       if (calculation.errorFlag != 0){
           return;
       }
       
       equal();
     
       // If user changes operator, don't halt further calculations
       // until a new "second" number is used.
        if (calculation.operator != window[`${operator.id}`]){
            
            calculation.num2 = null
        }
        calculation.operator = window[`${operator.id}`]
        calculation.num1 = displayNumber
        digits = ''
    })
})



const equalButton = document.querySelector('#equals');
    equalButton.addEventListener('click', () => {
      
        if (calculation.errorFlag != 0){
            return;
        }

        // Perform operation, and then reset inputs so the 
        // equal sign button only works once. 
        equal();
        calculation.num1 = null;
        calculation.num2 = null;
               
    })


// Used by both the equal button and operators when operating on 
// a running total
function equal(){

    if (calculation.num1 != null){     
        
        // Assign entered numbers if they exist, otherwise use numbers already stored
        if (digits.length > 0){
            calculation.num2 = parseFloat(digits);
        }
        digits = ''
        calculation.total = operate(calculation.operator, calculation.num1, calculation.num2)
        
        if (calculation.errorFlag != 0){
            refreshScreen();
            return;
        }
        displayNumber = calculation.total;

        refreshScreen();
    }


}


// Store number as a string for easy manipulation and display
const numberInput = document.querySelectorAll('.number');
numberInput.forEach(num => {
    num.addEventListener('click', () => {
        
        if (calculation.errorFlag != 0){
            return;
        }

        if (num.getAttribute('data-num') == '.' && digits.includes('.')){
            return;
        }

        // Cap screen size
        if (digits.length < 10){
        digits += (num.getAttribute('data-num'));
        displayNumber =  parseFloat(digits);
        refreshScreen();
        }
    })
})

const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', () => {
    console.log('click')
    resetCalculator();
    refreshScreen();
});

const backBtn = document.querySelector('#back');
backBtn.addEventListener('click', () => {
    console.log('back');
    console.log(digits)
    digits = digits.slice(0, -1)
    refreshScreen();
})


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