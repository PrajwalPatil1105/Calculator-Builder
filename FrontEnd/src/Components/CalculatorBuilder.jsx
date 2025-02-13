import React from "react";
import { motion } from "framer-motion";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  useDroppable,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import useCalculatorStore from "../Store/calculatorStore";
import SortableComponent from "./SortableComponent";
import ComponentPalette from "./ComponentPalette";
import { Display } from "./Display";
import DarkModeToggle from "./DarkModeToggle";
import { CalculatorButton } from "./CalculatorButton";

const DroppableArea = ({ children, darkMode }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: "calculator-area",
  });

  return (
    <div
      ref={setNodeRef}
      className={`grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 md:gap-4 mb-24 min-h-[100px] ${
        isOver ? (darkMode ? "bg-gray-700/30" : "bg-gray-100/50") : ""
      } rounded-lg transition-colors`}
    >
      {children}
    </div>
  );
};

const CalculatorBuilder = () => {
  const {
    components,
    darkMode,
    addComponent,
    removeComponent,
    updateLayout,
    undo,
    redo,
  } = useCalculatorStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.data.current?.type === "palette") {
      if (
        over &&
        (over.id === "calculator-area" ||
          components.some((comp) => comp.id === over.id))
      ) {
        const { componentData } = active.data.current;
        const id = `calc_${componentData.type}_${Date.now()}`;
        const newComponent = {
          id,
          type: "button",
          props: {
            ...componentData,
            darkMode,
          },
        };

        if (over.id === "calculator-area") {
          addComponent(newComponent);
        } else {
          const newIndex = components.findIndex((comp) => comp.id === over.id);
          const newComponents = [...components];
          newComponents.splice(newIndex, 0, newComponent);
          updateLayout(newComponents);
        }
      }
      return;
    }

    if (active.id !== over?.id && over) {
      const oldIndex = components.findIndex((comp) => comp.id === active.id);
      const newIndex = components.findIndex((comp) => comp.id === over.id);

      const newComponents = [...components];
      const [movedComponent] = newComponents.splice(oldIndex, 1);
      newComponents.splice(newIndex, 0, movedComponent);

      updateLayout(newComponents);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen font-poppins ${
        darkMode ? "dark bg-calculator-dark" : "bg-calculator-light"
      }`}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* ----------------------------- Header--------------------------- */}
          <div className="grid grid-cols-12 gap-4 mb-6 items-center">
            <h1
              className={`col-span-12 lg:col-span-6 text-2xl md:text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-800"
              } text-center lg:text-left`}
            >
              Calculator Builder
            </h1>

            <div className="col-span-12 lg:col-span-6 flex flex-wrap gap-2 justify-center lg:justify-end items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={undo}
                className="px-2 py-1 w-20 sm:w-24 md:w-28 bg-button-secondary text-white rounded-md text-sm md:text-base"
              >
                Undo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={redo}
                className="px-2 py-1 w-20 sm:w-24 md:w-28 bg-button-secondary text-white rounded-md text-sm md:text-base"
              >
                Redo
              </motion.button>
              <div>
                <DarkModeToggle />
              </div>
            </div>
          </div>

          {/* ---------------------------Calculator display------------------- */}
          <div className="mb-6 max-w-xl mx-auto">
            <Display darkMode={darkMode} />
          </div>

          {/*----------------------------Calculator area----------------------*/}
          <SortableContext
            items={components.map((c) => c.id)}
            strategy={rectSortingStrategy}
          >
            <DroppableArea darkMode={darkMode}>
              {components.map((component) => (
                <SortableComponent
                  key={component.id}
                  component={component}
                  onRemove={() => removeComponent(component.id)}
                />
              ))}
            </DroppableArea>
          </SortableContext>

          {/* -------------------------------Component palette--------------------------------- */}
          <div className="fixed bottom-0 left-0 right-0 bg-opacity-90 backdrop-blur-sm px-4 py-3">
            <ComponentPalette onAddComponent={addComponent} />
          </div>
        </div>
      </DndContext>
    </motion.div>
  );
};

export default CalculatorBuilder;
