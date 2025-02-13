import { useState } from "react";

const useCalculator = () => {
  const [display, setDisplay] = useState({
    expression: "",
    result: "0",
    lastOperation: null,
  });

  // --------------------------- Replacing the Operator -----------------------------------
  const calculate = (expression) => {
    try {
      const sanitizedExpression = expression
        .replace(/×/g, "*")
        .replace(/÷/g, "/");
      return eval(sanitizedExpression).toString();
    } catch (error) {
      return "Error";
    }
  };

  const handleInput = (value) => {
    setDisplay((prev) => {
      let newExpression = prev.expression;
      let newResult = prev.result;

      switch (value) {
        case "C":
          return {
            expression: "",
            result: "0",
            lastOperation: null,
          };

        case "=":
          if (prev.expression) {
            const result = calculate(prev.expression);
            return {
              expression: "",
              result: result,
              lastOperation: null,
            };
          }
          return prev;

        case "+":
        case "-":
        case "×":
        case "÷":
          if (prev.lastOperation) {
            newExpression = newExpression.slice(0, -1) + value;
          } else {
            newExpression += prev.result + value;
          }
          return {
            expression: newExpression,
            result: prev.result,
            lastOperation: value,
          };

        default:
          if (prev.lastOperation) {
            newResult = value;
          } else {
            newResult = prev.result === "0" ? value : prev.result + value;
          }
          return {
            expression: prev.expression,
            result: newResult,
            lastOperation: null,
          };
      }
    });
  };

  return {
    display,
    handleInput,
  };
};

export default useCalculator;
