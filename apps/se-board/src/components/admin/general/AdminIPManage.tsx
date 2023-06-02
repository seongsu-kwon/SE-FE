import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";

import { ItemInput } from "../ItemInput";
import { ListContainer } from "../ListContainer";

const data = {
  sise: 7,
  list: [
    { id: 1, name: "192.0.12.24" },
    { id: 2, name: "192.0.12.24" },
    { id: 3, name: "192.0.12.24" },
    { id: 4, name: "192.0.12.24" },
    { id: 5, name: "192.0.12.24" },
    { id: 6, name: "192.0.12.24" },
    { id: 7, name: "192.0.12.24" },
  ],
};

export const AdminIPManage = () => {
  const [ip, setIp] = useState<string>("");

  const deleteOnClick = (name: string) => {
    // TODO: delete Request
  };

  const addOnClick = () => {
    // TODO: add Request
    setIp("");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIp(e.target.value);
  };

  return (
    <Box
      my="20px"
      bgColor="white"
      py="1rem"
      px={{ base: "0.75rem", md: "1rem" }}
      rounded="3xl"
    >
      <Text
        fontWeight="semibold"
        fontSize={{ base: "xl", md: "2xl" }}
        mb="20px"
        borderBottom="1px solid"
        borderColor="gray.5"
      >
        관리자 IP 관리
      </Text>
      <Box my="16px">
        <Text fontSize={{ base: "md" }} fontWeight="semibold" mb="8px">
          관리자 IP 관리({data.sise}개)
        </Text>
        <ListContainer
          data={data.list}
          deleteOnClick={deleteOnClick}
          isLoading={false}
        />
        <ItemInput
          label="IP 추가"
          placeholder="IP 입력"
          value={ip}
          onChange={onChange}
          addOnClick={addOnClick}
          isLoading={false}
        />
      </Box>
    </Box>
  );
};
