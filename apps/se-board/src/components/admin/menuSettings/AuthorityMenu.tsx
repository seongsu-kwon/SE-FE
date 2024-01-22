import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { MenuRoleInfo, MenuSettingRole } from "@types";
import { useEffect, useState } from "react";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

import { useGetRoleInfos } from "@/react-query/hooks";

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

  useEffect(() => {
    if (!defaultOption) return;

    setSelectedOption(defaultOption);

    setRoles((prev) => ({
      ...prev,
      [roleType]: {
        option: defaultOption,
        roles: defaultOption === "select" ? defaultRoles : [],
      },
    }));

    if (!defaultRoles) return;

    setSelectedRoles(defaultRoles);

    setRoles((prev) => ({
      ...prev,
      [roleType]: {
        option: defaultOption,
        roles: defaultOption === "select" ? defaultRoles : [],
      },
    }));
  }, [defaultOption, defaultRoles]);

  useEffect(() => {
    if (!data) return;

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

      setSelectedRoles(
        data
          .filter((role) => defaultRoles?.includes(role.name))
          .map((role) => role.alias)
      );
    }
  }, [data]);

  const onChange = (value: string | string[]) => {
    setSelectedOption(value);

    setRoles((prev) => ({
      ...prev,
      [roleType]: {
        option: value as string,
        roles: value === "select" ? selectedRoles : [],
      },
    }));

    if (value !== "select") setSelectedRoles([]);
  };

  const onCheckBoxChange = (value: string | string[]) => {
    setSelectedRoles(value as string[]);

    setRoles((prev) => ({
      ...prev,
      [roleType]: {
        ...prev[roleType],
        option: "select",
        roles: data
          ?.filter((role) => value.includes(role.alias))
          .map((role) => role.roleId),
      },
    }));
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        권한 선택
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
              isDisabled={selectedOption !== "select"}
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
  index: number;
  setMenuInfo: React.Dispatch<React.SetStateAction<MenuSettingRole[]>>;
  defaultOption?: string;
  defaultRoles?: string[];
}

export const AdminAuthorityMenu = ({
  index,
  setMenuInfo,
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

  function onChange(value: string | string[]) {
    setSelectedOption(value);

    setMenuInfo((prev) => {
      const newMenuInfo = [...prev];
      newMenuInfo[index] = {
        name: prev[index].name,
        option: value as string,
        roles: value === "select" ? selectedRoles : [],
      };
      return newMenuInfo;
    });

    if (value !== "select") {
      setSelectedRoles([]);
    }
  }

  function onCheckBoxChange(value: string | string[]) {
    setSelectedRoles(value as string[]);

    setMenuInfo((prev) => {
      const newMenuInfo = [...prev];

      newMenuInfo[index] = {
        name: prev[index].name,
        option: "select",
        roles: value as string[],
      };
      return newMenuInfo;
    });
  }

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        권한 선택
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
          value={selectedRoles}
          defaultValue={defaultRoles}
          onChange={onCheckBoxChange}
        >
          {data?.map((role) => (
            <MenuItemOption
              key={role.roleId}
              value={role.roleId.toString()}
              isChecked={selectedRoles.includes(role.alias)}
              defaultChecked={defaultRoles?.includes(role.alias)}
              h="28px"
              borderTop="1px solid"
              borderColor="gray.2"
              _hover={{ bg: "blue.1" }}
              isDisabled={selectedOption !== "select"}
            >
              {role.alias}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
