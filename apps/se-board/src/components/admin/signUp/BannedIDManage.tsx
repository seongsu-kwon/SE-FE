import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";

import { ItemInput, ListContainer } from "..";

const data = {
  sise: 7,
  list: [
    { id: 1, name: "id" },
    { id: 2, name: "김민종2" },
    { id: 3, name: "김민종3" },
    { id: 4, name: "김민종4" },
    { id: 5, name: "김민종5" },
    { id: 6, name: "김민종6" },
    { id: 7, name: "김민종7" },
  ],
};

export const BannedIDManage = () => {
  const [identification, setIdentification] = useState<string>("");

  const deleteOnClick = (id: number) => {
    // TODO: delete Request
  };

  const addOnClick = () => {
    // TODO: add Request
    setIdentification("");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentification(e.target.value);
  };

  return (
    <Box my="1rem">
      <Text fontSize={{ base: "md" }} fontWeight="semibold" mb="8px">
        금지 아이디 관리({data.sise}개)
      </Text>
      <ListContainer data={data.list} deleteOnClick={deleteOnClick} />
      <ItemInput
        label="금지 아이디 추가"
        placeholder="금지 아이디 입력"
        value={identification}
        onChange={onChange}
        addOnClick={addOnClick}
      />
    </Box>
  );
};
