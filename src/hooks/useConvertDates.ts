export const useConvertDates = (timeStamp: string) => {
  if (timeStamp === "") return "";
  const [hours, minutes] = timeStamp.split(":");
  const date = new Date();
  date.setHours(+hours);
  date.setMinutes(+minutes);
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
};
