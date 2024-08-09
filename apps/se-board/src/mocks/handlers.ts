import { menuHandlers } from "@/mocks/menuHandlers";

import { putLoginLimitTimeHandler } from "./loginHandlers";
import { mainpageHandlers } from "./mainpageHandlers";

export const handlers = [
  ...putLoginLimitTimeHandler,
  ...mainpageHandlers,
  ...menuHandlers,
];
