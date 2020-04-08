//Node.js 10.14.0
//Plain Javascript and Node.js is supported
// html/css is not supported here
class Calculator {


  constructor(previousOperandTextView, currentOperandTextView){
    this.previousOperandTextView = previousOperandTextView
    this.currentOperandTextView = currentOperandTextView
    this.clear()
  }
  
  clear(){
    this.previousOperand = ''
    this.currentOperand = ''
    this.operation = undefined
  }
  
  delete(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
  
  appendNumber(number){
    if(number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand + number.toString()
  }
  
  chooseOperation(operation){
    //console.log("choosing operation")
    if(this.currentOperand === '') return
    if(this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }
  
  compute(){
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if(isNaN(prev) || isNaN(current)) return
    switch(this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '/':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }
  
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if(isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0})
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
    
  }
  updateDisplay(){
    //console.log("updating display..")
    this.currentOperandTextView.innerText = this.getDisplayNumber(this.currentOperand)
     
    //if(this.operation !== undefined) {
    //  this.previousOperandTextView.innerText = this.getDisplayNumber(this.previousOperand) + " " + this.operation
    //} else {
    //  this.previousOperandTextView.innerText = this.getDisplayNumber(this.previousOperand)
    //}    
    // Another way to add the operation to the previousOperandTextView:
    if(this.operation != null) {
      this.previousOperandTextView.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextView.innerText = ''
    }
     
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const acButton = document.querySelector('[data-ac]')
const previousOperandTextView = document.querySelector('[data-prev-operand]')
const currentOperandTextView = document.querySelector('[data-curr-operand]')
  
const calculator = new Calculator(previousOperandTextView, currentOperandTextView)


numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
    //console.log("just called update display")
  })
})


operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})


equalButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})


acButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})


deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
}) 
