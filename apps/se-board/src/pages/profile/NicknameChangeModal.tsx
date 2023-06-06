import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export const NicknameChangeModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>닉네임 변경</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            취소
          </Button>
          <Button variant="primary">변경</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
