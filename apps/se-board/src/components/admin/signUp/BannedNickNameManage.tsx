import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import React from "react";

import { ItemInput, ListContainer } from "../";

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

export const BannedNickNameManage = () => {
  const [nickName, setNickName] = useState<string>("");

  const deleteOnClick = (id: number) => {
    // TODO: delete Request
  };

  const addOnClick = () => {
    // TODO: add Request
    setNickName("");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  return (
    <Box my="16px">
      <Text fontSize={{ base: "md" }} fontWeight="semibold" mb="8px">
        금지 닉네임 관리({data.sise}개)
      </Text>
      <ListContainer data={data.list} deleteOnClick={deleteOnClick} />
      <ItemInput
        label="금지 닉네임 추가"
        placeholder="금지 닉네임 입력"
        value={nickName}
        onChange={onChange}
        addOnClick={addOnClick}
      />
    </Box>
  );
};
