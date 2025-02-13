import React from "react";
import { motion } from "framer-motion";
import useCalculatorStore from "../Store/calculatorStore";

export const Display = ({ darkMode }) => {
  const display = useCalculatorStore((state) => state.display);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full p-4 rounded-lg ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } shadow-lg mb-4`}
    >
      <div className="text-right">
        <div className="text-sm opacity-70 overflow-hidden">
          {display.expression || "\u00A0"}
        </div>
        <div className="text-3xl font-medium mt-1 overflow-hidden">
          {display.result || "0"}
        </div>
      </div>
    </motion.div>
  );
};
