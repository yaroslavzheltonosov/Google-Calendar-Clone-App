import { DAYS_OF_WEEK } from "../utils/consts";
import { CalendarDay } from "../utils/types";

const useCalendarDates = (year: number, month: number): CalendarDay[] => {
  if (month > 12) {
    year++;
    month = 1;
  }
  if (month < 1) {
    year--;
    month = 12;
  }
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 is Sunday, 1 is Monday, and etc.

  const dates: CalendarDay[] = [];

  // Calculate how many days from the previous month should be shown
  const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek;

  // Get the last day of the current month
  const lastDayOfMonth = new Date(year, month, 0).getDate();

  // Get the last day of the previous month
  const lastDayOfPrevMonth = new Date(year, month - 1, 0).getDate();

  // Populate dates from the previous month
  for (let i = daysFromPrevMonth; i > 0; i--) {
    dates.push({ date: lastDayOfPrevMonth - i + 1, month: month - 1, year, nonMonthDay: true, oldMonthDay: true, id: crypto.randomUUID() });
  }

  // Populate dates from the current month
  for (let i = 1; i <= lastDayOfMonth; i++) {
    dates.push({ date: i, month, year, nonMonthDay: false, oldMonthDay: false, id: crypto.randomUUID() });
  }

  // Add dayOfWeek value to the first 7 dates
  for (let i = 0; i <= 6; i++) {
    dates[i].dayOfWeek = DAYS_OF_WEEK[i];
  }

  // Populate dates from the next month to fill the grid
  const totalDays = dates.length;
  const remainingCells = 42 - totalDays; // 42 is the total number of cells in a 6x7 grid
  for (let i = 1; i <= remainingCells; i++) {
    dates.push({ date: i, month: month + 1, year, nonMonthDay: true, oldMonthDay: false, id: crypto.randomUUID() });
  }

  return dates;
};

export default useCalendarDates;
