const initialState = {
  bookedShifts: JSON.parse(localStorage.getItem("bookedShifts")) || [],
};

const shiftsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BOOK_SHIFT":
      const updatedBookedShifts = [...state.bookedShifts, action.payload];
      localStorage.setItem("bookedShifts", JSON.stringify(updatedBookedShifts));
      return {
        ...state,
        bookedShifts: updatedBookedShifts,
      };
    case "CANCEL_SHIFT":
      const updatedCanceledShifts = state.bookedShifts.filter(
        (shift) => shift.id.id !== action.payload.id
      );
      localStorage.setItem(
        "bookedShifts",
        JSON.stringify(updatedCanceledShifts)
      );
      return {
        ...state,
        bookedShifts: updatedCanceledShifts,
      };
    default:
      return state;
  }
};

export default shiftsReducer;
