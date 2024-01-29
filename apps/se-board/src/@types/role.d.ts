declare module "@types" {
  interface Role {
    roleId: number;
    name: string;
    description: string;
    alias: string;
  }

  interface AdminMenuRoll {
    option: string;
    roles: string[];
  }
  interface MenuSettingRole {
    name: string;
    option: string;
    roles: string[];
  }

  interface PutRoleData {
    option: string;
    roles: SelectRoleList[];
  }
  interface SelectRoleList {
    roleName: string;
    roleId: number;
  }
}
