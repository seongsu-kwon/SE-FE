import { Box, Text } from "@chakra-ui/react";
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

  const deleteOnClick = (id: string) => {
    deleteMutate(Number(id), {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const addOnClick = () => {
    postMutate(keyword, {
      onSuccess: () => {
        setKeyword("");
        refetch();
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
        isLoading={false}
      />
      <ItemInput
        label="스팸 키워드 추가"
        placeholder="스팸 키워드 입력"
        value={keyword}
        onChange={onChange}
        addOnClick={addOnClick}
        isLoading={false}
      />
    </Box>
  );
};
