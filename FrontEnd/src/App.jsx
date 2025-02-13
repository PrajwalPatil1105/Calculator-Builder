import React from "react";
import CalculatorBuilder from "./Components/CalculatorBuilder";
import DarkModeToggle from "./Components/DarkModeToggle";

const App = () => {
  return (
    <div className="font-poppins">
      <DarkModeToggle />
      <CalculatorBuilder />
    </div>
  );
};

export default App;
