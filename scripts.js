$(document).ready(function () {
	"use strict";
	class CalculatorUI {
		constructor() {
			this.bindButtons();
			this.calEng = new CalculatorEngine();
		}
		getNumbers(numVal) {
			var num = numVal.attr("data-number");
			var value = "";
			value = cal.calEng.setNumber(num);
			cal.showInput(value);
		}
		getOperator(operVal) {
			var oper = operVal.attr("data-operator");
			var value = "";
			value = cal.calEng.setOperator(oper);
			cal.showInput(value);
		}
		showInput(newVal) {
			$("#input").html(newVal);
		}
		getFloatNumber(floatVal) {
			var floatNum = floatVal.attr("data-float");
			var value = "";
			value = cal.calEng.setPoint(floatNum);
			cal.showInput(value);
		}
		bindButtons() {
			$(".number-button").click( function () {
				var numVal = $(this);
				cal.getNumbers(numVal);
			});
			$(".operator-button").click( function () {
				var operVal = $(this);
				cal.getOperator(operVal);
			});
			$("#equalBtn").click( function () {
				cal.getValues();
			});
			$("#clearBtn").click( function () {
				cal.clearAll();
			});
			$("#logBtn").click( function () {
				cal.showList();
			});
			$("#deleteBtn").click( function () { 
				cal.deleteValue();
			});
			$("#floatBtn").click( function () {
				var floatVal = $(this);
				cal.getFloatNumber(floatVal);
			});
		}
		showList() {
			$("#list").css({"visibility": "visible",});
		}
		logData(count) {
			var logList = "";
			logList = cal.calEng.logArray[count].firstNum + " " +
				cal.calEng.logArray[count].operator + " " +
				cal.calEng.logArray[count].secondNum + " = " +
				cal.calEng.logArray[count].result;
			$("<option></option>").appendTo("select").text(logList);
		}
		getValues() {
			var result = cal.calEng.calculate();
			$("#result").html(result);
			var count = cal.calEng.index;
			cal.logData(count);
		}
		deleteValue() {
			var result = cal.calEng.deleteNum();
			$("#input").html(result);
		}
		clearAll() {
			$("#input").empty();
			$("#result").empty();
			cal.calEng.clear();
		}
	}
	class CalculatorEngine {
		firstNum = "";
		secondNum = "";
		operator = "";
		logArray = [];
		index = "";
		result = "";
		setNumber(number) {
			var result = "";
			if (this.operator === "") {
				this.firstNum += number;
				result = this.firstNum;
			} else {
				this.secondNum += number;
				result = this.secondNum;
			}
			return result;
		}
		setOperator(operator) {
			this.operator = operator;
			return this.operator;
		}
		setPoint(point) {
			var result = "";
			if (this.operator === "" && this.firstNum.includes(".") !== true) {
				this.firstNum += point;
				result = this.firstNum;
			} else if(this.operator !== "" && this.secondNum.includes(".") !== true) {
				this.secondNum += point;
				result = this.secondNum;
			}
			return result;
		}
		calculate() {
			switch (this.operator) {
				case '+':
					if (this.firstNum.includes(".") === true && this.secondNum.includes(".") === true) {
						this.result = (this.firstNum * 10 + this.secondNum * 10 ) / 10;
					} else {
						this.result = (parseFloat(this.firstNum) + parseFloat(this.secondNum)); 
					}
					break;
				case '-':
					this.result = (parseFloat(this.firstNum) - parseFloat(this.secondNum));
					break;
				case '*':
					this.result = (parseFloat(this.firstNum) * parseFloat(this.secondNum));
					break;
				case '/':
					this.result = (parseFloat(this.firstNum) / parseFloat(this.secondNum));
					break;
			}
			this.saveValues();
			return this.result;
		}
		deleteNum() {
			var newNum = "";
			if (this.firstNum.length > 0 && this.operator === "") {
				this.firstNum = this.firstNum.substring(0, this.firstNum.length - 1);
				newNum = this.firstNum;
			} else if (this.operator.length != 0 && this.secondNum.length == 0) {
				this.operator = this.operator.substring(0, 0);
				newNum = this.operator;
			} else if (this.secondNum.length > 0) {
				this.secondNum = this.secondNum.substring(0, this.secondNum.length - 1);
				newNum = this.secondNum;
			}
			return newNum;
		}
		clear() {
			this.firstNum = "";
			this.secondNum = "";
			this.operator = "";
			this.result = "";
		}
		saveValues() {
			var objData = {
				"firstNum": this.firstNum,
				"operator": this.operator,
				"secondNum": this.secondNum,
				"result": this.result,
			};
			this.logArray.push(objData);
			this.index = (this.logArray.length) - 1;
			return this.logArray;
		}
	}
	var cal = new CalculatorUI();
});