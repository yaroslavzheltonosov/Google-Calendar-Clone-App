import { createContext, useState } from "react";
import Calendar from "./components/Calendar";

import { CalendarEvent } from "./utils/types";

type stateContext = {
  stateContext: Array<CalendarEvent>;
  setStateContext: React.Dispatch<React.SetStateAction<Array<CalendarEvent>>>;
};

export const CalendarContext = createContext<stateContext>({
  stateContext: [],
  setStateContext: () => {},
});

const handleLoadPersistedContext = () => {
  const context = localStorage.getItem("CalendarContext");
  if (context) return JSON.parse(context);
  return [];
};

const GoogleCloneApp = () => {
  const [stateContext, setStateContext] = useState(handleLoadPersistedContext);
  return (
    <CalendarContext.Provider value={{ stateContext, setStateContext }}>
      <Calendar />
    </CalendarContext.Provider>
  );
};

export default GoogleCloneApp;
