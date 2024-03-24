import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { AdminMember } from "@types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsChevronDown } from "react-icons/bs";

import { useGetRoleInfos } from "@/react-query/hooks";
import { useAdminUpdateMenber } from "@/react-query/hooks/admin/useAdminMemberQuery";

interface MemberEditField {
  id: string;
  password: string;
  name: string;
  nickname: string;
  roles: number[];
}

interface MemberEditModalProps {
  isOpen: boolean;
  member?: AdminMember;
  onClose: () => void;
}
export const MemberEditModal = ({
  isOpen,
  onClose,
  member,
}: MemberEditModalProps) => {
  const {
    register,
    getFieldState,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    watch,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<MemberEditField>({
    mode: "onBlur",
    defaultValues: {
      id: member?.loginId,
      name: member?.name,
      nickname: member?.nickname,
      roles: member?.roles.map((role) => role.roleId) ?? [],
    },
  });

  const { data } = useGetRoleInfos();

  const { mutateAsync: updateMember, isLoading } = useAdminUpdateMenber();

  const onSubmit = (data: MemberEditField) => {
    if (!member) return;

    updateMember({
      accountId: member.accountId,
      ...data,
    }).then(() => {
      onClose();
    });
  };

  const onCancleEdit = () => {
    onClose();
  };

  const onClickRole = (roleId: number) => {
    if (watch("roles").includes(roleId)) {
      setValue(
        "roles",
        watch("roles").filter((v) => v != roleId)
      );
    } else {
      setValue("roles", [...watch("roles"), roleId]);
    }
  };

  useEffect(() => {
    reset({
      id: member?.loginId,
      name: member?.name,
      nickname: member?.nickname,
      roles: member?.roles.map((role) => role.roleId) ?? [],
    });
  }, [member]);
  return (
    <Modal
      closeOnOverlayClick={false}
      blockScrollOnMount
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>회원 정보 수정</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap="1.5rem">
              {/* <----- 아이디 확인시작 */}
              <FormControl isInvalid={getFieldState("id").invalid}>
                <FormLabel ml="0.5rem" color="gray.8" fontWeight="bold">
                  아이디
                </FormLabel>
                <Flex alignItems="center" gap="0.5rem">
                  <InputGroup>
                    <Input
                      isInvalid={getFieldState("id").invalid}
                      disabled
                      placeholder="아이디"
                      {...register("id", {
                        required: true,
                      })}
                    />
                  </InputGroup>
                </Flex>
                <FormErrorMessage ml="0.5rem">
                  {errors.id?.message}
                </FormErrorMessage>
              </FormControl>
              {/*  아이디 끝 ----->*/}
              {/* <----- 비밀번호 시작 */}
              <FormControl isInvalid={getFieldState("password").invalid}>
                <FormLabel ml="0.5rem" color="gray.8" fontWeight="bold">
                  비밀번호
                </FormLabel>
                <Flex alignItems="center" gap="0.5rem">
                  <InputGroup>
                    <Input
                      isInvalid={getFieldState("password").invalid}
                      placeholder="비밀번호"
                      {...register("password")}
                    />
                  </InputGroup>
                </Flex>
                <FormErrorMessage ml="0.5rem">
                  {errors.password?.message}
                </FormErrorMessage>
              </FormControl>
              {/*  비밀번호 끝 ----->*/}
              {/* <----- 이름 시작 */}
              <FormControl isInvalid={getFieldState("name").invalid}>
                <FormLabel ml="0.5rem" color="gray.8" fontWeight="bold">
                  이름
                </FormLabel>
                <Flex alignItems="center" gap="0.5rem">
                  <InputGroup>
                    <Input
                      isInvalid={getFieldState("name").invalid}
                      placeholder="이름"
                      {...register("name", {
                        required: true,
                      })}
                    />
                  </InputGroup>
                </Flex>
                <FormErrorMessage ml="0.5rem">
                  {errors.name?.message}
                </FormErrorMessage>
              </FormControl>
              {/*  이름 끝 ----->*/}
              {/* <----- 닉네임 시작 */}
              <FormControl isInvalid={getFieldState("nickname").invalid}>
                <FormLabel ml="0.5rem" color="gray.8" fontWeight="bold">
                  닉네임
                </FormLabel>
                <Flex alignItems="center" gap="0.5rem">
                  <InputGroup>
                    <Input
                      isInvalid={getFieldState("nickname").invalid}
                      placeholder="닉네임"
                      {...register("nickname", {
                        required: true,
                      })}
                    />
                  </InputGroup>
                </Flex>
                <FormErrorMessage ml="0.5rem">
                  {errors.nickname?.message}
                </FormErrorMessage>
              </FormControl>
              {/*  닉네임 끝 ----->*/}
              {/* <-----  권한 시작 */}
              <FormControl isInvalid={getFieldState("roles").invalid}>
                <FormLabel ml="0.5rem" color="gray.8" fontWeight="bold">
                  권한
                </FormLabel>
                <Flex alignItems="center" gap="0.5rem">
                  <Menu closeOnSelect={false}>
                    <MenuButton as={Button} rightIcon={<BsChevronDown />}>
                      {data
                        ?.filter((v) => watch("roles").includes(v.roleId))
                        .map((v) => v.alias)
                        .join(",") || "권한선택"}
                    </MenuButton>
                    <MenuList>
                      <MenuOptionGroup
                        type="checkbox"
                        value={data
                          ?.filter((role) =>
                            watch("roles").some((id) => role.roleId === id)
                          )
                          .map((role) => role.alias)}
                      >
                        {data?.map((role) => (
                          <MenuItemOption
                            onClick={() => onClickRole(role.roleId)}
                            key={role.roleId}
                            value={role.alias}
                            h="28px"
                            borderTop="1px solid"
                            borderColor="gray.2"
                            _hover={{ bg: "blue.1" }}
                          >
                            {role.alias}
                          </MenuItemOption>
                        ))}
                      </MenuOptionGroup>
                    </MenuList>
                  </Menu>
                </Flex>
                <FormErrorMessage ml="0.5rem">
                  {errors.roles?.message}
                </FormErrorMessage>
              </FormControl>
              {/*  권한 끝 ----->*/}
            </Flex>
            <Flex mt="2rem" justify="flex-end">
              <Button
                isDisabled={isLoading || !isValid}
                isLoading={isLoading}
                type="submit"
                colorScheme="blue"
                mr={3}
              >
                수정
              </Button>
              <Button type="button" variant="ghost" onClick={onCancleEdit}>
                취소
              </Button>
            </Flex>
          </form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
