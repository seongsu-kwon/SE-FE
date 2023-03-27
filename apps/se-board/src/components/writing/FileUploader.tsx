import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";

import { openColors } from "@/styles";

type Props = {
  onFileDrop: (file: Array<File>) => void;
};

export const DesktopFileUploader: React.FC<Props> = ({ onFileDrop }) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const newFiles: Array<File> = [...files];
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      newFiles.push(e.dataTransfer.files[i]);
    }

    setFiles(newFiles);
    onFileDrop(newFiles);
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return;

    const newFiles: Array<File> = [...files];

    for (let i = 0; i < e.target.files.length; i++) {
      newFiles.push(e.target.files[i]);
    }

    onFileDrop(newFiles);
    setFiles(newFiles);
  };
  const handleRemove = (index: number): void => {
    console.log(index);
    const newFiles: Array<File> = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const onClick = () => {
    console.log(files);
  };

  return (
    <Box
      margin="0 auto"
      maxWidth="984px"
      backgroundColor={openColors.gray[0]}
      borderBottom="0.6px solid"
      borderColor={openColors.gray[3]}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <FormControl>
        <FormLabel pt="10px" ml="20px" fontSize="lg">
          첨부 파일
          {files.length === 0 && (
            <Text mx="auto" w="fit-content" fontSize="md">
              파일을 Drag & drop하거나 파일 선택 버튼을 클릭하세요.
            </Text>
          )}
        </FormLabel>
        <Input
          type="file"
          id="file-input"
          onChange={handleFileInput}
          multiple={true}
          border="none"
          w="fit-content"
          h="fit-content"
        />
        <Box mt="15px">
          {files.length > 0 && (
            <Box borderTop="0.6px solid" borderColor={openColors.gray[3]}>
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

export const MobileFileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return;

    const newFiles: Array<File> = [...files];

    for (let i = 0; i < e.target.files.length; i++) {
      newFiles.push(e.target.files[i]);
    }

    setFiles(newFiles);
  };
  const handleRemove = (index: number): void => {
    console.log(index);
    const newFiles: Array<File> = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

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
