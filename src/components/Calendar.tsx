import { useState } from "react";
import Days from "./Days";
import Header from "./Header";
import useCalendarDates from "../hooks/useCalendarDates";
import { CalendarDay } from "../utils/types";

function LoadInitialState() {
  const currentDate = new Date();
  const currentDates = useCalendarDates(currentDate.getFullYear(), currentDate.getMonth() + 1);
  return currentDates;
}

const Calendar = () => {
  const [calendarDates, setCalendarDates] = useState<CalendarDay[]>(LoadInitialState);
  return (
    <div className="calendar">
      <Header calendarDates={calendarDates} setCalendarDates={setCalendarDates} />
      <Days calendarDates={calendarDates} />
    </div>
  );
};

export default Calendar;
