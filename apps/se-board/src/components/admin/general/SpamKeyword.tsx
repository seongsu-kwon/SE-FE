import { Box, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";

import {
  useDeleteSpamKeyWordMutation,
  useGetSpamKeyWordQuery,
  usePostSpamKeyWordMutation,
} from "@/react-query/hooks";

import { ItemInput, ListContainer } from "..";

export const SpamKeyword = () => {
  const [keyword, setKeyword] = useState<string>("");

  const { data, refetch } = useGetSpamKeyWordQuery();
  const { mutate: postMutate, isLoading: postIsLoading } =
    usePostSpamKeyWordMutation();
  const { mutate: deleteMutate, isLoading: deleteIsLoading } =
    useDeleteSpamKeyWordMutation();

  const toast = useToast();

  const deleteOnClick = (id: string, isClose: () => void) => {
    deleteMutate(Number(id), {
      onSuccess: () => {
        refetch();
        isClose();
        setKeyword("");

        toast({
          title: "스팸 키워드 삭제 성공!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
    });
  };

  const addOnClick = () => {
    postMutate(keyword, {
      onSuccess: () => {
        setKeyword("");
        refetch();

        toast({
          title: "스팸 키워드 등록 성공!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <Box my="16px">
      <Text fontSize={{ base: "md" }} fontWeight="semibold" mb="8px">
        스팸 키워드 관리({data?.length || 0}개)
      </Text>
      <ListContainer
        data={data || []}
        deleteOnClick={deleteOnClick}
        isLoading={deleteIsLoading}
      />
      <ItemInput
        label="스팸 키워드 추가"
        placeholder="스팸 키워드 입력"
        value={keyword}
        onChange={onChange}
        addOnClick={addOnClick}
        isLoading={postIsLoading}
      />
    </Box>
  );
};
