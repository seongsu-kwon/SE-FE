import { Box, Text, useToast } from "@chakra-ui/react";
import { IpInfo } from "@types";
import React, { useEffect, useState } from "react";

import {
  useDeleteBannedIpMutation,
  useGetBannedIpQuery,
  usePostBannedIpMutation,
} from "@/react-query/hooks";

import { ItemInput, ListContainer } from "..";

export const SpamIP = () => {
  const { data, refetch } = useGetBannedIpQuery();
  const { mutate: postMutate, isLoading: postIsLoading } =
    usePostBannedIpMutation();
  const { mutate: deleteMutate, isLoading: deleteIsLoading } =
    useDeleteBannedIpMutation();

  const [bannedIps, setBannedIps] = useState<IpInfo[]>([]);
  const [ip, setIp] = useState<string>("");

  const toast = useToast();

  useEffect(() => {
    if (!data) return;

    setBannedIps(data);
  }, [data]);

  const deleteOnClick = (ipAddress: string, onClose: () => void) => {
    deleteMutate(ipAddress, {
      onSuccess: () => {
        refetch();
        onClose();
        setIp("");

        toast({
          title: "스팸 IP 삭제 성공!",
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
        setIp("");
        refetch();

        toast({
          title: "스팸 IP 등록 성공!",
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
    <Box my="16px">
      <Text fontSize={{ base: "md" }} fontWeight="semibold" mb="8px">
        스팸 IP 관리({bannedIps.length}개)
      </Text>
      <ListContainer
        data={bannedIps}
        deleteOnClick={deleteOnClick}
        isLoading={deleteIsLoading}
      />
      <ItemInput
        label="스팸 IP 추가"
        placeholder="스팸 IP 입력"
        value={ip}
        onChange={onChange}
        addOnClick={addOnClick}
        isLoading={postIsLoading}
      />
    </Box>
  );
};
