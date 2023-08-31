import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { CategoryInfomation, MenuRoleInfo } from "@types";
import { useEffect, useRef, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useRecoilValue, useSetRecoilState } from "recoil";

import {
  useDeleteCategory,
  useGetCategory,
  usePostAddCategory,
  usePostMenuInfo,
  usePostMoveCategory,
} from "@/react-query/hooks/useMenu";
import { categoryListState } from "@/store/categoryState";

import { AuthorityMenu } from "./AuthorityMenu";

interface CategoryManageProps {
  menuId: number;
}

export const CategoryManage = ({ menuId }: CategoryManageProps) => {
  const { data } = useGetCategory(menuId);

  const setCategoryList = useSetRecoilState(categoryListState(menuId));
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!data) return;

    setCategoryList(data.subMenus);
  }, [data]);

  return (
    <Box
      my="20px"
      bgColor="white"
      py="1rem"
      px={{ base: "0.75rem", md: "1rem" }}
      rounded="3xl"
    >
      <Heading fontSize="xl" mb="0.75rem">
        카테고리 관리
      </Heading>
      <Box
        my="0.5rem"
        maxH="20rem"
        border="2px solid"
        borderColor="gray.3"
        wordBreak="keep-all"
      >
        <SimpleGrid
          columns={5}
          textAlign="center"
          fontSize={{ base: "16px", md: "18px" }}
        >
          <Box py="0.375rem" borderBottom="1px solid" borderColor="gray.5">
            카테고리 이름
          </Box>
          <Box py="0.375rem" borderBottom="1px solid" borderColor="gray.5">
            카테고리 ID
          </Box>
          <Box py="0.375rem" borderBottom="1px solid" borderColor="gray.5">
            관리 권한
          </Box>
          <Box py="0.375rem" borderBottom="1px solid" borderColor="gray.5">
            작성 권한
          </Box>
          <Box py="0.375rem" borderBottom="1px solid" borderColor="gray.5">
            수정 / 삭제
          </Box>
        </SimpleGrid>
        {data?.subMenus.map((category) => (
          <CategoryManageItem category={category} menuId={menuId} />
        ))}
      </Box>
      <Flex justifyContent="end" mt="0.75rem">
        <Button
          variant="primary"
          w="8.75rem"
          h="2.5rem"
          fontSize="16px"
          leftIcon={<BsPlusLg />}
          onClick={onOpen}
        >
          카테고리 추가
        </Button>
      </Flex>
      <EnrollAlert isOpen={isOpen} onClose={onClose} menuId={menuId} />
    </Box>
  );
};

interface CategoryManageItemProps {
  category: CategoryInfomation;
  menuId: number;
}

const CategoryManageItem = ({ category, menuId }: CategoryManageItemProps) => {
  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose,
  } = useDisclosure();

  const {
    isOpen: modifyIsOpen,
    onOpen: modifyOnOpen,
    onClose: modifyOnClose,
  } = useDisclosure();

  return (
    <SimpleGrid
      columns={5}
      spacingY={{ md: "0.5rem" }}
      textAlign="center"
      overflowY="auto"
      fontSize={{ base: "14px", md: "16px" }}
      fontWeight="300"
    >
      <Box my="auto">{category.name}</Box>
      <Box my="auto">{category.urlId}</Box>
      <Box my="auto" maxH="2.5rem" overflow="auto" wordBreak="keep-all">
        관리 권한
      </Box>
      <Box my="auto" maxH="2.5rem" overflow="auto" wordBreak="keep-all">
        작성 권한
      </Box>
      <ButtonGroup spacing="0.25rem" mx="auto" my="0.5rem" size="sm">
        <Button variant="primary" onClick={modifyOnOpen}>
          수정
        </Button>
        <Button variant="danger" onClick={deleteOnOpen}>
          삭제
        </Button>
      </ButtonGroup>
      <DeleteAlert
        isOpen={deleteIsOpen}
        onClose={deleteOnClose}
        menuId={menuId}
        category={category}
      />
      <ModifyAlert
        isOpen={modifyIsOpen}
        onClose={modifyOnClose}
        menuId={menuId}
        category={category}
      />
    </SimpleGrid>
  );
};

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  menuId: number;
  category: CategoryInfomation;
}

