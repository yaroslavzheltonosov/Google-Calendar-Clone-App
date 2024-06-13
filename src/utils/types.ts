export type CalendarDay = {
  date: number;
  month: number;
  year: number;
  nonMonthDay: boolean;
  oldMonthDay: boolean;
  dayOfWeek?: string;
  events?: CalendarEvent[];
  readonly id: string;
};

export type CalendarEvent = {
  name: string;
  color: string;
  allDay: boolean;
  startTime: string;
  endTime: string;
} & Pick<CalendarDay, "date" | "month" | "year" | "id">;
