import React from "react";
import { motion } from "framer-motion";
import useCalculatorStore from "../Store/calculatorStore";

export const CalculatorButton = ({ label, type, variant, darkMode }) => {
  const handleCalculatorInput = useCalculatorStore(
    (state) => state.handleCalculatorInput
  );

  const getButtonStyle = () => {
    const baseStyle = "w-full h-16 rounded-lg font-medium text-xl shadow-md";
    const darkModeStyle = darkMode ? "shadow-white-200" : "shadow-grey-700";

    switch (variant) {
      case "primary":
        return `${baseStyle} ${
          darkMode ? "bg-blue-600" : "bg-blue-500"
        } text-white ${darkModeStyle}`;
      case "secondary":
        return `${baseStyle} ${darkMode ? "bg-gray-700" : "bg-gray-200"} ${
          darkMode ? "text-white" : "text-gray-800"
        } ${darkModeStyle}`;
      case "accent":
        return `${baseStyle} ${
          darkMode ? "bg-purple-600" : "bg-purple-500"
        } text-white ${darkModeStyle}`;
      case "danger":
        return `${baseStyle} ${
          darkMode ? "bg-red-600" : "bg-red-500"
        } text-white ${darkModeStyle}`;
      default:
        return baseStyle;
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleCalculatorInput(label);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.1 }}
      whileHover={{ scale: 1.04 }}
    >
      <button
        className={getButtonStyle()}
        onClick={handleButtonClick}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
        }}
      >
        {label}
      </button>
    </motion.div>
  );
};
