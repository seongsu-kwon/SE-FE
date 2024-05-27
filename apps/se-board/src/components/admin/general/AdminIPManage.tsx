import { Box, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";

import {
  useDeleteAdminIPMutation,
  useGetAdminIPsQuery,
  usePostAdminIPMutation,
} from "@/react-query/hooks";

import { ItemInput } from "../ItemInput";
import { ListContainer } from "../ListContainer";

export const AdminIPManage = () => {
  const [ip, setIp] = useState<string>("");

  const { data, refetch } = useGetAdminIPsQuery();
  const { mutate: postMutate, isLoading: postLoading } =
    usePostAdminIPMutation();
  const { mutate: deleteMutate, isLoading: deleteLoading } =
    useDeleteAdminIPMutation();

  const toast = useToast();

  const deleteOnClick = (ipAddress: string, onClose: () => void) => {
    deleteMutate(ipAddress, {
      onSuccess: () => {
        refetch();
        onClose();
        setIp("");

        toast({
          title: "관리자 IP 삭제 성공!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
    });
  };

  const addOnClick = () => {
    postMutate(ip, {
      onSuccess: () => {
        refetch();
        setIp("");

        toast({
          title: "관리자 IP 등록 성공!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
    });
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
          관리자 IP 관리({data?.length || 0}개)
        </Text>
        <ListContainer
          data={data || []}
          deleteOnClick={deleteOnClick}
          isLoading={deleteLoading}
        />
        <ItemInput
          label="IP 추가"
          placeholder="IP 입력"
          value={ip}
          onChange={onChange}
          addOnClick={addOnClick}
          isLoading={postLoading}
        />
      </Box>
    </Box>
  );
};
