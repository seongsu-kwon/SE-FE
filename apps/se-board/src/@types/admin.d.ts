import { MenuSettingRole } from "./role";

declare module "@types" {
  interface AdminSettingRole {
    menuSetting: {
      menuEdit: MenuSettingRole;
    };
    accountManage: {
      accountList: MenuSettingRole;
      accountPolicy: MenuSettingRole;
      roles: MenuSettingRole;
    };
    contentManage: {
      post: MenuSettingRole;
      comment: MenuSettingRole;
      file: MenuSettingRole;
      trash: MenuSettingRole;
    };
    generalSetting: {
      general: MenuSettingRole;
      mainPage: MenuSettingRole;
    };
  }
}
