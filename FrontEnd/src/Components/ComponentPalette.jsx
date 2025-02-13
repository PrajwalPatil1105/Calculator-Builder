import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { uniqueId } from "lodash";
import { useDraggable } from "@dnd-kit/core";
import useCalculatorStore from "../Store/calculatorStore";

const DraggableButton = ({ type, variant, label, onAddComponent }) => {
  const id = `palette_${type}_${label}`;
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: {
      type: "palette",
      componentData: {
        type,
        variant,
        label,
      },
    },
  });

  const getButtonStyle = (variant) => {
    const baseStyle =
      "px-6 py-3 rounded-lg text-white font-medium transition-transform cursor-grab active:cursor-grabbing";
    switch (variant) {
      case "primary":
        return `${baseStyle} bg-blue-500 hover:bg-blue-600`;
      case "secondary":
        return `${baseStyle} bg-gray-500 hover:bg-gray-600`;
      case "accent":
        return `${baseStyle} bg-purple-500 hover:bg-purple-600`;
      default:
        return `${baseStyle} bg-red-500 hover:bg-red-600`;
    }
  };

  return (
    <button
      ref={setNodeRef}
      className={`${getButtonStyle(variant)} ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      {...listeners}
      {...attributes}
      onClick={() =>
        onAddComponent({
          id: uniqueId(`calc_${type}_`),
          type: "button",
          props: { label, type, variant },
        })
      }
    >
      {label}
    </button>
  );
};

const ComponentPalette = ({ onAddComponent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const darkMode = useCalculatorStore((state) => state.darkMode);

  const componentTypes = [
    { label: "1", type: "number", variant: "primary" },
    { label: "2", type: "number", variant: "primary" },
    { label: "3", type: "number", variant: "primary" },
    { label: "4", type: "number", variant: "primary" },
    { label: "5", type: "number", variant: "primary" },
    { label: "6", type: "number", variant: "primary" },
    { label: "7", type: "number", variant: "primary" },
    { label: "8", type: "number", variant: "primary" },
    { label: "9", type: "number", variant: "primary" },
    { label: "0", type: "number", variant: "primary" },
    { label: "+", type: "operator", variant: "secondary" },
    { label: "-", type: "operator", variant: "secondary" },
    { label: "×", type: "operator", variant: "secondary" },
    { label: "÷", type: "operator", variant: "secondary" },
    { label: "=", type: "equals", variant: "accent" },
    { label: "C", type: "clear", variant: "danger" },
    { label: ".", type: "decimal", variant: "secondary" },
  ];

  return (
    <motion.div
      initial={{ y: "calc(100% - 40px)" }}
      animate={{ y: isOpen ? 0 : "calc(100% - 40px)" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed bottom-0 left-0 right-0"
    >
      <div
        className={`w-44 flex justify-center px-2 items-center cursor-pointer ${
          darkMode ? "bg-gray-800" : "bg-white border border-gray"
        } rounded-t-lg mx-auto`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          initial={false}
          className={`px-6 py-2 rounded-t-lg font-medium ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {isOpen ? "Hide" : "Add Buttons"}
        </motion.div>
      </div>

      <div
        className={`p-4 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-lg border-t ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {componentTypes.map((comp) => (
              <DraggableButton
                key={comp.label}
                type={comp.type}
                variant={comp.variant}
                label={comp.label}
                onAddComponent={onAddComponent}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ComponentPalette;
