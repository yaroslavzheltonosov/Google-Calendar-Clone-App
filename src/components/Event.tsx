import { useState } from "react";
import clsx from "clsx";
import Modal from "./Modal";
import { useConvertDates } from "../hooks/useConvertDates";

import { CalendarEvent } from "../utils/types";

const isOldDate = (eventDate: Date) => {
  const currentDate = new Date();
  const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const eventDateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
  return eventDateOnly < currentDateOnly;
};

const Event = ({ date, year, name, color, month, allDay, startTime = "", endTime = "", id }: CalendarEvent) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const eventDate = new Date(year, month - 1, date);
  const isOldDateEvent = isOldDate(eventDate);

  const convertedStartTime = useConvertDates(startTime);
  const convertedEndTime = useConvertDates(endTime);

  const eventClasses = clsx("event", color, {
    "all-day-event": allDay,
    "old-date-event": isOldDateEvent,
  });

  const handleShowAddEventModal = () => {
    setShowModal(true);
  };
  return (
    <div className={eventClasses}>
      <div className="event" onClick={handleShowAddEventModal}>
        <div className={`color-dot ${color}`}></div>
        <div className="event-time">{convertedEndTime ? `${convertedStartTime} - ${convertedEndTime}` : convertedStartTime}</div>
        <div className="event-name">{name}</div>
      </div>
      {showModal && (
        <Modal
          year={year}
          month={month}
          date={date}
          name={name}
          color={color}
          allDay={allDay}
          startTime={startTime}
          endTime={endTime}
          setShowModal={setShowModal}
          type="EditEvent"
          id={id}
        />
      )}
    </div>
  );
};

export default Event;
