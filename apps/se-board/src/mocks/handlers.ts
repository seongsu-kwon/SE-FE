import { accountHandlers } from "./accountHandlers";
import { adminHandlers } from "./adminHandlers";
import { authHandlers } from "./authHandlers";
import { bannerHandlers } from "./bannerHandlers";
import { generalPolicyHandlers } from "./generalPolicyHandlers";
import { putLoginLimitTimeHandler } from "./loginHandlers";
import { loginPolicyHandlers } from "./loginPolicyHandlers";
import { mainpageHandlers } from "./mainpageHandlers";
import { memberManageHandlers } from "./memberManageHandlers";
import { menuHandlers } from "./menuHandlers";
import { mypageHandlers } from "./mypageHandlers";
import { passwordChangeWithoutLoginHandlers } from "./passwordChangeWithoutLoginHandlers";
import { postManageHandlers } from "./postManageHandlers";
import { profileHandlers } from "./profileHandlers";
import { reportHandlers } from "./reportHandlers";
import { roleHandlers } from "./roleHandlers";
import { signUpPolicyHandlers } from "./signUpPolicyHandlers";

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
  ...mainpageHandlers,
  ...menuHandlers,
  ...mypageHandlers,
  ...passwordChangeWithoutLoginHandlers,
  ...profileHandlers,
  ...reportHandlers,
  ...roleHandlers,
  ...signUpPolicyHandlers,
];
