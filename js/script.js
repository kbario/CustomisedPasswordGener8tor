// Assignment Code
var generateBtn = document.querySelector("#generate");


// generate password
function generatePassword() {

  // as what criteria to set
  var which = prompt("Password criteria to include:", "length, character types");
  which = which.toLowerCase();
  var arr = which.split(", ");

  // based on above, ask what length of password is
  if (arr.includes("length")) {
    var len = Number(prompt("How long do you want the passord to be?", "A number between 8 and 128"));
    len = len - 1
    while (len > 127 || len < 7){
      alert("The provided number is not within bounds");
      len = Number(prompt("How long do you want the passord to be?", "A number between 8 and 128"));
    }
  } else {
    var len = 12;
  }

  // based on above, as what character types to include
  if (arr.includes("character types")){
    var low = confirm("Include Lowercase?");
    var upp = confirm("Include Uppercase?");
    var num = confirm("Include Numbers?");
    var special = confirm("Include Special Characters?");

    var criteriaNames = ['low', 'upp', 'num', 'special']
    var criteria = [low, upp, num, special];

    arrObj = [];
    for (var i = 0; i < criteria.length; i++){
      arrObj.push({
        name: criteriaNames[i],
        val: criteria[i]
      });
    };

    if (!arrObj[0].val && !arrObj[1].val && !arrObj[2].val && !arrObj[3].val){
      var tru = Math.floor((Math.random() * 4) + 1);
      arrObj[tru].val = true;
    }; 
  } else {
    var criteriaNames = ['low', 'upp', 'num', 'special'];
    arrObj = [];
    for (var i = 0; i < criteriaNames.length; i++){
      arrObj.push({
        name: criteriaNames[i],
        val: true
      });
    };
  };

  var whichChars = [];
  for (var i = 0; i < arrObj.length; i++) {
    if (arrObj[i].val){
      whichChars.push(i);
    }
  }

  // defining characters
  var lows = "abcdefghijklmnopqrstuvwxyz";
  var upps = lows.toUpperCase();
  lows = lows.split("");
  upps = upps.split("");
  var nums = "1234567890";
  nums = nums.split("");
  var specials = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
  specials = specials.split("");
  
  var arrChars = [lows, upps, nums, specials];

  // creating full character list 
  var chars = arrChars[whichChars[0]];
  if (whichChars.length !== 1){
    for (var i = 1; i < (whichChars.length); i++){
      chars = chars.concat(arrChars[whichChars[i]]);
    }
  }
  
  var rando = Math.floor((Math.random() * chars.length) + 1);
  var passy = chars[rando]
  for (var i = 0; i < len; i++){
    rando = Math.floor((Math.random() * chars.length) + 1);
    passy = passy.concat(chars[rando])
  };
  return passy
};

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
