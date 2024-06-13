import { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import Events from "./Events";
import Modal from "./Modal";
import { CalendarContext } from "../GoogleCloneApp";

import { CalendarDay } from "../utils/types";

const isTodayDate = (date: number, month: number, year: number) => {
  const currentDate = new Date();
  return currentDate.getDate() === date && currentDate.getMonth() === month - 1 && currentDate.getFullYear() === year;
};

const Day = ({ date, month, year, nonMonthDay, oldMonthDay, dayOfWeek, events = [] }: CalendarDay) => {
  const { stateContext } = useContext(CalendarContext);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("CalendarContext", JSON.stringify(stateContext));
  }, [stateContext]);

  const isCurrentDate = isTodayDate(date, month, year);

  const dayClasses = clsx("day", {
    "non-month-day": nonMonthDay,
    "old-month-day": oldMonthDay,
  });
  const dateClasses = clsx("day-number", {
    today: isCurrentDate,
  });

  const handleShowAddEventModal = () => {
    setShowModal(true);
  };
  return (
    <div className={dayClasses}>
      <div className="day-header">
        <div className="week-name">{dayOfWeek}</div>
        <div className={dateClasses}>{date}</div>
        <button className="add-event-btn" onClick={handleShowAddEventModal}>
          +
        </button>
      </div>
      <Events events={events} />
      {showModal && <Modal year={year} month={month} date={date} type="AddEvent" setShowModal={setShowModal} />}
    </div>
  );
};

export default Day;