const DeleteAlert = ({ isOpen, onClose, menuId, category }: AlertProps) => {
  const queryClient = useQueryClient();

  const categoryList = useRecoilValue(categoryListState(menuId));

  const { mutate: moveMutate, isLoading: moveIsLoading } =
    usePostMoveCategory();
  const { mutate: deleteMutate, isLoading: deleteIsLoading } =
    useDeleteCategory();

  const [isMoved, setIsMoved] = useState<boolean>(false);

  const cancelRef = useRef<HTMLButtonElement>(null);
  const fromCategoryIdRef = useRef<number>(category.menuId);
  const toCategoryIdRef = useRef<number | undefined>(undefined);

  function onCategoryMoveClick() {
    if (!toCategoryIdRef.current)
      return alert("이동할 카테고리를 선택해주세요.");

    moveMutate(
      {
        fromCategoryId: fromCategoryIdRef.current,
        toCategoryId: toCategoryIdRef.current,
      },
      {
        onSuccess: () => {
          setIsMoved(true);
        },
      }
    );
  }

  function onCategoryDeleteClick() {
    deleteMutate(fromCategoryIdRef.current, {
      onSuccess: () => {
        onClose();
        queryClient.invalidateQueries(["adminCategory", menuId]);
        setIsMoved(false);
      },
    });
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="xl" fontWeight="bold">
            카테고리 삭제
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>게시글 이동 후 카테고리 삭제 가능합니다.</Text>
            <FormControl alignItems="center" mt="1rem">
              <FormLabel
                fontWeight="bold"
                w="fit-content"
                wordBreak="keep-all"
                mb="0.25rem"
              >
                게시글 이동 카테고리
              </FormLabel>
              <Flex alignItems="center">
                <Select
                  w="13rem"
                  mr="4px"
                  border="1px"
                  borderColor="gray.4"
                  onChange={(e) =>
                    (toCategoryIdRef.current = Number(e.target.value))
                  }
                >
                  <option value="" hidden>
                    카테고리
                  </option>
                  {categoryList
                    .filter((v) => v.menuId !== fromCategoryIdRef.current)
                    .map((category) => (
                      <option key={category.menuId} value={category.menuId}>
                        {category.name}
                      </option>
                    ))}
                </Select>
                <Button
                  variant="primary"
                  onClick={onCategoryMoveClick}
                  isLoading={moveIsLoading}
                  loadingText="이동 중"
                >
                  이동
                </Button>
              </Flex>
            </FormControl>
          </AlertDialogBody>

          <AlertDialogFooter>
            <ButtonGroup>
              <Button ref={cancelRef} onClick={onClose}>
                취소
              </Button>
              <Button
                variant="danger"
                isDisabled={!isMoved}
                onClick={onCategoryDeleteClick}
                isLoading={deleteIsLoading}
                loadingText="삭제 중"
              >
                삭제
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

const ModifyAlert = ({ isOpen, onClose, menuId, category }: AlertProps) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = usePostMenuInfo();

  const [categoryInfo, setCategoryInfo] =
    useState<CategoryInfomation>(category);
  const [roles, setRoles] = useState<MenuRoleInfo>({
    access: {
      option: "",
      roles: [],
    },
    write: {
      option: "",
      roles: [],
    },
    manage: {
      option: "",
      roles: [],
    },
    expose: {
      option: "",
      roles: [],
    },
  });

  const cancelRef = useRef<HTMLButtonElement>(null);

  function onCategoryModifyClick() {
    mutate(
      {
        categoryId: categoryInfo.menuId,
        data: {
          name: categoryInfo.name,
          urlId: categoryInfo.urlId,
          description: "",
          externalUrl: "",
          access: { option: "", roles: [] },
          write: {
            option: roles.write.option,
            roles: roles.write.option === "select" ? roles.write.roles : [],
          },
          manage: {
            option: roles.manage.option,
            roles: roles.manage.option === "select" ? roles.manage.roles : [],
          },
          expose: { option: "", roles: [] },
        },
      },
      {
        onSuccess: () => {
          onClose();
          queryClient.invalidateQueries(["adminCategory", menuId]);
        },
      }
    );
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="xl" fontWeight="bold" mt="0.5rem">
            카테고리 수정
          </AlertDialogHeader>

          <AlertDialogBody pb="1.5rem">
            <FormControl display="flex" alignItems="center">
              <FormLabel fontWeight="bold" w="6.5rem">
                카테고리 이름
              </FormLabel>
              <Input
                type="text"
                placeholder="카테고리 이름 입력"
                value={categoryInfo.name}
                onChange={(e) => {
                  setCategoryInfo({
                    ...categoryInfo,
                    name: e.target.value,
                  });
                }}
                px="0.75rem"
                w="12rem"
                border="1px solid"
                borderColor="gray.4"
              />
            </FormControl>
            <FormControl display="flex" alignItems="center" mt="0.75rem">
              <FormLabel fontWeight="bold" w="6.5rem">
                카테고리 ID
              </FormLabel>
              <Input
                type="text"
                placeholder="카테고리 ID 입력"
                value={categoryInfo.urlId}
                onChange={(e) => {
                  setCategoryInfo({
                    ...categoryInfo,
                    urlId: e.target.value,
                  });
                }}
                px="0.75rem"
                w="12rem"
                border="1px solid"
                borderColor="gray.4"
              />
            </FormControl>
            <FormControl display="flex" alignItems="center" mt="0.75rem">
              <FormLabel fontWeight="bold" w="8.75rem" wordBreak="keep-all">
                카테고리 관리 권한
              </FormLabel>
              <AuthorityMenu
                roleType="manage"
                setRoles={setRoles}
                defaultRoles={categoryInfo.manageRole}
              />
            </FormControl>
            <FormControl display="flex" alignItems="center" mt="0.75rem">
              <FormLabel fontWeight="bold" w="8.75rem" wordBreak="keep-all">
                카테고리 작성 권한
              </FormLabel>
              <AuthorityMenu
                roleType="write"
                setRoles={setRoles}
                defaultRoles={categoryInfo.writeRole}
              />
            </FormControl>
          </AlertDialogBody>

          <AlertDialogFooter>
            <ButtonGroup>
              <Button ref={cancelRef} onClick={onClose}>
                취소
              </Button>
              <Button
                variant="primary"
                isDisabled={
                  JSON.stringify(categoryInfo) === JSON.stringify(category)
                }
                onClick={onCategoryModifyClick}
                isLoading={isLoading}
                loadingText="수정 중"
              >
                등록
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

interface EnrollAlertProps {
  isOpen: boolean;
  onClose: () => void;
  menuId: number;
}

const EnrollAlert = ({ isOpen, onClose, menuId }: EnrollAlertProps) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = usePostAddCategory();

  const [categoryInfo, setCategoryInfo] = useState<CategoryInfomation>({
    name: "",
    urlId: "",
    menuId: 0,
    writeRole: [],
    manageRole: [],
  });
  const [roles, setRoles] = useState<MenuRoleInfo>({
    access: {
      option: "",
      roles: [],
    },
    write: {
      option: "",
      roles: [],
    },
    manage: {
      option: "",
      roles: [],
    },
    expose: {
      option: "",
      roles: [],
    },
  });

  const cancelRef = useRef<HTMLButtonElement>(null);

  function onCategoryEnrollClick() {
    mutate(
      {
        categoryType: "CATEGORY",
        data: {
          superCategoryId: menuId,
          name: categoryInfo.name,
          urlId: categoryInfo.urlId,
          description: "",
          externalUrl: "",
          access: { option: "", roles: [] },
          write: {
            option: "",
            roles: roles.write.option === "select" ? roles.write.roles : [],
          },
          manage: {
            option: "",
            roles: roles.manage.option === "select" ? roles.manage.roles : [],
          },
          expose: { option: "", roles: [] },
        },
      },
      {
        onSuccess: () => {
          onClose();
          queryClient.invalidateQueries(["adminCategory", menuId]);
        },
      }
    );
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="xl" fontWeight="bold" mt="0.5rem">
            카테고리 등록
          </AlertDialogHeader>

          <AlertDialogBody pb="1.5rem">
            <FormControl display="flex" alignItems="center">
              <FormLabel fontWeight="bold" w="6.5rem">
                카테고리 이름
              </FormLabel>
              <Input
                type="text"
                placeholder="카테고리 이름 입력"
                value={categoryInfo.name}
                onChange={(e) => {
                  setCategoryInfo({
                    ...categoryInfo,
                    name: e.target.value,
                  });
                }}
                px="0.75rem"
                w="12rem"
                border="1px solid"
                borderColor="gray.4"
              />
            </FormControl>
            <FormControl display="flex" alignItems="center" mt="0.75rem">
              <FormLabel fontWeight="bold" w="6.5rem">
                카테고리 ID
              </FormLabel>
              <Input
                type="text"
                placeholder="카테고리 ID 입력"
                value={categoryInfo.urlId}
                onChange={(e) => {
                  setCategoryInfo({
                    ...categoryInfo,
                    urlId: e.target.value,
                  });
                }}
                px="0.75rem"
                w="12rem"
                border="1px solid"
                borderColor="gray.4"
              />
            </FormControl>
            <FormControl display="flex" alignItems="center" mt="0.75rem">
              <FormLabel fontWeight="bold" w="8.75rem" wordBreak="keep-all">
                카테고리 관리 권한
              </FormLabel>
              <AuthorityMenu roleType="manage" setRoles={setRoles} />
            </FormControl>
            <FormControl display="flex" alignItems="center" mt="0.75rem">
              <FormLabel fontWeight="bold" w="8.75rem" wordBreak="keep-all">
                카테고리 작성 권한
              </FormLabel>
              <AuthorityMenu roleType="write" setRoles={setRoles} />
            </FormControl>
          </AlertDialogBody>

          <AlertDialogFooter>
            <ButtonGroup>
              <Button ref={cancelRef} onClick={onClose}>
                취소
              </Button>
              <Button
                variant="primary"
                onClick={onCategoryEnrollClick}
                isLoading={isLoading}
                loadingText="등록 중"
              >
                등록
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
