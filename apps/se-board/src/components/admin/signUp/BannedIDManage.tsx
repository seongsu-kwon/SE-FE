import { Box, Text, useToast } from "@chakra-ui/react";
import { BannedId } from "@types";
import React, { useEffect, useState } from "react";

import {
  useDeleteBannedIdMutation,
  useGetBannedIdsQuery,
  usePostBannedIdMutation,
} from "@/react-query/hooks";
import { errorHandle } from "@/utils/errorHandling";

import { ItemInput, ListContainer } from "..";

export const BannedIDManage = () => {
  const { data, refetch } = useGetBannedIdsQuery();
  const { mutate: postMutate, isLoading: postIsLoading } =
    usePostBannedIdMutation();
  const { mutate: deleteMutate, isLoading: deleteIsLoading } =
    useDeleteBannedIdMutation();

  const [bannedIds, setBannedIds] = useState<BannedId[]>([]);
  const [identification, setIdentification] = useState<string>("");

  const toast = useToast();

  useEffect(() => {
    if (!data) return;

    setBannedIds(data.content);
  }, [data]);

  const deleteOnClick = (id: string, isClose: () => void) => {
    deleteMutate(id, {
      onSuccess: () => {
        refetch();
        isClose();
        setIdentification("");

        toast({
          title: "금지 ID 삭제 성공!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },

      onError: (error) => {
        errorHandle(error);
      },
    });
  };

  const addOnClick = () => {
    postMutate(identification, {
      onSuccess: () => {
        setIdentification("");
        refetch();

        toast({
          title: "금지 ID 등록 성공!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (error) => {
        errorHandle(error);
      },
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentification(e.target.value);
  };

  return (
    <Box my="1rem">
      <Text fontSize={{ base: "md" }} fontWeight="semibold" mb="8px">
        금지 아이디 관리({bannedIds.length}개)
      </Text>
      <ListContainer
        data={bannedIds}
        deleteOnClick={deleteOnClick}
        isLoading={deleteIsLoading}
      />
      <ItemInput
        label="금지 아이디 추가"
        placeholder="금지 아이디 입력"
        value={identification}
        onChange={onChange}
        addOnClick={addOnClick}
        isLoading={postIsLoading}
      />
    </Box>
  );
};
