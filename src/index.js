
var openingBrackets = "";
var closingBrackets = "";
var config;

module.exports = function check(str, bracketsConfig) {
  var expression = str.split('');
  var stack = [];
  config = bracketsConfig;

  for (var i = 0; i < bracketsConfig.length; i++) {
    openingBrackets += bracketsConfig[i][0];
   }

  for (var i = 0; i < bracketsConfig.length; i++) {
    closingBrackets += bracketsConfig[i][1];
  }
  console.log("openingBrackets: " + openingBrackets);
  console.log("closingBrackets: " + closingBrackets);

  for (var i = 0; i < expression.length; i++) {
    if (isParanthesis(expression[i])) {
      if (isOpenParenthesis(expression[i]) || hasTheSameClosingPar(expression[i]) && !matches(stack[stack.length - 1], expression[i])) {
        stack.push(expression[i]); // adding open parenthesis found
      } else {
        if (stack.length === 0) { // the very first element is a closing parenthesis, false
          return false;
        }
        var top = stack.pop(); // pop off the top element from stack
        if (!matches(top, expression[i])) {
          return false;
        }
      }
    }
  }
  openingBrackets = "";
  closingBrackets = "";
  config = [];
  console.log(stack.length);
  return stack.length === 0 ? true : false;
}



function isParanthesis(char) {
  if (openingBrackets.indexOf(char) > -1 || closingBrackets.indexOf(char) > -1 ) {
    return true;
  } else {
    return false;
  }
}

function isOpenParenthesis(parenthesisChar) {
  for (var j = 0; j < config.length; j++) {
    if (config[j][0] === parenthesisChar && !hasTheSameClosingPar(config[j][0])) {
      return true;
    }
  }
  return false;
}

function hasTheSameClosingPar(parenthesisChar) {
  for (var j = 0; j < config.length; j++) {
    if (config[j][0] === parenthesisChar && config[j][1] === parenthesisChar) {
      return true;
    }
  }
  return false;
}

function matches(topOfStack, closedParenthesis) {
  for (var k = 0; k < config.length; k++) {
    if (config[k][0] === topOfStack && config[k][1] === closedParenthesis) {
      return true;
    }
  }
  return false;
}
