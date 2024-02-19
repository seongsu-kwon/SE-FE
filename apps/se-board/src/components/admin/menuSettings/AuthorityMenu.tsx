import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { MenuRoleInfo, Role } from "@types";
import { useEffect, useState } from "react";
import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { useRecoilState } from "recoil";

import { useGetRoleInfos } from "@/react-query/hooks";
import { adminMenuRollSettingState } from "@/store/menu";

const defaultRoleList = [
  { value: "all", label: "모든 사용자" },
  { value: "overUser", label: "준회원이상" },
  { value: "overKumoh", label: "정회원이상" },
  { value: "onlyAdmin", label: "관리자만" },
  { value: "select", label: "선택 사용자" },
];

interface AuthorityMenuProps {
  roleType: "access" | "write" | "manage" | "expose";
  setRoles: React.Dispatch<React.SetStateAction<MenuRoleInfo>>;
  defaultOption?: string;
  defaultRoles?: string[];
  disabledList?: string[];
}

export const AuthorityMenu = ({
  roleType,
  setRoles,
  defaultOption,
  defaultRoles,
  disabledList,
}: AuthorityMenuProps) => {
  const { data } = useGetRoleInfos();

  const [selectedOption, setSelectedOption] = useState<string | string[]>(
    defaultOption || ""
  );
  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    defaultRoles || []
  );

  const adminRollId: Role | undefined = data?.find(
    (role) => role.name === "ROLE_ADMIN"
  );

  useEffect(() => {
    if (!data || !defaultOption || !defaultRoles) return;

    if (defaultOption === "select") {
      setRoles((prev) => ({
        ...prev,
        [roleType]: {
          ...prev[roleType],
          option: defaultOption,
          roles:
            data
              .filter((role) => defaultRoles?.includes(role.name))
              .map((role) => role.roleId) || [],
        },
      }));
      setSelectedOption(defaultOption);
      setSelectedRoles(
        data
          .filter((role) => defaultRoles?.includes(role.name))
          .map((role) => role.alias)
      );
    } else {
      setRoles((prev) => ({
        ...prev,
        [roleType]: {
          ...prev[roleType],
          option: defaultOption,
          roles: [],
        },
      }));
      setSelectedOption(defaultOption);
      setSelectedRoles([]);
    }
  }, [data, defaultOption, defaultRoles]);

  const onChange = (value: string | string[]) => {
    setSelectedOption(value);

    if (value !== "select") {
      setRoles((prev) => ({
        ...prev,
        [roleType]: {
          option: value as string,
          roles: [],
        },
      }));
      setSelectedRoles([]);
    } else if (value === "select" && defaultRoles && adminRollId) {
      const temp =
        data?.filter(
          (role) =>
            defaultRoles.includes(role.name) || role.name === adminRollId.name
        ) || [];

      setRoles((prev) => ({
        ...prev,
        [roleType]: {
          option: value as string,
          roles: temp?.map((role) => role.roleId) || [],
        },
      }));
      setSelectedRoles(temp.map((role) => role.alias));
    }
  };

  const onCheckBoxChange = (value: string | string[]) => {
    const selectedRoleAliases = [...(value as string[])];

    if (adminRollId && !selectedRoleAliases.includes("관리자"))
      selectedRoleAliases.push(adminRollId.alias);

    setSelectedRoles(selectedRoleAliases);

    setRoles((prev) => ({
      ...prev,
      [roleType]: {
        ...prev[roleType],
        option: "select",
        roles:
          data
            ?.filter((role) => selectedRoleAliases.includes(role.alias))
            .map((role) => role.roleId) || [],
      },
    }));
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {defaultRoleList.find((v) => v.value === selectedOption)?.label ||
          "권한 선택"}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          title="단일 선택"
          type="radio"
          value={selectedOption}
          defaultValue={defaultOption}
          onChange={onChange}
        >
          {defaultRoleList.map((role, i) => (
            <MenuItemOption
              key={i}
              value={role.value}
              isDisabled={disabledList?.includes(role.value)}
              isChecked={selectedOption === role.value}
              h="28px"
              borderTop="1px solid"
              borderColor="gray.2"
              _hover={{ bg: "blue.1" }}
            >
              {role.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup
          title="선택 사용자"
          type="checkbox"
          onChange={onCheckBoxChange}
          value={selectedRoles}
        >
          {data?.map((role) => (
            <MenuItemOption
              isChecked={selectedRoles.includes(role.alias)}
              key={role.roleId}
              value={role.alias}
              h="28px"
              borderTop="1px solid"
              borderColor="gray.2"
              _hover={{ bg: "blue.1" }}
              isDisabled={
                selectedOption !== "select" || role.name === "ROLE_ADMIN"
              }
            >
              {role.alias}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

interface AdminAuthorityMenuProps {
  menuID: number;
  defaultOption: string;
  defaultRoles: string[];
}

export const AdminAuthorityMenu = ({
  menuID,
  defaultOption,
  defaultRoles,
}: AdminAuthorityMenuProps) => {
  const { data } = useGetRoleInfos();

  const [selectedOption, setSelectedOption] = useState<string | string[]>(
    defaultOption || ""
  );
  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    defaultRoles || []
  );

  const [adminMenuRoleSettingData, setAdminMenuRoleSettingData] =
    useRecoilState(adminMenuRollSettingState);

  const adminRoll: Role | undefined = data?.find(
    (role) => role.name === "ROLE_ADMIN"
  );

  useEffect(() => {
    if (!data) return;

    if (defaultOption === "select") {
      const temp = adminMenuRoleSettingData.map((menu) => {
        if (menu.id === menuID) {
          return {
            id: menuID,
            option: {
              option: defaultOption,
              roles:
                data
                  .filter((role) => defaultRoles.includes(role.alias))
                  .map((role) => role.roleId) || [],
            },
          };
        }

        return menu;
      });

      setAdminMenuRoleSettingData(temp);

      setSelectedRoles(
        data
          .filter((role) => defaultRoles.includes(role.alias))
          .map((role) => role.alias)
      );
    } else {
      setSelectedRoles([]);
    }

    setSelectedOption(defaultOption);
  }, [data]);

  function onChange(value: string | string[]) {
    setSelectedOption(value);

    if (value !== "select") {
      setAdminMenuRoleSettingData((prev) =>
        prev.map((menu) => {
          if (menu.id === menuID) {
            return {
              id: menuID,
              option: {
                option: value as string,
                roles: [],
              },
            };
          }

          return menu;
        })
      );
      setSelectedRoles([]);
    } else if (value === "select" && adminRoll) {
      const temp =
        data?.filter(
          (role) =>
            defaultRoles.includes(role.alias) || role.name === adminRoll.name
        ) || [];

      setAdminMenuRoleSettingData((prev) =>
        prev.map((menu) => {
          if (menu.id === menuID) {
            return {
              id: menuID,
              option: {
                option: value as string,
                roles: temp.map((role) => role.roleId),
              },
            };
          }

          return menu;
        })
      );

      setSelectedRoles(temp.map((role) => role.alias));
    }
  }

  function onCheckBoxChange(value: string | string[]) {
    const selectedRoleTemp = [...(value as string[])];

    if (adminRoll && !selectedRoleTemp.includes("관리자"))
      selectedRoleTemp.push(adminRoll.alias);

    setSelectedRoles(selectedRoleTemp);

    setAdminMenuRoleSettingData((prev) =>
      prev.map((menu) => {
        if (menu.id === menuID) {
          return {
            id: menuID,
            option: {
              option: "select",
              roles:
                data
                  ?.filter((role) => selectedRoleTemp.includes(role.alias))
                  .map((role) => role.roleId) || [],
            },
          };
        }

        return menu;
      })
    );
  }

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {defaultRoleList.find((v) => v.value === selectedOption)?.label ||
          "권한 선택"}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          title="단일 선택"
          type="radio"
          value={selectedOption}
          defaultValue={defaultOption}
          onChange={onChange}
        >
          {defaultRoleList.map((role, i) => (
            <MenuItemOption
              key={i}
              value={role.value}
              isChecked={selectedOption === role.value}
              h="28px"
              borderTop="1px solid"
              borderColor="gray.2"
              _hover={{ bg: "blue.1" }}
            >
              {role.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup
          title="선택 사용자"
          type="checkbox"
          onChange={onCheckBoxChange}
          value={selectedRoles}
        >
          {data?.map((role) => (
            <MenuItemOption
              isChecked={selectedRoles.includes(role.alias)}
              key={role.roleId}
              value={role.alias}
              h="28px"
              borderTop="1px solid"
              borderColor="gray.2"
              _hover={{ bg: "blue.1" }}
              isDisabled={
                selectedOption !== "select" || role.name === "ROLE_ADMIN"
              }
            >
              {role.alias}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
