import { AdminMenu } from "./menu";
import { AdminMenuRoll, MenuSettingRole } from "./role";

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

  interface AdminMenuInfo {
    menu: AdminMenu;
    option: AdminMenuRoll;
  }

  interface AdminMenuMenuAndRole {
    menu: AdminMenuInfo[];
    person: AdminMenuInfo[];
    content: AdminMenuInfo[];
    setting: AdminMenuInfo[];
  }

  interface AdminMenuSettingData {
    id: number;
    option: {
      option: string;
      roles: number[];
    };
  }

  interface AdminMenuDashBoard {
    [key: string]: AdminMenu[];
    menu: AdminMenu[];
    person: AdminMenu[];
    contents: AdminMenu[];
    setting: AdminMenu[];
  }
}
