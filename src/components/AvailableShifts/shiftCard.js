import React from "react";

const ShiftCard = ({ shift, bookShift, cancelShift, formatTime }) => {
  return (
    <div className="flex justify-between p-4 text-[#004FB4] font-light ">
      <p>
        {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
      </p>
      <div className="flex gap-4">
        <button
          className="bg-transparent hover:bg-[#CAEFD8] text-[#16A64D] font-semibold hover:text-[#16A64D] px-6 border border-[#55CB82] hover:border-transparent rounded-3xl"
          onClick={() => {
            bookShift(shift.id);
          }}
        >
          Book
        </button>
        <button
          className="bg-transparent hover:bg-[#EED2DF] text-[#E2006A] font-semibold hover:text-[#E2006A] px-6 border border-[#DE93B3] hover:border-transparent rounded-3xl"
          onClick={() => cancelShift(shift.id)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ShiftCard;
