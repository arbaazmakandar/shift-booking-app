import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { formatTime, groupShiftsByDate } from "../../utils/utils";
import ShiftDateGroup from "./shiftDateGroup";
import toast, { Toaster } from "react-hot-toast";

function AvailableShifts() {
  const [myShifts, setMyShifts] = useState([]);
  const [activeArea, setActiveArea] = useState("Helsinki");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await axios.get("http://localhost:8080/shifts ");
        setMyShifts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchList();
  }, []);

  const bookShift = async (shiftId) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/shifts/${shiftId}/book`
      );

      console.log("Shift booked:", res.data);
      dispatch({ type: "BOOK_SHIFT", payload: { id: res.data } });
      toast.success("Shift successfully booked!");
    } catch (err) {
      console.error("Error booking shift:", err.response.data.message);
      toast.error(`Failed to book shift: ${err.response.data.message}`);
    }
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

  const uniqueAreas = [...new Set(myShifts.map((shift) => shift.area))];
  const groupedShifts = groupShiftsByDate(myShifts, activeArea);

  return (
    <div className="m-10 w-full md:w-1/2 sm:1/2 p-4 mx-auto text-center py-5 border shadow-lg rounded-lg bg-white">
      <Toaster />
      <div className="tabs-container flex justify-center">
        {uniqueAreas.map((area, index) => (
          <div
            key={index}
            className={`px-10 pb-4 tab font-semibold ${
              area === activeArea ? "text-[#004FB4] active" : "text-[#A4B8D3]"
            }`}
            onClick={() => setActiveArea(area)}
          >
            {area}({area.length})
          </div>
        ))}
      </div>
      <div className="content-container items-center justify-between">
        {activeArea &&
          Object.keys(groupedShifts).map((date, dateIndex) => (
            <ShiftDateGroup
              key={dateIndex}
              date={date}
              shifts={groupedShifts[date]}
              bookShift={bookShift}
              cancelShift={cancelShift}
              formatTime={formatTime}
            />
          ))}
      </div>
    </div>
  );
}

export default AvailableShifts;
