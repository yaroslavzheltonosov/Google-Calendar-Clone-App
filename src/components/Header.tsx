import { SetStateAction, useMemo } from "react";
import useCalendarDates from "../hooks/useCalendarDates";

import { MONTH_NAMES } from "../utils/consts";
import { CalendarDay } from "../utils/types";

type Props = {
  calendarDates: CalendarDay[];
  setCalendarDates: React.Dispatch<SetStateAction<CalendarDay[]>>;
};

const Header = ({ calendarDates, setCalendarDates }: Props) => {
  const currentDate = new Date();

  const firstDayInCurrentMonth = useMemo(() => {
    return calendarDates.find((day) => !day.nonMonthDay && !day.oldMonthDay);
  }, [calendarDates]);
  const currentPickedMonth = useMemo(() => firstDayInCurrentMonth!.month, [firstDayInCurrentMonth]);
  const currentPickedYear = useMemo(() => firstDayInCurrentMonth!.year, [firstDayInCurrentMonth]);

  const currentDates = useCalendarDates(currentDate.getFullYear(), currentDate.getMonth() + 1);
  const previousMonthDates = useCalendarDates(currentPickedYear, currentPickedMonth - 1);
  const nextMonthDates = useCalendarDates(currentPickedYear, currentPickedMonth + 1);

  const handleLoadCurrentDate = () => {
    setCalendarDates(currentDates);
  };

  const handleLoadPreviousMonth = () => {
    setCalendarDates(previousMonthDates);
  };

  const handleLoadNextMonth = () => {
    setCalendarDates(nextMonthDates);
  };

  return (
    <div className="header">
      <button className="btn" onClick={handleLoadCurrentDate}>
        Today
      </button>
      <div>
        <button className="month-change-btn" onClick={handleLoadPreviousMonth}>
          &lt;
        </button>
        <button className="month-change-btn" onClick={handleLoadNextMonth}>
          &gt;
        </button>
      </div>
      <span className="month-title">{`${MONTH_NAMES[currentPickedMonth - 1]} ${currentPickedYear}`}</span>
    </div>
  );
};

export default Header;
