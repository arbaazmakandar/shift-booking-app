import React from "react";
import ShiftCard from "./shiftCard";

const ShiftDateGroup = ({ date, shifts, cancelShift, formatTime }) => (
  <div>
    <h2 className="p-4 bg-gray-100 text-[#4F6C92] font-semibold text-left">
      {date}
    </h2>
    {shifts.map((shift, shiftIndex) => (
      <React.Fragment key={shiftIndex}>
        <ShiftCard
          shift={shift}
          cancelShift={cancelShift}
          formatTime={formatTime}
        />
        <hr />
      </React.Fragment>
    ))}
  </div>
);

export default ShiftDateGroup;
