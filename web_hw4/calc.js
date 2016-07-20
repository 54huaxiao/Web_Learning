var expression = "";
var left = 0, right = 0;
var operator = ["+", "-", "*", "/"];
var equalIsPress = false;
var preIsDot = false;
var preIsOperator = false;

window.onload = function() {
	document.getElementById("back").onclick = function() {
		Back();
	}
	document.getElementById("clear").onclick = function() {
		Clear();
	}
	document.getElementById("equal").onclick = function() {
		Compute();
	}

	var btns = document.getElementsByTagName("input");
	var re = /normal_btn/;
	for (var i = 0; i < btns.length; i++) {
		if (re.test(btns[i].className)) {
			btns[i].onclick = function(event) {
				readIn(event.target.value);
			}
		}
	}
}

function display() {
	var express = document.getElementById("express-view");
	express.value = expression;
}

function errorMessage(isWrong) {
	var express = document.getElementById("express-view");
	if (isWrong) {
		express.style.borderColor = 'red';
	} else {
		express.style.borderColor = 'grey';
	}
}

function readIn(s) {
	if (s === '(') {
		++left;
	} else if (s === ')') {
		++right;
		if (right > left) {
			errorMessage(true);
			return;
		}
	}
	var isOperator = operator.some(function (item, index, array) {
        return item === s;
    });

    if (preIsOperator && isOperator) {
    	errorMessage(true);
    	return;
    }
    if (isOperator) {
    	preIsOperator = true;
    	preIsDot = false;
    } else {
    	preIsOperator = false;
    	if (equalIsPress) {
    		expression = "";
    	}
    }

    if (preIsDot && s === '.') {
    	errorMessage(true);
    	return;
    }
    if (s === '.') {
    	preIsDot = true;
    }

    expression += s;
    errorMessage(false);
    equalIsPress = false;
    display();
}

function Back() {
	if (preIsOperator) {
		preIsOperator = false;
	}
	errorMessage(false);
	if (expression != "") {
		if (expression[expression.length - 1] === ".") {
			preIsDot = false;
		}
		expression = expression.substring(0, expression.length - 1);
		display();
	}
}

function Clear() {
	errorMessage(false);
	preIsDot = false;
	preIsOperator = false;
	left = 0;
	right = 0;
	expression = "";
	display();
}

function Compute() {
	try {
		if (expression) {
			var ans = parseFloat(eval(expression).toFixed(10));
			expression = ans.toString();
			if (isNaN(ans)) {
				alert("not a number");
				expression = "";
			}
		}
	} catch (err) {
		alert("invalid expression");
		expression = "";
	}
	errorMessage(false);
	display();
	preIsOperator = false;
    equalIsPress = true;
    var re = /./;
    if (re.test(expression))
        preIsDot = true;
    else
        preIsDot = false;
    left = 0;
    right = 0;
}