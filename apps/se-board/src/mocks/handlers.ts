import { putLoginLimitTimeHandler } from "./loginHandlers";
import { memberManageHandlers } from "./memberManageHandlers";

export const handlers = [...putLoginLimitTimeHandler, ...memberManageHandlers];
