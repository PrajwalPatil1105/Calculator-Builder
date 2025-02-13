import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import useCalculatorStore from "../Store/calculatorStore";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useCalculatorStore();

  return (
    <div
      className="fixed top-7 left-[90%] sm:left-[83%] lg:left-[75%] -translate-x-1/2"
      style={{ width: "auto" }}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleDarkMode}
        className={`p-3 rounded-full transition-colors ${
          darkMode
            ? "bg-gray-700 text-yellow-300"
            : "bg-yellow-100 text-yellow-600"
        }`}
      >
        <motion.div
          initial={false}
          animate={{ rotate: darkMode ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default DarkModeToggle;
