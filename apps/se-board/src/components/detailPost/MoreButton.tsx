import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import {
  BsExclamationCircle,
  BsPencilSquare,
  BsShare,
  BsThreeDotsVertical,
  BsTrash3,
} from "react-icons/bs";

import { openColors } from "@/styles";

interface MoreButtonProps {
  fontSize?: string;
  menuItems: {
    name: string;
    onClick: () => void;
    isWriter: boolean;
    icon: IconType;
  }[];
}

export const MoreButton = ({ fontSize, menuItems }: MoreButtonProps) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="더보기 버튼"
        icon={<BsThreeDotsVertical />}
        fontSize={fontSize || "24px"}
        mx="1vw"
        backgroundColor={openColors.white}
        _hover={{ backgroundColor: openColors.white }}
        _expanded={{ backgroundColor: openColors.white }}
      />
      <MenuList minWidth="120px" shadow="xl">
        {menuItems.map(
          (item) =>
            item.isWriter && (
              <MenuItem
                key={item.name}
                icon={<item.icon />}
                onClick={item.onClick}
                maxW="120px"
              >
                {item.name}
              </MenuItem>
            )
        )}
      </MenuList>
    </Menu>
  );
};

const PostModifyMenuItem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modifyAlertRef = React.useRef<HTMLButtonElement>(null);
  const commentModifyClick = () => {
    // TODO: 작성글 수정
    onClose();
    // 작성글 수정 페이지로 이동
  };

  return (
    <>
      <MenuItem icon={<BsPencilSquare />} onClick={onOpen} maxW="120px">
        수정
      </MenuItem>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={modifyAlertRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              수정
            </AlertDialogHeader>
            <AlertDialogBody>작성글을 수정하시겠습니까?</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={modifyAlertRef} onClick={onClose}>
                취소
              </Button>
              <Button variant="primary" onClick={commentModifyClick} ml="8px">
                수정
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

const PostDeleteAlert = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteAlertRef = React.useRef<HTMLButtonElement>(null);
  const commentDeleteClick = () => {
    // TODO: 작성글 삭제

    onClose();
  };

  return (
    <>
      <MenuItem icon={<BsTrash3 />} onClick={onOpen} maxW="120px">
        삭제
      </MenuItem>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={deleteAlertRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              삭제
            </AlertDialogHeader>
            <AlertDialogBody>작성글을 삭제하시겠습니까?</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={deleteAlertRef} onClick={onClose}>
                취소
              </Button>
              <Button variant="danger" onClick={commentDeleteClick} ml="8px">
                삭제
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export const PostReportAlert = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const reportAlertRef = React.useRef<HTMLButtonElement>(null);
  const commentReportClick = () => {
    // TODO: 작성글 신고
    onClose();
  };

  return (
    <>
      <MenuItem icon={<BsExclamationCircle />} onClick={() => {}} maxW="120px">
        신고
      </MenuItem>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={reportAlertRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              신고
            </AlertDialogHeader>
            <AlertDialogBody> 해당 게시글을 신고하시겠습니까?</AlertDialogBody>
            <AlertDialogFooter>
              <Button variant="danger" ref={reportAlertRef} onClick={onClose}>
                취소
              </Button>
              <Button onClick={commentReportClick} ml="8px">
                신고
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

const PostShareMenuItem = ({ onShareClick }: { onShareClick: () => void }) => {
  return (
    <MenuItem icon={<BsShare />} onClick={onShareClick} maxW="120px">
      공유
    </MenuItem>
  );
};

export const PostMoreButton = ({ isEditable }: { isEditable: boolean }) => {
  const toast = useToast();

  const onShareClick = () => {
    const url = window.location.href;

    try {
      navigator.clipboard.writeText(url);
      toast({
        title: "URL이 복사되었습니다.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      alert("URL 복사에 실패했습니다.");
    }
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="더보기 버튼"
        icon={<BsThreeDotsVertical />}
        fontSize="24px"
        mx="1vw"
        backgroundColor={openColors.white}
        _hover={{ backgroundColor: openColors.white }}
        _expanded={{ backgroundColor: openColors.white }}
      />
      <MenuList minWidth="120px" shadow="xl">
        {isEditable ? (
          <>
            <PostModifyMenuItem />
            <PostDeleteAlert />
            <PostShareMenuItem onShareClick={onShareClick} />
          </>
        ) : (
          <>
            <PostShareMenuItem onShareClick={onShareClick} />
            <PostReportAlert />
          </>
        )}
      </MenuList>
    </Menu>
  );
};

interface CommentMoreButtonProps {
  isEditable: boolean;
  setIsModify: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentDeleteAlert = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteAlertRef = React.useRef<HTMLButtonElement>(null);
  const commentDeleteClick = () => {
    // TODO: 댓글 삭제

    onClose();
  };

  return (
    <>
      <MenuItem icon={<BsTrash3 />} onClick={onOpen} maxW="120px">
        삭제
      </MenuItem>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={deleteAlertRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              삭제
            </AlertDialogHeader>
            <AlertDialogBody>댓글을 삭제하시겠습니까?</AlertDialogBody>
            <AlertDialogFooter>
              <Button variant="primary" ref={deleteAlertRef} onClick={onClose}>
                취소
              </Button>
              <Button variant="danger" onClick={commentDeleteClick} ml="8px">
                삭제
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

const CommentReportAlert = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const reportAlertRef = React.useRef<HTMLButtonElement>(null);
  const commentReportClick = () => {
    // TODO: 댓글 신고
    onClose();
  };

  return (
    <>
      <MenuItem icon={<BsExclamationCircle />} onClick={() => {}} maxW="120px">
        신고
      </MenuItem>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={reportAlertRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              신고
            </AlertDialogHeader>
            <AlertDialogBody> 해당 댓글을 신고하시겠습니까?</AlertDialogBody>
            <AlertDialogFooter>
              <Button variant="primary" ref={reportAlertRef} onClick={onClose}>
                취소
              </Button>
              <Button variant="danger" onClick={commentReportClick} ml="8px">
                신고
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export const CommentMoreButton = ({
  isEditable,
  setIsModify,
}: CommentMoreButtonProps) => {
  const commentModifyClick = () => {
    setIsModify(true);
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="더보기 버튼"
        icon={<BsThreeDotsVertical />}
        fontSize="24px"
        mx="1vw"
        backgroundColor={openColors.white}
        _hover={{ backgroundColor: openColors.white }}
        _expanded={{ backgroundColor: openColors.white }}
      />
      <MenuList minWidth="120px" shadow="xl">
        {isEditable ? (
          <>
            <MenuItem
              icon={<BsPencilSquare />}
              onClick={commentModifyClick}
              maxW="120px"
            >
              수정
            </MenuItem>
            <CommentDeleteAlert />
          </>
        ) : (
          <>
            <CommentReportAlert />
          </>
        )}
      </MenuList>
    </Menu>
  );
};
