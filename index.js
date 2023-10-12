const button = document.querySelectorAll("button")
const answerDisplay = document.getElementById("answerText")

//TODO:
//REDUCE THE SIZE OF ANSWER

var collector = [] // To collecct the operands 1 and 2
var Value = 0 // current value that's display on the screen
var operating = false;
var op //stores the operator
var isDecimal = false;

button.forEach(button => button.addEventListener('click', ()=>calculation(button)))

function calculation(input){

  var numbs = [0,1,2,3,4,5,6,7,8,9]
  var operation = ['/','x','-','+']

  if (input.textContent === '.'){

    if(isDecimal){
      return
    }

    answerDisplay.textContent = Value + '.'
    isDecimal = true
    collecting()

  }


  if (input.textContent === '%'){ // Percentage case
    let result = parseFloat(parseFloat(Value)/100)
    isDecimal = true

    collector[collector.indexOf(Value)] = result
    answerDisplay.textContent = addCommas(result)
    Value = result  
    collecting()

  }

  if (input.textContent === '='){
    
    if(operating == false){
      return
    }

     //resets the theme
    button.forEach(e => { if( e.className == "operators") {e.style.backgroundColor = "orange";e.style.color = "white" }})
    let answer = calculating(op)
    answerDisplay.textContent = addCommas(answer)
    collector = []
    collector[0] = answer
    Value = answer
    operating = false

  }

  if (input.textContent === 'C'){

    answerDisplay.style.fontSize = "60px"
    //resets the theme
    button.forEach(e => { if( e.className == "operators") {e.style.backgroundColor = "orange";e.style.color = "white" }})

    isDecimal = false;
    Value = 0;
    collector = [];
    operating = false;
    op = "none"
    answerDisplay.textContent = '0'
  }


  for (const operator of operation){

    if (input.textContent == operator){
      
      console.log(collector)
      //resets the theme
      button.forEach(e => { if( e.className == "operators") {e.style.backgroundColor = "orange";e.style.color = "white" }})

      input.style.backgroundColor = "#ffffff"
      input.style.color = "orange"

      if(operating){
        op = operator
        return
      }

      isDecimal = false
      operating = true;
      op = operator
      Value = 0
      answerDisplay.textContent = 0; 
      collecting()

    }
  }

  if (input.textContent === '+/-'){
    Value = Value * -1
    answerDisplay.textContent = addCommas(Value);

    collecting()

  }

  for (const num of numbs){
    
    if (input.textContent == num){

      if (answerDisplay.textContent == '0' && num == '0'){

        collecting()

        return
      }
      else{
        Value = removeCommas(answerDisplay.textContent)
        Value = parseFloat(Value + String(num));
        answerDisplay.textContent = addCommas(Value);

        collecting()
        
      }

    }
  }

}

function collecting(){

  if(operating == false){
    console.log(Value + ' has been added collector[0]')
    collector[0] = Value
  }

  if(operating == true){
    console.log(Value + ' has been added collector[1]')
    collector[1] = Value
  }

}

function calculating(sign){ 

  //check if the result will be a decimal or not
  for( e in collector){
    if (collector[e] !== parseInt(collector[e])) {
      isDecimal = true
    }
  }

  if (sign == '/'){

    if (parseInt(collector[1]) == 0){
      alert('You cannot divide by zero')

      return "Error"
    }
    else{
      let result = parseFloat((parseFloat(collector[0])/parseFloat(collector[1])).toFixed(2))
      collector = []
      collector[0] = result
  
      return result
    }

  }

  else if(sign == 'x'){
    let result = parseFloat((parseFloat(collector[0]) * parseFloat(collector[1])).toFixed(2))
    collector = []
    collector[0] = result

    return result

  }

  else if(sign == '-'){
    let result = parseFloat((parseFloat(collector[0]) - parseFloat(collector[1])).toFixed(2))
    collector = []
    collector[0] = result

    return result

  }

  else if(sign == '+'){
    let result = parseFloat((parseFloat(collector[0]) + parseFloat(collector[1])).toFixed(2))
    collector = []
    collector[0] = result

    return result

  }


}


function removeCommas(number) {

  const numberString = number.toString();
  const characters = numberString.split('');

  // Remove all commas from the array of characters.
  const charactersWithoutCommas = characters.filter(character => character !== ',');

  const result = charactersWithoutCommas.join('');

  return result;
}

function addCommas(number) {

  if (number.toString() === "Infinity"){return number.toString()}

  console.log(isDecimal)

  let isNegative = false;
  let decimalPart;
  
  // Convert the number to a string.
  const numberString = number.toString();
  let characters = numberString.split('');

  if(number == "Error"){
    return "Error"
  }

  //split the decimal bits.
  if(isDecimal){

    decimalPart = numberString.split('.');

    characters = decimalPart[0];
    characters = characters.split('');

    if(decimalPart[1] == null){
      decimalPart[1] = [0]
    }

    decimalPart = "."+ decimalPart[1];
  
  }


  // Split the string into an array of characters.
  if (characters[0] == '-'){
    isNegative = true;
    characters.shift()
  }

  // Insert a comma every 3 characters, starting from the right.
  for (let i = characters.length - 3; i >= 1; i -= 3) {
  
    characters.splice(i, 0, ',');
    
  }

  // Join the array of characters back into a string.
  let result = characters.join('');

  if(isDecimal == true){

    console.log(decimalPart)

    result += decimalPart

  }

  if(isNegative == true){
    return '-' + result;
  }
  
  if(result.length > 9){
    answerDisplay.style.fontSize = "50px"
  }else{ answerDisplay.style.fontSize = "60px" }

  if(result.length > 12){
    answerDisplay.style.fontSize = "40px";
  }else if (result.length > 9){answerDisplay.style.fontSize = "50px" }

  if(result.length > 15){answerDisplay.style.fontSize = "30px";}
  else if (result.length > 12){answerDisplay.style.fontSize = "40px"}

  if(result.length > 18){answerDisplay.style.fontSize = "25px";}
  else if (result.length > 15){answerDisplay.style.fontSize = "30px"}


  
  return result;
}
