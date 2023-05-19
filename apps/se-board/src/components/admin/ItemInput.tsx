import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

interface ItemInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addOnClick: () => void;
}

export const ItemInput = ({
  label,
  placeholder,
  value,
  onChange,
  addOnClick,
}: ItemInputProps) => {
  return (
    <FormControl display={{ md: "flex" }} alignItems="center" mt="1rem">
      <FormLabel
        mb={{ base: "4px", md: "0" }}
        mx={{ md: "0.5rem" }}
        fontWeight="semibold"
      >
        {label}
      </FormLabel>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        size="sm"
        w={{ base: "12rem", md: "16rem" }}
        borderColor="gray.5"
      />
      <Button variant="primary" onClick={addOnClick} size="sm" mx="0.5rem">
        등록
      </Button>
    </FormControl>
  );
};
