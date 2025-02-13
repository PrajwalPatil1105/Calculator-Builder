import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { CalculatorButton } from "./CalculatorButton";

const SortableComponent = ({ component, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRemoveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(component.id);
  };

  if (isDragging) {
    return <div ref={setNodeRef} style={style} />;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative group"
    >
      <div
        {...listeners}
        className="absolute top-0 left-0 w-full h-6 cursor-move"
      />

      <div className="relative pt-6">
        {component.type === "button" && (
          <CalculatorButton {...component.props} />
        )}
        <button
          className="absolute top-3 -right-3 opacity-0 group-hover:opacity-100 h-6 w-6 flex items-center justify-center bg-red-500 text-white rounded-full text-sm transition-opacity duration-200 ease-in-out z-10"
          onClick={handleRemoveClick}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default SortableComponent;
