import { Flex, Heading, Input, InputGroup } from "@chakra-ui/react";
import React from "react";

interface ValueInputProps {
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  w?: { base: string; md: string };
}

const ValueInput = ({ value, placeholder, onChange, w }: ValueInputProps) => {
  return (
    <Input
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      w={w || { base: "12rem", md: "15rem" }}
      mx="0.5rem"
      borderColor="gray.5"
    />
  );
};

interface MenuInfoProps {
  menuName: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  menuID: string;
  onIDChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MenuInfo = ({
  menuName,
  onNameChange,
  menuID,
  onIDChange,
}: MenuInfoProps) => {
  return (
    <>
      <Heading fontSize="xl">메뉴 정보</Heading>
      <Flex alignItems="center" my="0.5rem">
        <Heading fontSize="md" w={{ md: "5rem" }}>
          메뉴 이름:
        </Heading>
        <ValueInput
          value={menuName}
          onChange={onNameChange}
          placeholder="메뉴 이름"
        />
      </Flex>
      <Flex alignItems="center" my="0.75rem">
        <Heading fontSize="md" w={{ md: "5rem" }}>
          메뉴 ID:
        </Heading>
        <ValueInput
          value={menuID}
          onChange={onIDChange}
          placeholder="메뉴 ID"
        />
      </Flex>
    </>
  );
};

export const ExternalMenuInfo = ({
  menuName,
  onNameChange,
  menuID,
  onIDChange,
}: MenuInfoProps) => {
  return (
    <>
      <Heading fontSize="xl">메뉴 정보</Heading>
      <Flex alignItems="center" my="0.5rem">
        <Heading fontSize="md">메뉴 이름:</Heading>
        <ValueInput
          value={menuName}
          onChange={onNameChange}
          placeholder="메뉴 이름"
        />
      </Flex>
      <Flex alignItems="center" my="0.75rem">
        <Heading fontSize="md" w="5rem">
          메뉴 URL:
        </Heading>
        <InputGroup>
          <ValueInput
            value={menuID}
            onChange={onIDChange}
            w={{ base: "16rem", md: "22rem" }}
            placeholder="메뉴 URL"
          />
        </InputGroup>
      </Flex>
    </>
  );
};
