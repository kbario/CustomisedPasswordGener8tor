// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordText = document.querySelector("#password");

// gets the length of password from user
function passwordLength() {
  // as how long they want the password to be
  var len = prompt("How long do you want the password to be?", "A number between 8 and 128");
  // while the length is not within the bound of 8 and 128 or they have not removed the placeholder, keep asking until it is
  while (len > 128 || len < 8 || isNaN(len)) {
    alert("The provided number is not within bounds");
    len = prompt("How long do you want the passord to be?", "A number between 8 and 128");
  }
  return len
}

function passwordCharactersInclude() {
  // ask what character types to include
  var low = confirm("Include Lowercase?");
  var upp = confirm("Include Uppercase?");
  var num = confirm("Include Numbers?");
  var special = confirm("Include Special Characters?");

  // create an array with the booleans from these alerts
  var criteria = [low, upp, num, special];

  return criteria
}

// check which char types to include
function passwordCreateWhichArr(criteria) {
  // create another array that contains the index of prompts that contain true values
  var whichChars = [];
  for (var i = 0; i < criteria.length; i++) {
    if (criteria[i]){
      whichChars.push(i);
    }
  }
  return whichChars
}

function defineChars() {
   // defining characters
   var lows = "abcdefghijklmnopqrstuvwxyz";
   var upps = lows.toUpperCase();
   lows = lows.split("");
   upps = upps.split("");
   var nums = "1234567890";
   nums = nums.split("");
   var specials = " !\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";
   specials = specials.split("");
 
   var arrChars = [lows, upps, nums, specials];
   return arrChars
};

// generate password
function generatePassword() {
  // get password length
  var len = passwordLength();
  // get the charcter types to include
  var criteria  = passwordCharactersInclude();
  // make an array of the index of the arrays to include
  var whichChars = passwordCreateWhichArr(criteria);

  // if the array is empty repeat above until it is it has atleast one index
  while (whichChars.length === 0){
    var isReselect = confirm("You did not select any character types to include. Do you want to reselect? If not, a random character type will be selected for you.")
    if (isReselect) {
      criteria = passwordCharactersInclude();
      whichChars = passwordCreateWhichArr(criteria);
    } else {
      var index = Math.floor(Math.random() * 4);
      whichChars.push(index)
    }
  };

  // define the character type arrays 
  var arrChars = defineChars();

  // creating a single character list with the selected types
  var chars = arrChars[whichChars[0]];
  if (whichChars.length !== 1) {
    for (var i = 1; i < whichChars.length; i++) {
      chars = chars.concat(arrChars[whichChars[i]]);
    }
  }

  // randomly select from the created character array the characters to be included into the password
  var rando = Math.floor(Math.random() * chars.length);
  var passy = chars[rando];
  for (var i = 1; i < len; i++) {
    rando = Math.floor(Math.random() * chars.length);
    passy = passy.concat(chars[rando]);
  }
  return passy;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
