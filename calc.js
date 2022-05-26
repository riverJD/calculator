
const numPad = document.querySelector('.numpad')


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
    
    
    for (let i = 0; i < 10; i++){

    }
}


console.log(add(10, 2));
console.log(subtract(10,2));
console.log(multiply(10,2));
console.log(divide(10,2));