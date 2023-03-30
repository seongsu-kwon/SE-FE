import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { BsPaperclip } from "react-icons/bs";

import { Props } from "@/@types";
import { useFileInput } from "@/hooks";
import { openColors } from "@/styles";

export const DesktopFileUploader = ({ onFileDrop }: Props) => {
  const { files, handleDrop, handleDragOver, handleFileInput, handleRemove } =
    useFileInput(onFileDrop);

  const onClick = () => {
    console.log(files);
  };

  return (
    <Box
      margin="0 auto"
      maxWidth="984px"
      minH="64px"
      backgroundColor={openColors.gray[0]}
      borderBottom="0.6px solid"
      borderColor={openColors.gray[3]}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <FormControl>
        <Flex
          justifyContent="center"
          borderBottom={`1px solid ${openColors.gray[3]}`}
          pb="4px"
        >
          <FormLabel
            w="fit-content"
            fontSize="lg"
            my="auto"
            p="4px 8px"
            htmlFor="file-input"
            color={openColors.gray[6]}
            _hover={{
              color: openColors.gray[8],
              borderColor: openColors.gray[8],
            }}
            border={`1px solid ${openColors.gray[5]}`}
            borderRadius="5px"
          >
            <Icon as={BsPaperclip} w="20px" h="20px" mb="-0.5" />
            파일 선택
          </FormLabel>
          <Text w="fit-content" fontSize="md" my="auto">
            버튼을 누르거나 파일을 Drag & drop 하세요.
          </Text>
        </Flex>

        <Input
          type="file"
          id="file-input"
          onChange={handleFileInput}
          multiple={true}
          border="none"
          w="fit-content"
          h="fit-content"
          display="none"
        />
        <Box my="12px">
          {files.length > 0 && (
            <Box>
              <Text ml="15px" mt="10px">
                추가된 파일
              </Text>
              <UnorderedList ml="15px">
                {files.map((file, index) => (
                  <ListItem key={index} ml="20px">
                    {file.name}
                    <Button
                      bgColor={openColors.red[5]}
                      color={openColors.white}
                      _hover={{ bgColor: openColors.red[7] }}
                      size="xs"
                      ml="3px"
                      onClick={() => handleRemove(index)}
                    >
                      삭제
                    </Button>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          )}
        </Box>
      </FormControl>
    </Box>
  );
};

export const MobileFileUploader = ({ onFileDrop }: Props) => {
  const { files, handleFileInput, handleRemove } = useFileInput(onFileDrop);

  return (
    <FormControl borderY="0.6px solid" borderColor={openColors.gray[3]}>
      <Input
        type="file"
        id="file-input"
        onChange={handleFileInput}
        multiple={true}
        border="none"
        mx="fit-content"
        mt="10px"
      />

      <Box>
        {files.length > 0 && (
          <Box ml="15px">
            <Text fontSize="md" w="fit-content" mx="auto" my="3px">
              추가된 파일
            </Text>
            <UnorderedList>
              {files.map((file, index) => (
                <ListItem key={index} display="flex" my="5px">
                  <Text w="75%">{file.name}</Text>
                  <Button
                    bgColor={openColors.red[5]}
                    color={openColors.white}
                    _hover={{ bgColor: openColors.red[7] }}
                    size="xs"
                    my="auto"
                    onClick={() => handleRemove(index)}
                  >
                    삭제
                  </Button>
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        )}
      </Box>
    </FormControl>
  );
};
