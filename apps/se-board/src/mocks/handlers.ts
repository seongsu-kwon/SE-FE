import { bannerHandlers } from "./bannerHandlers";
import { generalPolicyHandlers } from "./generalPolicyHandlers";
import { putLoginLimitTimeHandler } from "./loginHandlers";
import { loginPolicyHandlers } from "./loginPolicyHandlers";

export const handlers = [
  ...putLoginLimitTimeHandler,
  ...loginPolicyHandlers,
  ...bannerHandlers,
  ...generalPolicyHandlers,
];
