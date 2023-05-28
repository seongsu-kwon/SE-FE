import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";

import { ItemInput, ListContainer } from "..";

const data = {
  sise: 7,
  list: [
    { id: 1, name: "admin" },
    { id: 2, name: "admin2" },
    { id: 3, name: "admin3" },
    { id: 4, name: "admin4" },
    { id: 5, name: "admin5" },
    { id: 6, name: "김민종❤️정이수" },
    { id: 7, name: "admin7" },
  ],
};

export const SpamIP = () => {
  const [ip, setIp] = useState<string>("");

  const deleteOnClick = (id: number) => {
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
    <Box my="16px">
      <Text fontSize={{ base: "md" }} fontWeight="semibold" mb="8px">
        스팸 키워드 관리(0개)
      </Text>
      <ListContainer data={data.list} deleteOnClick={deleteOnClick} />
      <ItemInput
        label="스팸 IP 추가"
        placeholder="스팸 IP 입력"
        value={ip}
        onChange={onChange}
        addOnClick={addOnClick}
      />
    </Box>
  );
};
