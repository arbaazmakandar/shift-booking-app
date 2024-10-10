import React from "react";

const ShiftCard = ({ shift, cancelShift, formatTime }) => (
  <div className="flex justify-between p-4 text-[#004FB4] font-light ">
    <p className="flex flex-col">
      {formatTime(shift.id.startTime)} - {formatTime(shift.id.endTime)}
    </p>
    <p>{shift.id.area}</p>

    <div className="flex gap-4">
      <button
        className="bg-transparent hover:bg-[#EED2DF] text-[#E2006A] font-semibold hover:text-[#E2006A] px-6 border border-[#DE93B3] hover:border-transparent rounded-3xl"
        onClick={() => cancelShift(shift.id.id)}
      >
        Cancel
      </button>
    </div>
  </div>
);

export default ShiftCard;
