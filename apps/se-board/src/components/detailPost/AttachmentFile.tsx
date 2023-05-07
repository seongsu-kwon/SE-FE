import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Link,
  Tooltip,
} from "@chakra-ui/react";
import { Attachment } from "@types";
import { BsPaperclip } from "react-icons/bs";

import { openColors } from "@/styles";

interface AttachmentFileProps {
  files: Attachment[];
}

export const AttachmentFile = ({ files }: AttachmentFileProps) => {
  return (
    <Box maxW="984px" mx="auto">
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton _hover={{ backgroundColor: openColors.gray[1] }}>
            <BsPaperclip />
            첨부파일
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            {files.map((file) => (
              <Tooltip
                label="다운로드"
                aria-label="다운로드"
                placement="right-end"
              >
                <Link
                  w="fit-content"
                  href={`http://192.158.0.67/${file.url}`}
                  key={file.fileMetaDataId}
                  color={openColors.gray[6]}
                  _hover={{ color: openColors.gray[7] }}
                >
                  {file.originalFileName}
                </Link>
              </Tooltip>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};
