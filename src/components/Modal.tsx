import { useContext, useRef, useState } from "react";
import { CalendarContext } from "../GoogleCloneApp";
import PortalComponent from "./PortalComponent";

import { CalendarEvent } from "../utils/types";

type AddEvent = {
  type: "AddEvent";
};

type EditEvent = {
  type: "EditEvent";
} & CalendarEvent;

type EventType = (AddEvent | EditEvent) & {
  year: number;
  month: number;
  date: number;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = (props: EventType) => {
  const { year, month, date, type, setShowModal } = props;
  const { setStateContext } = useContext(CalendarContext);
  const isAddEventType = type === "AddEvent";
  const [allDay, setAllDay] = useState<boolean>(isAddEventType ? false : props.allDay);
  const [startTime, setStartTime] = useState<string>(isAddEventType ? "" : props.startTime);
  const [endTime, setEndTime] = useState<string>(isAddEventType ? "" : props.endTime);
  const formNameRef = useRef<string>(isAddEventType ? "" : props.name);
  const formColorRef = useRef<string>(isAddEventType ? "" : props.color);
  const modalName = isAddEventType ? "Add Event" : "Edit Event";
  const buttonName = isAddEventType ? "Add" : "Save";
  const handleSetAllDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllDay(e.target.checked);
    setStartTime("");
    setEndTime("");
  };
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formColorRef.current = e.target.value;
  };
  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (formColorRef.current === "") formColorRef.current = "blue";
    if (isAddEventType) {
      const event = { name: formNameRef.current, color: formColorRef.current, date, month, year, allDay, startTime, endTime, id: crypto.randomUUID() };
      setStateContext((previousState) => [...previousState, event]);
    }
    if (!isAddEventType) {
      setStateContext((previousState) => {
        return previousState.map((event) => {
          if (event.id === props.id) {
            return { name: formNameRef.current, color: formColorRef.current, date, month, year, allDay, startTime, endTime, id: props.id };
          }
          return event;
        });
      });
    }
    handleCloseAddEventModal();
  };
  const handleCloseAddEventModal = () => {
    setShowModal(false);
    setAllDay(false);
    setStartTime("");
    setEndTime("");
  };
  const handleDeleteEvent = () => {
    if (isAddEventType) return;
    setStateContext((previousState) => previousState.filter((event) => event.id !== props.id));
    handleCloseAddEventModal();
  };
  return (
    <PortalComponent>
      <div className="modal">
        <div className="overlay" onClick={handleCloseAddEventModal}></div>
        <div className="modal-body">
          <div className="modal-title">
            <div>{modalName}</div>
            <small>{`${month}/${date}/${year}`}</small>
            <button className="close-btn" onClick={handleCloseAddEventModal}>
              &times;
            </button>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e) => (formNameRef.current = e.target.value.trim())}
                defaultValue={formNameRef.current}
                required
              />
            </div>
            <div className="form-group checkbox">
              <input type="checkbox" name="all-day" id="all-day" onChange={handleSetAllDay} defaultChecked={allDay} />
              <label htmlFor="all-day">All Day?</label>
            </div>
            <div className="row">
              <div className="form-group">
                <label htmlFor="start-time">Start Time</label>
                <input
                  type="time"
                  name="start-time"
                  id="start-time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  disabled={allDay}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="end-time">End Time</label>
                <input
                  type="time"
                  name="end-time"
                  id="end-time"
                  min={startTime}
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  disabled={allDay}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Color</label>
              <div className="row left">
                <input
                  type="radio"
                  name="color"
                  value="blue"
                  id="blue"
                  defaultChecked={isAddEventType ? true : formColorRef.current === "blue"}
                  onChange={handleColorChange}
                  className="color-radio"
                />
                <label htmlFor="blue">
                  <span className="sr-only">Blue</span>
                </label>
                <input
                  type="radio"
                  name="color"
                  value="red"
                  id="red"
                  defaultChecked={formColorRef.current === "red"}
                  onChange={handleColorChange}
                  className="color-radio"
                />
                <label htmlFor="red">
                  <span className="sr-only">Red</span>
                </label>
                <input
                  type="radio"
                  name="color"
                  value="green"
                  id="green"
                  defaultChecked={formColorRef.current === "green"}
                  onChange={handleColorChange}
                  className="color-radio"
                />
                <label htmlFor="green">
                  <span className="sr-only">Green</span>
                </label>
              </div>
            </div>
            <div className="row">
              <button className="btn btn-success" type="submit">
                {buttonName}
              </button>
              {!isAddEventType && (
                <button className="btn btn-delete" type="button" onClick={handleDeleteEvent}>
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </PortalComponent>
  );
};

export default Modal;
