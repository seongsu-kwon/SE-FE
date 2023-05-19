export const ErrorFieldAlert = () => {
  alert(
    "필수 필드가 누락되었습니다. 필수 필드를 모두 입력해주세요. \n(게시글 필수 필드: 제목, 본문, 카테고리, 공개범위) \n (댓글 필수 필드: 댓글 내용)"
  );
  // const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });
  // const cancelRef = React.useRef<HTMLButtonElement>(null);

  // return (
  //   <AlertDialog
  //     isOpen={isOpen}
  //     leastDestructiveRef={cancelRef}
  //     onClose={onClose}
  //   >
  //     <AlertDialogOverlay>
  //       <AlertDialogContent>
  //         <AlertDialogHeader fontSize="lg" fontWeight="bold">
  //           필수 필드 누락
  //         </AlertDialogHeader>

  //         <AlertDialogBody>
  //           필수 필드가 누락되었습니다. 필수 필드를 모두 입력해주세요.
  //           <Text size="sm">
  //             게시글 필수 필드: 제목, 본문, 카테고리, 공개범위
  //           </Text>
  //           <Text size="sm">댓글 필수 필드: 댓글 내용</Text>
  //         </AlertDialogBody>

  //         <AlertDialogFooter>
  //           <Button
  //             ref={cancelRef}
  //             colorScheme="error"
  //             onClick={onClose}
  //             ml={3}
  //           >
  //             확인
  //           </Button>
  //         </AlertDialogFooter>
  //       </AlertDialogContent>
  //     </AlertDialogOverlay>
  //   </AlertDialog>
  // );
};

export const NoPermissionsAlert = () => {
  alert("해당 요청에 대한 권한이 없습니다.");
  window.history.back();
  // const navigate = useNavigate();
  // const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });
  // const cancelRef = React.useRef<HTMLButtonElement>(null);

  // const handleConfirm = () => {
  //   onClose();
  //   navigate(-1);
  // };

  // return (
  //   <AlertDialog
  //     isOpen={isOpen}
  //     leastDestructiveRef={cancelRef}
  //     onClose={onClose}
  //   >
  //     <AlertDialogOverlay>
  //       <AlertDialogContent>
  //         <AlertDialogHeader fontSize="lg" fontWeight="bold">
  //           권한 없음
  //         </AlertDialogHeader>

  //         <AlertDialogBody>해당 요청에 대한 권한이 없습니다.</AlertDialogBody>

  //         <AlertDialogFooter>
  //           <Button ref={cancelRef} onClick={onClose}>
  //             취소
  //           </Button>
  //           <Button colorScheme="error" onClick={handleConfirm} ml={3}>
  //             뒤로가기
  //           </Button>
  //         </AlertDialogFooter>
  //       </AlertDialogContent>
  //     </AlertDialogOverlay>
  //   </AlertDialog>
  // );
};

export const ExceededNumberAlert = () => {
  alert("게시글, 댓글 작성 제한 횟수를 초과하였습니다.");
  window.history.back();
  // const navigate = useNavigate();
  // const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });
  // const cancelRef = React.useRef<HTMLButtonElement>(null);

  // const handleConfirm = () => {
  //   onClose();
  //   navigate(-1);
  // };

  // return (
  //   <AlertDialog
  //     isOpen={isOpen}
  //     leastDestructiveRef={cancelRef}
  //     onClose={onClose}
  //   >
  //     <AlertDialogOverlay>
  //       <AlertDialogContent>
  //         <AlertDialogHeader fontSize="lg" fontWeight="bold">
  //           횟수 초과
  //         </AlertDialogHeader>

  //         <AlertDialogBody>
  //           게시글, 댓글 작성 횟수가 초과되었습니다.
  //         </AlertDialogBody>

  //         <AlertDialogFooter>
  //           <Button ref={cancelRef} onClick={onClose}>
  //             취소
  //           </Button>
  //           <Button colorScheme="primary" onClick={handleConfirm} ml={3}>
  //             뒤로가기
  //           </Button>
  //         </AlertDialogFooter>
  //       </AlertDialogContent>
  //     </AlertDialogOverlay>
  //   </AlertDialog>
  // );
};

