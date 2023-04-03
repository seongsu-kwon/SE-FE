import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import { BsPaperclip } from "react-icons/bs";

import { openColors } from "@/styles";

interface AttachmentFileProps {
  files: {
    file_id: number;
    file_name: string;
    file_size: number;
    file_type: string;
    file_url: string;
  }[];
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
                placement="auto-start"
              >
                <Box
                  key={file.file_id}
                  color={openColors.gray[6]}
                  _hover={{ color: openColors.gray[7] }}
                >
                  {file.file_name}
                </Box>
              </Tooltip>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};
