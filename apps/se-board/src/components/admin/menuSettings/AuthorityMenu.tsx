import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { MenuRoleInfo } from "@types";
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
}

export const AuthorityMenu = ({
  roleType,
  setRoles,
  defaultOption,
  defaultRoles,
}: AuthorityMenuProps) => {
  const { data } = useGetRoleInfos();

  const [selectedOption, setSelectedOption] = useState<string | string[]>(
    defaultOption || ""
  );
  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    defaultRoles || []
  );

  useEffect(() => {
    if (!defaultOption || !data || !defaultRoles) return;
    setSelectedOption(defaultOption);
    setSelectedRoles(defaultRoles);

    if (defaultOption === "select") {
      setRoles((prev) => ({
        ...prev,
        [roleType]: {
          ...prev[roleType],
          option: defaultOption,
          roles: data.roles
            .filter((role) => defaultRoles.includes(role.name))
            .map((role) => role.roleId),
        },
      }));
    }
  }, [data, defaultOption, defaultRoles]);

  const onChange = (value: string | string[]) => {
    setSelectedOption(value);

    setRoles((prev) => ({
      ...prev,
      [roleType]: {
        ...prev[roleType],
        option: value,
        roles: [],
      },
    }));
  };

  const onCheckBoxChange = (value: string | string[]) => {
    setSelectedRoles(value as string[]);

    setRoles((prev) => ({
      ...prev,
      [roleType]: {
        ...prev[roleType],
        option: "select",
        roles: data?.roles
          .filter((role) => value.includes(role.name))
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
          defaultValue={defaultOption || selectedOption}
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
          defaultValue={defaultRoles || selectedRoles}
          onChange={onCheckBoxChange}
        >
          {data?.roles.map((role) => (
            <MenuItemOption
              key={role.roleId}
              value={role.alias}
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

interface AdminAuthorityMenuProps {
  defaultOption?: string;
  defaultRoles?: string[];
}

export const AdminAuthorityMenu = ({
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

    if (value !== "select") {
      setSelectedRoles([]);
    }
  }

  function onCheckBoxChange(value: string | string[]) {
    setSelectedRoles(value as string[]);
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
          defaultValue={defaultOption || selectedOption}
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
          defaultValue={defaultRoles || selectedRoles}
          onChange={onCheckBoxChange}
        >
          {data?.roles.map((role) => (
            <MenuItemOption
              key={role.roleId}
              value={role.alias}
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