export const NonePostAlert = () => {
  alert("해당 게시글이 존재하지 않습니다.");
  // const navigate = useNavigate();
  // const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });
  // const cancelRef = React.useRef<HTMLButtonElement>(null);

  // const handleConfirm = () => {
  //   onClose();
  //   navigate(-1);
  // };

  // return (
  //   <AlertDialog
  //     isOpen={isOpen}
  //     leastDestructiveRef={cancelRef}
  //     onClose={onClose}
  //   >
  //     <AlertDialogOverlay>
  //       <AlertDialogContent>
  //         <AlertDialogHeader fontSize="lg" fontWeight="bold">
  //           게시글
  //         </AlertDialogHeader>

  //         <AlertDialogBody>해당 게시글이 존재하지 않습니다.</AlertDialogBody>

  //         <AlertDialogFooter>
  //           <Button ref={cancelRef} onClick={onClose}>
  //             취소
  //           </Button>
  //           <Button colorScheme="primary" onClick={handleConfirm} ml={3}>
  //             뒤로가기
  //           </Button>
  //         </AlertDialogFooter>
  //       </AlertDialogContent>
  //     </AlertDialogOverlay>
  //   </AlertDialog>
  // );
};

export const NoneCategoryAlert = () => {
  alert("해당 카테고리가 존재하지 않습니다.");
  // const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });
  // const cancelRef = React.useRef<HTMLButtonElement>(null);

  // return (
  //   <AlertDialog
  //     isOpen={isOpen}
  //     leastDestructiveRef={cancelRef}
  //     onClose={onClose}
  //   >
  //     <AlertDialogOverlay>
  //       <AlertDialogContent>
  //         <AlertDialogHeader fontSize="lg" fontWeight="bold">
  //           카테고리 없음
  //         </AlertDialogHeader>

  //         <AlertDialogBody>해당 카테고리가 존재하지 않습니다.</AlertDialogBody>

  //         <AlertDialogFooter>
  //           <Button ref={cancelRef} onClick={onClose}>
  //             취소
  //           </Button>
  //           <Button colorScheme="primary" onClick={onClose} ml={3}>
  //             확인
  //           </Button>
  //         </AlertDialogFooter>
  //       </AlertDialogContent>
  //     </AlertDialogOverlay>
  //   </AlertDialog>
  // );
};

export const NoneAttachmentAlert = () => {
  alert("잘못된 첨부파일입니다.");
  // const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });
  // const cancelRef = React.useRef<HTMLButtonElement>(null);

  // return (
  //   <AlertDialog
  //     isOpen={isOpen}
  //     leastDestructiveRef={cancelRef}
  //     onClose={onClose}
  //   >
  //     <AlertDialogOverlay>
  //       <AlertDialogContent>
  //         <AlertDialogHeader fontSize="lg" fontWeight="bold">
  //           첨부파일
  //         </AlertDialogHeader>

  //         <AlertDialogBody>잘못된 첨부파일입니다.</AlertDialogBody>

  //         <AlertDialogFooter>
  //           <Button ref={cancelRef} onClick={onClose}>
  //             취소
  //           </Button>
  //           <Button colorScheme="primary" onClick={onClose} ml={3}>
  //             확인
  //           </Button>
  //         </AlertDialogFooter>
  //       </AlertDialogContent>
  //     </AlertDialogOverlay>
  //   </AlertDialog>
  // );
};

export const NoneCommentAlert = () => {
  alert("존재하지 않는 댓글입니다.");
};

export const GotoLoginAlert = () => {
  alert("로그인이 필요합니다.");
  window.location.href = "/login";
};
