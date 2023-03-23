import { DateType } from "@types";
import dayjs from "dayjs";
export const toYYMMDD_DOT = (date: DateType) => {
  return dayjs(date).format("YY.MM.DD.");
};

export const isSameDateTime = (date1: DateType, date2: DateType) => {
  return dayjs(date1).isSame(date2);
};
