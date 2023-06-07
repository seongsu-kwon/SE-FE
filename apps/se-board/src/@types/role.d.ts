declare module "@types" {
  interface RoleList {
    total: number;
    nowPage: number;
    perPage: number;
    roles: Role[];
  }

  interface Role {
    roleId: number;
    name: string;
    description: string;
    alias: string;
  }

  interface MenuSettingRole {
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
