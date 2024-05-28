import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { Attachment } from "@types";
import { BsPaperclip } from "react-icons/bs";

import { openColors } from "@/styles";

interface AttachmentFileProps {
  files: Attachment[];
}

export const AttachmentFile = ({ files }: AttachmentFileProps) => {
  const color = useColorModeValue("gray.7", "whiteAlpha.700");
  const borderColor = useColorModeValue("gray.3", "whiteAlpha.400");
  const hoverColor = useColorModeValue("gray.0", "whiteAlpha.200");

  return (
    <Box maxW="984px" mx="auto" color={color}>
      <Accordion allowToggle borderColor={borderColor}>
        <AccordionItem>
          <AccordionButton _hover={{ backgroundColor: hoverColor }}>
            <BsPaperclip />
            첨부파일({files.length})
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            {files.map((file) => (
              <Tooltip
                key={file.fileMetaDataId}
                label="다운로드"
                aria-label="다운로드"
                placement="right-end"
              >
                <Box
                  w="fit-content"
                  color={openColors.gray[6]}
                  _hover={{ color: openColors.gray[7] }}
                >
                  <a
                    href={`${process.env.REACT_APP_API_FILE_ENDPOINT}${file.url}`}
                    target="_self"
                    download={`${file.originalFileName}`}
                  >
                    {file.originalFileName}
                  </a>
                </Box>
              </Tooltip>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};
