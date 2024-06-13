import Event from "./Event";
import { CalendarEvent } from "../utils/types";

type Props = {
  events: CalendarEvent[];
};

const Events = ({ events }: Props) => {
  const allDayEvents = events.filter((event) => event.allDay);
  const timedEvents = events.filter((event) => !event.allDay);

  const sortedEvents = [...allDayEvents, ...timedEvents];
  return (
    <div className="events">
      {sortedEvents.map(({ date, year, month, name, color, allDay, startTime, endTime, id }) => {
        return (
          <Event date={date} month={month} year={year} name={name} color={color} allDay={allDay} startTime={startTime} endTime={endTime} key={id} id={id} />
        );
      })}
    </div>
  );
};

export default Events;
