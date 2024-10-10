export const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  } else {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  }
};

export const formatTime = (time) => {
  return new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const groupShiftsByDate = (shifts, activeArea) => {
  const groupedShifts = {};

  shifts
    .filter((shift) => shift.area === activeArea)
    .forEach((shift) => {
      const date = formatDateTime(shift.startTime);

      if (!groupedShifts[date]) {
        groupedShifts[date] = [];
      }

      groupedShifts[date].push(shift);
    });

  return groupedShifts;
};

export const groupShiftsByDateOnly = (shifts) => {
  const groupedShifts = [];

  shifts.forEach((shift) => {
    const date = formatDateTime(shift.id.startTime);

    if (!groupedShifts[date]) {
      groupedShifts[date] = [];
    }
    
    groupedShifts[date].push(shift);
  });

  return groupedShifts;
};
