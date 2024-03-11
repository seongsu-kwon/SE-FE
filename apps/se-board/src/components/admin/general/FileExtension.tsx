import {
  Box,
  Flex,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

import {
  useDeleteFileExtensionMutation,
  useGetFileExtensionsQuery,
  usePostFileExtensionMutation,
} from "@/react-query/hooks/useFileQuery";

import { ItemInput } from "../ItemInput";

export const FileExtension = () => {
  const [tag, setTag] = useState<string>("");

  const { data } = useGetFileExtensionsQuery();
  const { mutate: addFileExtension, isLoading: addFileExtensionLoading } =
    usePostFileExtensionMutation();
  const { mutate: deleteFileExtension } = useDeleteFileExtensionMutation();
  const toast = useToast();

  const queryClient = useQueryClient();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const addOnClick = () => {
    if (!tag) {
      alert("파일 확장자를 입력해주세요.");
      return;
    }

    if (data?.extensionName.includes(tag)) {
      alert("이미 존재하는 확장자입니다.");
      return;
    }

    addFileExtension([tag], {
      onSuccess: () => {
        setTag("");
        toast({
          title: "파일 확장자가 추가되었습니다.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        queryClient.invalidateQueries(["fileExtensions"]);
      },
    });
  };

  const deleteOnClick = (value: string) => {
    deleteFileExtension([value], {
      onSuccess: () => {
        toast({
          title: "파일 확장자가 삭제되었습니다.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        queryClient.invalidateQueries(["fileExtensions"]);
      },
    });
  };

  return (
    <Box my="16px">
      <Text fontSize={{ base: "md" }} fontWeight="semibold" mb="8px">
        파일 확장자 관리({data?.extensionName.length}개)
      </Text>
      <Flex alignItems="center" gap="0.75rem" wrap="wrap">
        {data?.extensionName.map((value, idx) => (
          <Tag
            key={idx}
            size="lg"
            borderRadius="xl"
            variant="outline"
            color="blue.5"
            colorScheme="blue"
          >
            <TagLabel>{value}</TagLabel>
            <TagCloseButton
              onClick={() => {
                deleteOnClick(value);
              }}
            />
          </Tag>
        ))}
      </Flex>
      <ItemInput
        label="파일 확장자 추가"
        placeholder="ex) jpg"
        value={tag}
        onChange={onChange}
        addOnClick={addOnClick}
        isLoading={addFileExtensionLoading}
      />
    </Box>
  );
};
