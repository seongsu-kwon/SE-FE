import { accountHandlers } from "./accountHandlers";
import { adminHandlers } from "./adminHandlers";
import { authHandlers } from "./authHandlers";
import { bannerHandlers } from "./bannerHandlers";
import { generalPolicyHandlers } from "./generalPolicyHandlers";
import { putLoginLimitTimeHandler } from "./loginHandlers";
import { loginPolicyHandlers } from "./loginPolicyHandlers";
import { memberManageHandlers } from "./memberManageHandlers";
import { postManageHandlers } from "./postManageHandlers";

export const handlers = [
  ...putLoginLimitTimeHandler,
  ...loginPolicyHandlers,
  ...bannerHandlers,
  ...generalPolicyHandlers,
  ...putLoginLimitTimeHandler,
  ...memberManageHandlers,
  ...postManageHandlers,
  ...accountHandlers,
  ...adminHandlers,
  ...authHandlers,
];
