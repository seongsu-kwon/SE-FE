import { Box, Text } from "@chakra-ui/react";
import { BannedNickname } from "@types";
import { useEffect, useState } from "react";
import React from "react";

import {
  useDeleteBannedNicknameMutation,
  useGetBannedNicknameQuery,
  usePostBannedNicknameMutation,
} from "@/react-query/hooks";
import { errorHandle } from "@/utils/errorHandling";

import { ItemInput, ListContainer } from "../";

export const BannedNickNameManage = () => {
  const { data, refetch } = useGetBannedNicknameQuery();
  const { mutate: postMutate, isLoading: postIsLoading } =
    usePostBannedNicknameMutation();
  const { mutate: deleteMutate, isLoading: deleteIsLoading } =
    useDeleteBannedNicknameMutation();

  const [bannedNicknames, setBannedNicknames] = useState<BannedNickname[]>([]);
  const [nickName, setNickName] = useState<string>("");

  useEffect(() => {
    if (!data) return;

    setBannedNicknames(data.nicknames);
  }, [data]);

  const deleteOnClick = (name: string) => {
    deleteMutate(name, {
      onSuccess: () => {
        refetch();
      },

      onError: (error) => {
        errorHandle(error);
      },
    });
  };

  const addOnClick = () => {
    postMutate(nickName, {
      onSuccess: () => {
        setNickName("");
        refetch();
      },

      onError: (error) => {
        errorHandle(error);
      },
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  return (
    <Box my="16px">
      <Text fontSize={{ base: "md" }} fontWeight="semibold" mb="8px">
        금지 닉네임 관리({bannedNicknames.length}개)
      </Text>
      <ListContainer
        data={bannedNicknames}
        deleteOnClick={deleteOnClick}
        isLoading={deleteIsLoading}
      />
      <ItemInput
        label="금지 닉네임 추가"
        placeholder="금지 닉네임 입력"
        value={nickName}
        onChange={onChange}
        addOnClick={addOnClick}
        isLoading={postIsLoading}
      />
    </Box>
  );
};
