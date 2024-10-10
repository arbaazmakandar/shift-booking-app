import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { groupShiftsByDateOnly } from "../../utils/utils";
import ShiftDateGroup from "./shiftDateGroup";
import toast, { Toaster } from "react-hot-toast";

function MyShifts() {
  const bookedShifts = useSelector((state) => state.bookedShifts);
  const groupedShifts = groupShiftsByDateOnly(bookedShifts);
  const dispatch = useDispatch();

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const cancelShift = async (shiftId) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/shifts/${shiftId}/cancel`
      );

      console.log("Shift canceled:", res.data);

      dispatch({ type: "CANCEL_SHIFT", payload: { id: shiftId } });

      toast.success("Shift successfully canceled!");
    } catch (err) {
      console.error(
        "Error cancelling shift:",
        err.response?.data?.message || "An error occurred"
      );

      toast.error(
        `Failed to cancel shift: ${
          err.response?.data?.message || "An error occurred"
        }`
      );
    }
  };
  return (
    <>
      <div className="m-10 w-full md:w-1/2 sm:1/2 p-4 mx-auto text-center py-5 border shadow-lg rounded-lg bg-white">
        <Toaster />
        <div className="content-container items-center justify-between">
          <div>
            {bookedShifts.length === 0
              ? "No available shifts"
              : Object.keys(groupedShifts).map((date, dateIndex) => (
                  <ShiftDateGroup
                    key={dateIndex}
                    date={date}
                    shifts={groupedShifts[date]}
                    cancelShift={cancelShift}
                    formatTime={formatTime}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyShifts;
