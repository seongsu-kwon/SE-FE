import { putLoginLimitTimeHandler } from "./loginHandlers";
import {
  getLoginPolicyHandler,
  putLoginPolicyHandler,
} from "./loginPolicyHandlers";

export const handlers = [
  ...putLoginLimitTimeHandler,
  ...getLoginPolicyHandler,
  ...putLoginPolicyHandler,
];
