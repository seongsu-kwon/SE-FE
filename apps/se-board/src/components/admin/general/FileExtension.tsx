import {
  Box,
  Flex,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { ItemInput } from "../ItemInput";

const tags = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "zip",
  "rar",
  "7z",
  "pdf",
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "zip",
  "rar",
  "7z",
  "pdf",
];

export const FileExtension = () => {
  const [tag, setTag] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };
  const addOnClick = () => {
    console.log(tag);
  };

  return (
    <Box my="16px">
      <Text fontSize={{ base: "md" }} fontWeight="semibold" mb="8px">
        파일 확장자 관리({tags.length}개)
      </Text>
      <Flex alignItems="center" gap="0.75rem" wrap="wrap">
        {tags.map((value, idx) => (
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
                console.log("tag", value);
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
        isLoading={false}
      />
    </Box>
  );
};
