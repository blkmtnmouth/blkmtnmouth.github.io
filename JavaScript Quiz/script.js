//create list of questions and list of choice and whether they were correct or wrong. 

var questionsList = ["Q1: How do you declare a JavaScript variable? ", "Q2: How to write an IF statement in JavaScript? ", "Q3: How do you add a comment in JavaScript? ", "Q4: Which event occurs when the user clicks on the HTML element? "];

var choicesQ1 = ["A: variable carName; ", "B: v carName;", "C: var carName; ", "D: carName "]; 
var ansQ1 = ["wrong", "wrong", "correct", "wrong"];

var choicesQ2 = ["A: if i=5", "B: if i ==5 then ", "C: if i = 5 then", "D: if (i==5)"]; 
var ansQ2 = ["wrong", "wrong", "wrong", "correct"];

var choicesQ3 = ["A: !This is a comment! ", "B: //This is a comment ", "C: 'This is a comment ", "D: **This is a comment "]; 
var ansQ3 = ["wrong", "correct", "wrong", "wrong"];

var choicesQ4 = ["A: onclick", "B: onmouseover ", "C: onchange ", "D: onmouseclick "]; 
var ansQ4 = ["wrong", "wrong", "correct", "wrong"];

var userNameSpan = document.querySelector("#name");
var scoreSpan = document.querySelector("#score");
var lastUser = JSON.parse(localStorage.getItem("userNameScore")) || [];
userNameSpan.textContent = lastUser.name;
scoreSpan.textContent = lastUser.score;


//collecting all choices and answers into one array
var choiceArray = [choicesQ1, choicesQ2, choicesQ3, choicesQ4];
var ansArray = [ansQ1, ansQ2, ansQ3, ansQ4]; 

//starting variables for later
var choices; 
var ans; 
var round = 0; 
var btns = ["A", "B", "C", "D"];
var timeLeft = 60;
var myVar; 

//setting how often to do the timer function (counting down)
function myFunction() {
  myVar = setInterval(timer, 1000);
} 

//the countdown
function timer(){
  if (timeLeft > 0){
    timeLeft = timeLeft - 1; 
    document.getElementById("timer").innerHTML = timeLeft;
  } else {
    gameOver();
    clearInterval(myVar);
  }
}

  // startTimer();
  myFunction();
  //ask first question
  startGame(round); 


//this function cycles through the round and puts in new Q/As. 
function startGame(round){
  if (round < questionsList.length){
    //finds h2 and changes to the Q
    document.querySelector("h2").innerHTML = questionsList[round];
    console.log(questionsList[round]);
    //finds buttons and changes them to the choices
    choices = choiceArray[round];
    console.log(choices); 
    ans = ansArray[round];
    console.log(ans);

    for (i=0; i<btns.length; i++){
      document.getElementById("btn" + btns[i]).innerHTML = choices[i];
    }

  } else {
    gameOver(); 
    clearInterval(myVar);
  }  

}

function checkUserChoice (userChoice){
  if (ans[userChoice] == "correct"){
    round++; 
    startGame(round);
  } else {
    round++; 
    startGame(round);
    //take time
    timeLeft = timeLeft - 10;
    document.getElementById("timer").innerHTML = timeLeft;
  }
}

function gameOver(){
  //user puts in name save name to local storage
  var submitButton = document.querySelector("#submit");
  var userNameInput = document.querySelector("#user-name")
  var userNameSpan = document.querySelector("#name");
  var scoreSpan = document.querySelector("#score");

  submitButton.addEventListener("click", function(event){
    event.preventDefault();
    
    var user = {
      name: userNameInput.value.trim(), 
      score: timeLeft
    };

    localStorage.setItem("userNameScore", JSON.stringify(user));
    console.log(user);
    //display results
    var lastUser = JSON.parse(localStorage.getItem("userNameScore"));
    userNameSpan.textContent = lastUser.name;
    scoreSpan.textContent = lastUser.score;
  
    var highScores = JSON.parse(localStorage.getItem("userNameScore"));
    highScores = highScores.push(lastUser);
  });
  
  //get recent submission
} 

