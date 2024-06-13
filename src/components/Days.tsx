import { useContext } from "react";
import { CalendarContext } from "../GoogleCloneApp";
import Day from "./Day";

import { CalendarDay } from "../utils/types";

type Props = {
  calendarDates: Array<CalendarDay>;
};

const Days = ({ calendarDates }: Props) => {
  const { stateContext } = useContext(CalendarContext);

  return (
    <div className="days">
      {calendarDates.map((day) => {
        const events = stateContext?.filter((event) => event.date === day.date && event.month === day.month && event.year === day.year);

        return <Day {...day} events={events} key={day.id} />;
      })}
    </div>
  );
};

export default Days;
