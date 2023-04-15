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
      maxWidth="full"
      minH="64px"
      backgroundColor={openColors.gray[0]}
      borderBottom={`1px solid ${openColors.gray[3]}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <FormControl>
        <Flex
          justifyContent="center"
          h="50px"
          borderBottom={`1px solid ${openColors.gray[3]}`}
        >
          <FormLabel
            w="100%"
            fontSize="lg"
            my="auto"
            p="4px 8px"
            mr="0"
            htmlFor="file-input"
            color={openColors.gray[6]}
            _hover={{
              color: openColors.gray[8],
              borderColor: openColors.gray[8],
            }}
            borderRadius="5px"
          >
            <Flex w="100%" justifyContent="center">
              <Icon as={BsPaperclip} w="20px" h="20px" mb="-0.5" />
              <Text w="fit-content" fontSize="md" my="auto">
                해당 영역을 누르거나 파일을 Drag & drop 하세요.
              </Text>
            </Flex>
          </FormLabel>
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
                      variant="danger"
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
    <FormControl borderY={`1px solid ${openColors.gray[3]}`}>
      <FormLabel
        w="100%"
        fontSize="lg"
        my="4px"
        p="4px 8px"
        htmlFor="file-input"
        color={openColors.gray[6]}
      >
        <Flex w="100%" justifyContent="center">
          <Icon as={BsPaperclip} w="20px" h="20px" mb="-0.5" />
          <Text w="fit-content" fontSize="md" my="auto">
            파일 첨부를 하려면 해당 영역을 터치 하세요.
          </Text>
        </Flex>
      </FormLabel>
      <Input
        type="file"
        id="file-input"
        onChange={handleFileInput}
        multiple={true}
        border="none"
        mx="fit-content"
        mt="10px"
        display="none"
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
                    variant="danger"
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
