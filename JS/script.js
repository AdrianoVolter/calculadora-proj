const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator{
  constructor(previousOperationText,currentOperationText){
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }
//add digito
  addDigit(digit){
    //ver se a operação atual já tem ponto
    if(digit === "." && this.currentOperationText.innerText.includes(".")){
      return;     //Evita de repetir o "."
    }
    this.currentOperation = digit;
    this.updateScreen();
  }

  //   Processar todas as operações da calculadora
processOperation(operation){

  console.log(operation)
  //  Verifique se o valor atual está vazio
  if (this.currentOperationText.innerText === "" && operation !== "C") {
    // Change operation
    if (this.previousOperationText.innerText !== "") {
      this.changeOperation(operation);
    }
    return;
  }

  //  Obter valor atual e anterior
  let operationValue
  let previous = +this.previousOperationText.innerText.split(" ")[0];
  let current = +this.currentOperationText.innerText;

  switch (operation) {
    case "+":
      operationValue = previous + current;
      this.updateScreen(operationValue, operation, current, previous);
      break;
    case "-":
      operationValue = previous - current;
      this.updateScreen(operationValue, operation, current, previous);
      break;
    case "*":
      operationValue = previous * current;
      this.updateScreen(operationValue, operation, current, previous);
      break;
    case "/":
      operationValue = previous / current;
      this.updateScreen(operationValue, operation, current, previous);
      break;
    case "DEL":
      this.processDelOperator();
      break;
    case "CE":
      this.processClearCurrentOperator();
      break;
    case "C":
      this.processClearOperator();
      break;
    case "=":
      this.processEqualOperator();
      break;
    default:
      return;
  }
}

// Alterar valores da tela da calculadora
updateScreen(
  operationValue = null,
  operation = null,
  current = null,
  previous = null
) {
  if (operationValue === null) {

    //  Anexar número ao valor atual
    this.currentOperationText.innerText += this.currentOperation;
  } else {

    //  ver se o valor é zero, se for apenas adicione o valor atual
    if (previous === 0) {
      operationValue = current;
    }
    
    // adicionar valor atual ao anterior
    this.previousOperationText.innerText = `${operationValue} ${operation}`;
    this.currentOperationText.innerText = "";
  }
}

// Altera a operação  
  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // Deleta um digito
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  // limpa operação
  processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
  }

  // Limpa todas operações 
  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  //  Processar uma operação
  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}
// 
const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn) =>{
    btn.addEventListener("click", (e) => {
        const value =e.target.innerText

        if(+value >= 0 || value === "."){ 
          calc.addDigit(value);

        }else{
          calc.processOperation(value);
        }
        
    })
})
