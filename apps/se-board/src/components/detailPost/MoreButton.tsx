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
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { useDeletePostMutation } from "@/react-query/hooks";
import {
  useDeleteCommentMutation,
  useDeleteReplyMutation,
} from "@/react-query/hooks";
import { refetchCommentState } from "@/store/CommentState";
import { useUserState } from "@/store/user";
import { openColors } from "@/styles";
import { errorHandle } from "@/utils/errorHandling";
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

const PostModifyMenuItem = ({ postId }: { postId: number }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modifyCancelRef = React.useRef<HTMLButtonElement>(null);

  const postModifyClick = () => {
    onClose();

    navigate(`/notice/${postId}/modify`);
  };

  return (
    <>
      <MenuItem icon={<BsPencilSquare />} onClick={onOpen} maxW="120px">
        수정
      </MenuItem>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={modifyCancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              게시글 수정
            </AlertDialogHeader>
            <AlertDialogBody>작성글을 수정하시겠습니까?</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={modifyCancelRef} onClick={onClose}>
                취소
              </Button>
              <Button variant="primary" onClick={postModifyClick} ml="8px">
                수정
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

const PostDeleteAlert = ({ postId }: { postId: number }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteAlertRef = React.useRef<HTMLButtonElement>(null);
  const { mutate: deleteMutate, isLoading } = useDeletePostMutation();

  const postDeleteClick = () => {
    deleteMutate(postId, {
      onSuccess: () => {
        onClose();
        navigate(-1);
      },
      onError: (error) => {
        onClose();
        errorHandle(error);
      },
    });
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
              <Button
                isLoading={isLoading}
                loadingText="삭제 중"
                variant="danger"
                onClick={postDeleteClick}
                ml="8px"
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

export const PostReportAlert = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const reportAlertRef = React.useRef<HTMLButtonElement>(null);
  const commentReportClick = () => {
    // TODO: 작성글 신고
    onClose();
  };

  return (
    <>
      <MenuItem icon={<BsExclamationCircle />} onClick={onOpen} maxW="120px">
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
              <Button ref={reportAlertRef} onClick={onClose}>
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

const PostShareMenuItem = ({ onShareClick }: { onShareClick: () => void }) => {
  return (
    <MenuItem icon={<BsShare />} onClick={onShareClick} maxW="120px">
      공유
    </MenuItem>
  );
};

export const PostMoreButton = ({
  postId,
  isEditable,
}: {
  postId: number;
  isEditable: boolean;
}) => {
  const toast = useToast();
  const { hasAuth } = useUserState();

  const onShareClick = () => {
    const url = window.location.href;

    navigator.clipboard.writeText(url).then(
      () => {
        toast({
          title: "URL이 복사되었습니다.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      },
      (err) => {
        toast({
          title: "URL 복사에 실패했습니다.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    );
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
            <PostModifyMenuItem postId={postId} />
            <PostDeleteAlert postId={postId} />
            <PostShareMenuItem onShareClick={onShareClick} />
          </>
        ) : (
          <>
            <PostShareMenuItem onShareClick={onShareClick} />
            {hasAuth && <PostReportAlert />}
          </>
        )}
      </MenuList>
    </Menu>
  );
};

interface CommentMoreButtonProps {
  isEditable: boolean;
  setIsModify: React.Dispatch<React.SetStateAction<boolean>>;
  commentId: number;
  isReply: boolean;
}

const CommentDeleteAlert = ({
  commentId,
  isReply,
  postId,
}: {
  commentId: number;
  isReply: boolean;
  postId?: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const setRefetchCommentState = useSetRecoilState(refetchCommentState);

  const deleteAlertRef = React.useRef<HTMLButtonElement>(null);

  const { mutate: deleteMutate, isLoading: commentDeleteIsLoading } =
    useDeleteCommentMutation(postId);
  const { mutate: deleteReplyMutate, isLoading: deleteReplyIsLoading } =
    useDeleteReplyMutation(postId);

  const commentDeleteClick = () => {
    if (!isReply) {
      deleteMutate(commentId, {
        onSuccess: () => {
          onClose();

          setRefetchCommentState(true);
        },
        onError: (error) => {
          errorHandle(error);
        },
      });
    } else {
      deleteReplyMutate(commentId, {
        onSuccess: () => {
          onClose();
          setRefetchCommentState(true);
        },
        onError: (error) => {
          errorHandle(error);
        },
      });
    }
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
              <Button ref={deleteAlertRef} onClick={onClose}>
                취소
              </Button>
              <Button
                isLoading={commentDeleteIsLoading || deleteReplyIsLoading}
                loadingText="삭제 중"
                variant="danger"
                onClick={commentDeleteClick}
                ml="8px"
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

const CommentReportAlert = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hasAuth } = useUserState();
  const reportAlertRef = React.useRef<HTMLButtonElement>(null);
  const commentReportClick = () => {
    // TODO: 댓글 신고
    if (!hasAuth) {
      onClose();
      alert("로그인 후 신고가능합니다.");
      console.log("로그인 후 신고가능합니다.");
    }
    onClose();
  };

  return (
    <>
      <MenuItem icon={<BsExclamationCircle />} onClick={onOpen} maxW="120px">
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
              <Button ref={reportAlertRef} onClick={onClose}>
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
  commentId,
  isReply,
}: CommentMoreButtonProps) => {
  const commentModifyClick = () => {
    setIsModify(true);
  };
  const { postId } = useParams();

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
            <CommentDeleteAlert
              commentId={commentId}
              isReply={isReply}
              postId={postId}
            />
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
