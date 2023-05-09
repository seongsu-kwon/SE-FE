import { DateType } from "@types";
import dayjs from "dayjs";

export const toYYMMDD_DOT = (date: DateType) => {
  return dayjs(date).format("YY.MM.DD");
};

export const isSameDateTime = (date1: DateType, date2: DateType) => {
  return dayjs(date1).isSame(date2);
};

export const toYYYYMMDDHHhhss = (date: DateType = "1970-01-01 12:00:00") => {
  return dayjs(date).format("YYYY.MM.DD HH:mm:ss");
};

export const toYYYYMMDDHHhh = (date: DateType = "1970-01-01 12:00:00") => {
  return dayjs(date).format("YYYY.MM.DD HH:mm");
};
