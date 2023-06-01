import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  IconButton,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { BannedId, BannedNickname } from "@types";
import React from "react";
import { BsX } from "react-icons/bs";

interface ListItemProps {
  item: BannedNickname | BannedId | { id: number; name: string };
  deleteOnClick: (name: string) => void;
  isLoading: boolean;
}

function nameValue(
  item: BannedNickname | BannedId | { id: number; name: string }
) {
  if ("bannedNickname" in item) {
    return item.bannedNickname;
  } else if ("bannedId" in item) {
    return item.bannedId;
  } else if ("name" in item) {
    return item.name;
  }

  return "";
}

function typeValue(
  item: BannedNickname | BannedId | { id: number; name: string }
) {
  if ("bannedNickname" in item) {
    return "금지 닉네임";
  } else if ("bannedId" in item) {
    return "금지 아이디";
  } else if ("name" in item) {
    return "이름";
  }

  return "";
}

export const ListItem = ({ item, deleteOnClick, isLoading }: ListItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <Flex
        w="full"
        h="32px"
        pl={{ base: "2rem", md: "6rem" }}
        pr={{ base: "2rem", md: "6rem" }}
        borderBottom="1px solid"
        borderColor="gray.5"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize={{ base: "md", md: "lg" }}>{nameValue(item)}</Text>
        <Tooltip hasArrow label="삭제" fontSize="sm" placement="top">
          <IconButton
            aria-label="삭제"
            variant="danger"
            icon={<BsX />}
            fontSize="1.5rem"
            size="xs"
            onClick={onOpen}
          />
        </Tooltip>
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {typeValue(item)} 삭제
            </AlertDialogHeader>

            <AlertDialogBody>
              해당 "{nameValue(item)}"을 삭제하시겠습니까?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                취소
              </Button>
              <Button
                variant="danger"
                onClick={() => deleteOnClick(nameValue(item))}
                ml={3}
                isLoading={isLoading}
                loadingText="삭제 중"
              >
                삭제
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
