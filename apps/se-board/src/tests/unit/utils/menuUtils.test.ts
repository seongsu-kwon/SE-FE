import {
  isCheckedMenuCount,
  getBoardMenuList,
  getAdminMenuArray,
  adminMenuRoleSetting,
  getAllMenuList,
  getPossibleSubMenus
} from "@/utils/menuUtils";
import { 
  MainPageMenu, 
  MenuInfomation, 
  AdminMenuMenuAndRole, 
} from "@types";

describe('Menu Utility Functions', () => {
  describe('isCheckedMenuCount', () => {
    it('should return the count of checked menus', () => {
      const menuList: (MainPageMenu & { isChecked: boolean })[] = [
        { categoryId: 1, name: 'Menu1', url: '/menu1', isChecked: true },
        { categoryId: 2, name: 'Menu2', url: '/menu2', isChecked: false },
        { categoryId: 3, name: 'Menu3', url: '/menu3', isChecked: true },
      ];

      expect(isCheckedMenuCount(menuList)).toBe(2);
    });

    it('should return 0 if no menus are checked', () => {
      const menuList: (MainPageMenu & { isChecked: boolean })[] = [
        { categoryId: 1, name: 'Menu1', url: '/menu1', isChecked: false },
        { categoryId: 2, name: 'Menu2', url: '/menu2', isChecked: false },
      ];

      expect(isCheckedMenuCount(menuList)).toBe(0);
    });

    it('should return 0 if the list is empty', () => {
      const menuList: (MainPageMenu & { isChecked: boolean })[] = [];

      expect(isCheckedMenuCount(menuList)).toBe(0);
    });
  });

  describe('getBoardMenuList', () => {
    it('should return only BOARD type menus', () => {
      const menuList: MenuInfomation[] = [
        { menuId: 1, name: 'Board Menu 1', urlId: 'board1', type: 'BOARD', access: { name: 'Access Role', option: 'ROLE_USER', roles: ['USER'] }, write: { name: 'Write Role', option: 'ROLE_USER', roles: ['USER'] }, manage: { name: 'Manage Role', option: 'ROLE_ADMIN', roles: ['ADMIN'] }, expose: { name: 'Expose Role', option: 'PUBLIC', roles: [] }, subMenus: [] },
        { menuId: 2, name: 'Category Menu 1', urlId: 'category1', type: 'CATEGORY', access: { name: 'Access Role', option: 'ROLE_USER', roles: ['USER'] }, write: { name: 'Write Role', option: 'ROLE_USER', roles: ['USER'] }, manage: { name: 'Manage Role', option: 'ROLE_ADMIN', roles: ['ADMIN'] }, expose: { name: 'Expose Role', option: 'PUBLIC', roles: [] }, subMenus: [
          { menuId: 3, name: 'Board Menu 2', urlId: 'board2', type: 'BOARD', access: { name: 'Access Role', option: 'ROLE_USER', roles: ['USER'] }, write: { name: 'Write Role', option: 'ROLE_USER', roles: ['USER'] }, manage: { name: 'Manage Role', option: 'ROLE_ADMIN', roles: ['ADMIN'] }, expose: { name: 'Expose Role', option: 'PUBLIC', roles: [] }, subMenus: [] }
        ] },
        { menuId: 4, name: 'Other Menu', urlId: 'other', type: 'EXTERNAL', access: { name: 'Access Role', option: 'ROLE_USER', roles: ['USER'] }, write: { name: 'Write Role', option: 'ROLE_USER', roles: ['USER'] }, manage: { name: 'Manage Role', option: 'ROLE_ADMIN', roles: ['ADMIN'] }, expose: { name: 'Expose Role', option: 'PUBLIC', roles: [] }, subMenus: [] }
      ];

      const result = getBoardMenuList(menuList);
      expect(result).toEqual([
        { menuId: 1, name: 'Board Menu 1', urlId: 'board1', type: 'BOARD', access: { name: 'Access Role', option: 'ROLE_USER', roles: ['USER'] }, write: { name: 'Write Role', option: 'ROLE_USER', roles: ['USER'] }, manage: { name: 'Manage Role', option: 'ROLE_ADMIN', roles: ['ADMIN'] }, expose: { name: 'Expose Role', option: 'PUBLIC', roles: [] }, subMenus: [] },
        { menuId: 3, name: 'Board Menu 2', urlId: 'board2', type: 'BOARD', access: { name: 'Access Role', option: 'ROLE_USER', roles: ['USER'] }, write: { name: 'Write Role', option: 'ROLE_USER', roles: ['USER'] }, manage: { name: 'Manage Role', option: 'ROLE_ADMIN', roles: ['ADMIN'] }, expose: { name: 'Expose Role', option: 'PUBLIC', roles: [] }, subMenus: [] }
      ]);
    });

    it('should return an empty list if there are no BOARD type menus', () => {
      const menuList: MenuInfomation[] = [
        { menuId: 1, name: 'Category Menu 1', urlId: 'category1', type: 'CATEGORY', access: { name: 'Access Role', option: 'ROLE_USER', roles: ['USER'] }, write: { name: 'Write Role', option: 'ROLE_USER', roles: ['USER'] }, manage: { name: 'Manage Role', option: 'ROLE_ADMIN', roles: ['ADMIN'] }, expose: { name: 'Expose Role', option: 'PUBLIC', roles: [] }, subMenus: [] },
        { menuId: 2, name: 'Other Menu', urlId: 'other', type: 'EXTERNAL', access: { name: 'Access Role', option: 'ROLE_USER', roles: ['USER'] }, write: { name: 'Write Role', option: 'ROLE_USER', roles: ['USER'] }, manage: { name: 'Manage Role', option: 'ROLE_ADMIN', roles: ['ADMIN'] }, expose: { name: 'Expose Role', option: 'PUBLIC', roles: [] }, subMenus: [] }
      ];

      expect(getBoardMenuList(menuList)).toEqual([]);
    });
  });

  describe('getAdminMenuArray', () => {
    it('should return an array with headings and lists of menus', () => {
      const data: AdminMenuMenuAndRole = {
        menu: [
          {
            menu: { id: 1, name: 'Menu Management', url: 'menuManagement' },
            option: { option: 'manage', roles: ['ADMIN'] }
          }
        ],
        person: [
          {
            menu: { id: 2, name: 'Member Management', url: 'memberManagement' },
            option: { option: 'manage', roles: ['ADMIN'] }
          }
        ],
        content: [
          {
            menu: { id: 3, name: 'Content Management', url: 'contentManagement' },
            option: { option: 'manage', roles: ['ADMIN'] }
          }
        ],
        setting: [
          {
            menu: { id: 4, name: 'Settings', url: 'settings' },
            option: { option: 'manage', roles: ['ADMIN'] }
          }
        ]
      };
      

      const result = getAdminMenuArray(data);
      expect(result).toEqual([
        { heading: '메뉴 관리', list: [{
          menu: { id: 1, name: 'Menu Management', url: 'menuManagement' },
          option: { option: 'manage', roles: ['ADMIN'] }
        }]},
        { heading: '회원 관리', list : [{
          menu: { id: 2, name: 'Member Management', url: 'memberManagement' },
          option: { option: 'manage', roles: ['ADMIN'] }
        }]},
        { heading: '컨텐츠 관리', list: [{
            menu: { id: 3, name: 'Content Management', url: 'contentManagement' },
            option: { option: 'manage', roles: ['ADMIN'] }
        }]},
        { heading: '설정', list: [
          {
            menu: { id: 4, name: 'Settings', url: 'settings' },
            option: { option: 'manage', roles: ['ADMIN'] }
          }]}
      ]);
    });

    it('should return an empty array if data is undefined', () => {
      expect(getAdminMenuArray(undefined)).toEqual([]);
    });
  });

  describe('adminMenuRoleSetting', () => {
    it('should return an array with menu ids and options', () => {
      const data: AdminMenuMenuAndRole = {
        menu: [
          {
            menu: { id: 1, name: 'Menu 1', url: 'menu1' },
            option: { option: 'manage', roles: ['ADMIN'] }
          }
        ],
        person: [],
        content: [],
        setting: []
      };
      

      const result = adminMenuRoleSetting(data);
      expect(result).toEqual([
        { id: 1, option: { option: 'manage', roles: [] } }
      ]);
    });
  });

  describe('getAllMenuList', () => {
    it('should return all menus including submenus', () => {
      const menuList: MenuInfomation[] = [
        { menuId: 1, name: 'Menu 1', urlId: 'menu1', type: 'MENU', access: { name: 'Access Role', option: 'ROLE_USER', roles: ['USER'] }, write: { name: 'Write Role', option: 'ROLE_USER', roles: ['USER'] }, manage: { name: 'Manage Role', option: 'ROLE_ADMIN', roles: ['ADMIN'] }, expose: { name: 'Expose Role', option: 'PUBLIC', roles: [] }, subMenus: [
          { menuId: 2, name: 'Sub Menu 1', urlId: 'subMenu1', type: 'CATEGORY', access: { name: 'Access Role', option: 'ROLE_USER', roles: ['USER'] }, write: { name: 'Write Role', option: 'ROLE_USER', roles: ['USER'] }, manage: { name: 'Manage Role', option: 'ROLE_ADMIN', roles: ['ADMIN'] }, expose: { name: 'Expose Role', option: 'PUBLIC', roles: [] }, subMenus: [] }
        ] },
        { menuId: 3, name: 'Other Menu', urlId: 'other', type: 'EXTERNAL', access: { name: 'Access Role', option: 'ROLE_USER', roles: ['USER'] }, write: { name: 'Write Role', option: 'ROLE_USER', roles: ['USER'] }, manage: { name: 'Manage Role', option: 'ROLE_ADMIN', roles: ['ADMIN'] }, expose: { name: 'Expose Role', option: 'PUBLIC', roles: [] }, subMenus: [] }
      ];

      const result = getAllMenuList(menuList);
      expect(result).toEqual([
        { menuId: 1, name: 'Menu 1', urlId: 'menu1', type: 'MENU', access: { name: 'Access Role', option: 'ROLE_USER', roles: ['USER'] }, write: { name: 'Write Role', option: 'ROLE_USER', roles: ['USER'] }, manage: { name: 'Manage Role', option: 'ROLE_ADMIN', roles: ['ADMIN'] }, expose: { name: 'Expose Role', option: 'PUBLIC', roles: [] }, subMenus: [
          { menuId: 2, name: 'Sub Menu 1', urlId: 'subMenu1', type: 'CATEGORY', access: { name: 'Access Role', option: 'ROLE_USER', roles: ['USER'] }, write: { name: 'Write Role', option: 'ROLE_USER', roles: ['USER'] }, manage: { name: 'Manage Role', option: 'ROLE_ADMIN', roles: ['ADMIN'] }, expose: { name: 'Expose Role', option: 'PUBLIC', roles: [] }, subMenus: [] }
        ] },
        { menuId: 2, name: 'Sub Menu 1', urlId: 'subMenu1', type: 'CATEGORY', access: { name: 'Access Role', option: 'ROLE_USER', roles: ['USER'] }, write: { name: 'Write Role', option: 'ROLE_USER', roles: ['USER'] }, manage: { name: 'Manage Role', option: 'ROLE_ADMIN', roles: ['ADMIN'] }, expose: { name: 'Expose Role', option: 'PUBLIC', roles: [] }, subMenus: [] },
        { menuId: 3, name: 'Other Menu', urlId: 'other', type: 'EXTERNAL', access: { name: 'Access Role', option: 'ROLE_USER', roles: ['USER'] }, write: { name: 'Write Role', option: 'ROLE_USER', roles: ['USER'] }, manage: { name: 'Manage Role', option: 'ROLE_ADMIN', roles: ['ADMIN'] }, expose: { name: 'Expose Role', option: 'PUBLIC', roles: [] }, subMenus: [] }
      ]);
    });

    it('should return an empty list if the input list is undefined', () => {
      expect(getAllMenuList(undefined)).toEqual([]);
    });
  });

  describe('getPossibleSubMenus', () => {
    it('should return menus that are not of type MENU', () => {
      const menuList: MenuInfomation[] = [
        { menuId: 1, name: 'Menu 1', urlId: 'menu1', type: 'MENU', access: { name: 'Access Role', option: 'ROLE_USER', roles: ['USER'] }, write: { name: 'Write Role', option: 'ROLE_USER', roles: ['USER'] }, manage: { name: 'Manage Role', option: 'ROLE_ADMIN', roles: ['ADMIN'] }, expose: { name: 'Expose Role', option: 'PUBLIC', roles: [] }, subMenus: [] },
        { menuId: 2, name: 'Category Menu 1', urlId: 'category1', type: 'CATEGORY', access: { name: 'Access Role', option: 'ROLE_USER', roles: ['USER'] }, write: { name: 'Write Role', option: 'ROLE_USER', roles: ['USER'] }, manage: { name: 'Manage Role', option: 'ROLE_ADMIN', roles: ['ADMIN'] }, expose: { name: 'Expose Role', option: 'PUBLIC', roles: [] }, subMenus: [] },
        { menuId: 3, name: 'Other Menu', urlId: 'other', type: 'EXTERNAL', access: { name: 'Access Role', option: 'ROLE_USER', roles: ['USER'] }, write: { name: 'Write Role', option: 'ROLE_USER', roles: ['USER'] }, manage: { name: 'Manage Role', option: 'ROLE_ADMIN', roles: ['ADMIN'] }, expose: { name: 'Expose Role', option: 'PUBLIC', roles: [] }, subMenus: [] }
      ];

      const result = getPossibleSubMenus(menuList);
      expect(result).toEqual([
        { menuId: 2, name: 'Category Menu 1', urlId: 'category1', type: 'CATEGORY', access: { name: 'Access Role', option: 'ROLE_USER', roles: ['USER'] }, write: { name: 'Write Role', option: 'ROLE_USER', roles: ['USER'] }, manage: { name: 'Manage Role', option: 'ROLE_ADMIN', roles: ['ADMIN'] }, expose: { name: 'Expose Role', option: 'PUBLIC', roles: [] }, subMenus: [] },
        { menuId: 3, name: 'Other Menu', urlId: 'other', type: 'EXTERNAL', access: { name: 'Access Role', option: 'ROLE_USER', roles: ['USER'] }, write: { name: 'Write Role', option: 'ROLE_USER', roles: ['USER'] }, manage: { name: 'Manage Role', option: 'ROLE_ADMIN', roles: ['ADMIN'] }, expose: { name: 'Expose Role', option: 'PUBLIC', roles: [] }, subMenus: [] }
      ]);
    });

    it('should return an empty list if all menus are of type MENU', () => {
      const menuList: MenuInfomation[] = [
        { menuId: 1, name: 'Menu 1', urlId: 'menu1', type: 'MENU', access: { name: 'Access Role', option: 'ROLE_USER', roles: ['USER'] }, write: { name: 'Write Role', option: 'ROLE_USER', roles: ['USER'] }, manage: { name: 'Manage Role', option: 'ROLE_ADMIN', roles: ['ADMIN'] }, expose: { name: 'Expose Role', option: 'PUBLIC', roles: [] }, subMenus: [] }
      ];

      expect(getPossibleSubMenus(menuList)).toEqual([]);
    });
  });
});
