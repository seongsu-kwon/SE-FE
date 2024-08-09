import { putLoginLimitTimeHandler } from "./loginHandlers";
import { mainpageHandlers } from "./mainpageHandlers";
import { menuHandlers } from "./menuHandlers";
import { mypageHandlers } from "./mypageHandlers";

export const handlers = [
  ...putLoginLimitTimeHandler,
  ...mainpageHandlers,
  ...menuHandlers,
  ...mypageHandlers,
];
