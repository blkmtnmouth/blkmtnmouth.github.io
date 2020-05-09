// Assignment Code
var generateBtn = document.querySelector("#generate");



// Write password to the #password input
  function generatePassword() {

    var lowChar = "abcdefghijklmnopqrstuvwxyz"; 
    var upChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
    var numbChar = "1234567890"; 
    var specChar = "!@#$%^&*()_+"; 
    var masterChar = "";
    var passWord = "";

    var passLength = prompt ("How long do you want your password to be? "); 
    var lowerCase = confirm ("Do you want lowercase letters? ");
    var upperCase = confirm ("Do you want uppercase letters? ");
    var numReg = confirm ("Do you want numbers? ");
    var special  = confirm ("Do you want special characters in your password? ");

    if (passLength < 8 || passLength > 128){
      alert ("your password needs to be 8-128 characters. ");
    }

    else if (lowerCase === false && upperCase === false && numReg === false && special === false){
      alert ("You need to pick at least one option ");
    }

    else {

      if (lowerCase === true){
        masterChar = masterChar + lowChar;
      }   

      if (upperCase === true){
        masterChar = masterChar + upChar;
      }

      if (numReg === true){
        masterChar = masterChar + numbChar;
      }

      if (special === true){
        masterChar = masterChar + specChar;
      }

      var i; 
      for (i = 0; i < passLength; i++){
       var index = Math.floor(Math.random() * masterChar.length);
        passWord = passWord + masterChar.charAt(index);
      } 

      return passWord;

    }

  }

  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

// Add event listener to generate button
generateBtn.addEventListener("click", generatePassword);
