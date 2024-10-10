import "./App.css";
import React, { useState } from "react";
import MyShifts from "./components/MyShifts/MyShifts";
import AvailableShifts from "./components/AvailableShifts/AvailableShifts";

function App() {
  const [activeTab, setActiveTab] = useState("myShifts");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="text-center m-5">
      <div className="flex justify-center gap-6 pt-10 px-10">
        <button
          onClick={() => handleTabChange("myShifts")}
          className={`text-2xl font-Medium ${
            activeTab === "myShifts" ? "text-[#004FB4]" : "text-[#A4B8D3]"
          }`}
        >
          My Shifts
        </button>
        <button
          onClick={() => handleTabChange("availableShifts")}
          className={`text-2xl font-Medium ${
            activeTab === "availableShifts"
              ? "text-[#004FB4]"
              : "text-[#A4B8D3]"
          }`}
        >
          Available Shifts
        </button>
      </div>
      {activeTab === "myShifts" ? (
        <MyShifts className="text-[#004FB4]" />
      ) : (
        <AvailableShifts className="text-[#A4B8D3]" />
      )}
    </div>
  );
}

export default App;
