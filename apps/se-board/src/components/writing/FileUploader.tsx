import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Link,
  ListItem,
  Progress,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { FileUploaderProps } from "@types";
import { BsPaperclip } from "react-icons/bs";

import { useFileInput } from "@/hooks";
import { openColors } from "@/styles";

export const DesktopFileUploader = ({
  isModified,
  beforeFiles,
}: FileUploaderProps) => {
  const {
    files,
    handleDrop,
    handleDragOver,
    handleFileInput,
    handleRemove,
    isFileUploadLoading,
    isFileDeleteLoading,
  } = useFileInput(isModified, beforeFiles);

  return (
    <Box
      margin="0 auto"
      maxWidth="full"
      minH="80px"
      backgroundColor="gray.0"
      borderBottom={`1px solid ${openColors.gray[3]}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <FormControl>
        <Flex
          justifyContent="center"
          h="70px"
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
        {(isFileUploadLoading || isFileDeleteLoading) && (
          <Progress size="xs" isIndeterminate colorScheme="blue" />
        )}
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
                {files.map((file) => (
                  <ListItem key={file.fileMetaDataId} ml="20px">
                    <Link
                      href={`${process.env.REACT_APP_API_ENDPOINT}${file.url}`}
                      download={file.originalFileName}
                    >
                      {file.originalFileName}
                    </Link>
                    <Button
                      variant="danger"
                      size="xs"
                      ml="3px"
                      onClick={() => handleRemove(file.fileMetaDataId)}
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

export const MobileFileUploader = ({
  isModified,
  beforeFiles,
}: FileUploaderProps) => {
  const {
    files,
    handleFileInput,
    handleRemove,
    isFileUploadLoading,
    isFileDeleteLoading,
  } = useFileInput(isModified, beforeFiles);

  return (
    <FormControl borderY={`1px solid ${openColors.gray[3]}`} minH="3.5rem">
      <FormLabel
        w="100%"
        fontSize="lg"
        my="4px"
        p="4px 8px"
        htmlFor="file-input"
        color={openColors.gray[6]}
      >
        <Flex w="100%" justifyContent="center" h="3.5rem" alignItems="center">
          <Icon as={BsPaperclip} w="20px" h="20px" mb="-0.5" />
          <Text w="fit-content" fontSize="md" my="auto">
            파일 첨부를 하려면 해당 영역을 터치 하세요.
          </Text>
        </Flex>
      </FormLabel>
      {(isFileUploadLoading || isFileDeleteLoading) && (
        <Progress size="xs" isIndeterminate colorScheme="blue" />
      )}
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
          <Box ml="15px" borderTop={`1px solid ${openColors.gray[3]}`}>
            <Text fontSize="md" w="fit-content" mx="auto" my="3px">
              추가된 파일
            </Text>
            <UnorderedList>
              {files.map((file) => (
                <ListItem key={file.fileMetaDataId} display="flex" my="5px">
                  <Link
                    href={`${process.env.REACT_APP_API_ENDPOINT}${file.url}`}
                    download={file.originalFileName}
                  >
                    {file.originalFileName}
                  </Link>
                  <Button
                    variant="danger"
                    size="xs"
                    my="auto"
                    ml="3px"
                    onClick={() => handleRemove(file.fileMetaDataId)}
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
