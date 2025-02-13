import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCalculatorStore = create(
  persist(
    (set, get) => ({
      components: [],
      history: [],
      currentStep: -1,
      darkMode: false,
      display: {
        expression: "",
        result: "0",
      },

      addComponent: (component) => {
        set((state) => {
          const newComponents = [...state.components, component];
          const newHistory = [
            ...state.history.slice(0, state.currentStep + 1),
            newComponents,
          ];

          return {
            components: newComponents,
            history: newHistory,
            currentStep: state.currentStep + 1,
          };
        });
      },

      removeComponent: (id) => {
        set((state) => {
          const newComponents = state.components.filter(
            (comp) => comp.id !== id
          );
          const newHistory = [
            ...state.history.slice(0, state.currentStep + 1),
            newComponents,
          ];

          return {
            components: newComponents,
            history: newHistory,
            currentStep: state.currentStep + 1,
          };
        });
      },

      updateLayout: (newLayout) => {
        set((state) => {
          const newHistory = [
            ...state.history.slice(0, state.currentStep + 1),
            newLayout,
          ];

          return {
            components: newLayout,
            history: newHistory,
            currentStep: state.currentStep + 1,
          };
        });
      },

      handleCalculatorInput: (value) => {
        set((state) => {
          const display = state.display;
          let newExpression = display.expression;
          let newResult = display.result;

          const isOperator = ["+", "-", "×", "÷"].includes(value);
          const isNumber = !isNaN(value) || value === ".";

          if (value === "C") {
            return {
              display: {
                expression: "",
                result: "0",
              },
            };
          }

          if (value === "=") {
            try {
              if (!newExpression && newResult) {
                return state;
              }

              const finalExpression = newExpression + newResult;
              const calculatedResult = eval(
                finalExpression.replace(/×/g, "*").replace(/÷/g, "/")
              );

              if (!isFinite(calculatedResult)) {
                throw new Error("Invalid calculation");
              }

              return {
                display: {
                  expression: "",
                  result: String(Number(calculatedResult.toFixed(8))),
                },
              };
            } catch (error) {
              return {
                display: {
                  expression: "",
                  result: "Can't divide by zero",
                },
              };
            }
          }

          if (isOperator) {
            if (display.result === "Can't divide by zero") {
              return state;
            }
            newExpression = display.result + value;
            newResult = "0";
          } else if (isNumber) {
            if (display.result === "Can't divide by zero") {
              newResult = value;
            } else if (display.result === "0" && value !== ".") {
              newResult = value;
            } else if (value === "." && display.result.includes(".")) {
              return state;
            } else {
              newResult = display.result + value;
            }
          }

          return {
            display: {
              expression: newExpression,
              result: newResult,
            },
          };
        });
      },

      undo: () => {
        set((state) => {
          if (state.currentStep > 0) {
            return {
              currentStep: state.currentStep - 1,
              components: state.history[state.currentStep - 1],
            };
          }
          return state;
        });
      },

      redo: () => {
        set((state) => {
          if (state.currentStep < state.history.length - 1) {
            return {
              currentStep: state.currentStep + 1,
              components: state.history[state.currentStep + 1],
            };
          }
          return state;
        });
      },

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: "calculator-storage",
    }
  )
);

export default useCalculatorStore;
