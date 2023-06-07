import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  CategoryInfomation,
  MenuInfo,
  PostMenuInfo,
  PutRoleData,
  Role,
} from "@types";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  useDeleteCategory,
  useGetCategory,
  useGetMenuInfo,
  usePostAddCategory,
  usePostMenuInfo,
  usePostMoveCategory,
} from "@/react-query/hooks/useMenu";

import { AuthorityMenu } from "./AuthoritySetting";

interface CategoryItemProps {
  name: string;
  menuId: number;
  urlId: string;
  roleList: Role[];
  onOpen: () => void;
  fromIdRef: React.MutableRefObject<number>;
}

const defaultRoleList = [
  { value: "all", label: "모든 사용자" },
  { value: "overUser", label: "준회원이상" },
  { value: "overKumoh", label: "정회원이상" },
  { value: "onlyAdmin", label: "관리자만" },
  { value: "select", label: "선택 사용자" },
];

const CategoryItem = ({
  name,
  menuId,
  urlId,
  roleList,
  onOpen,
  fromIdRef,
}: CategoryItemProps) => {
  const { data, refetch } = useGetMenuInfo(menuId);
  const { mutate: modifyMutate, isLoading: modifyIsLoading } =
    usePostMenuInfo();

  const [isModify, setIsModify] = useState(false);
  const [modifyName, setModifyName] = useState(name);
  const [modifyId, setModifyId] = useState(urlId);
  const [categoryInfo, setCategoryInfo] = useState<MenuInfo>({
    name: "",
    description: "",
    urlId: "",
    externalUrl: "",
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
    menuExpose: {
      option: "",
      roles: [],
    },
  });
  const [manageSelectedRole, setManageSelectedRole] = useState<PutRoleData>({
    option: "",
    roles: [],
  });
  const [writeSelectedRole, setWriteSelectedRole] = useState<PutRoleData>({
    option: "",
    roles: [],
  });

  useEffect(() => {
    setModifyName(name);
    setModifyId(urlId);
  }, [name, urlId]);

  useEffect(() => {
    if (!data) return;

    setCategoryInfo(data);
  }, [data]);

  const onClickModify = () => {
    const categoryInfo = {
      name: modifyName,
      description: "",
      externalUrl: "",
      urlId: modifyId,
      access: {
        option: "",
        roles: [],
      },
      write: {
        option: writeSelectedRole.option,
        roles: writeSelectedRole.roles.map((v) => v.roleId),
      },
      manage: {
        option: manageSelectedRole.option,
        roles: manageSelectedRole.roles.map((v) => v.roleId),
      },
      expose: {
        option: "",
        roles: [],
      },
    };

    modifyMutate(
      { categoryId: menuId, data: categoryInfo },
      {
        onSuccess: () => {
          setIsModify(false);
          refetch();
        },
      }
    );
  };

  const onClickDelete = () => {
    onOpen();
    fromIdRef.current = menuId;
  };

  return !isModify ? (
    <>
      <Box fontSize={{ base: "14px", md: "16px" }}>{name}</Box>
      <Box fontSize={{ base: "14px", md: "16px" }}>{urlId}</Box>
      <Box maxH="2.5rem" overflow="auto" wordBreak="keep-all">
        {categoryInfo.manage.option !== "select" ? (
          <Flex w="full" h="full" justifyContent="center" alignItems="center">
            <Box fontSize="sm">
              {
                defaultRoleList
                  .filter((v) => v.value === categoryInfo.manage.option)
                  .at(0)?.label
              }
            </Box>
          </Flex>
        ) : (
          categoryInfo.manage.roles.map((value) => (
            <Box fontSize="xs">{value}</Box>
          ))
        )}
      </Box>
      <Box maxH="2.5rem" overflow="auto">
        {categoryInfo.write.option !== "select" ? (
          <Flex w="full" h="full" justifyContent="center" alignItems="center">
            <Box fontSize="sm">
              {
                defaultRoleList
                  .filter((v) => v.value === categoryInfo.write.option)
                  .at(0)?.label
              }
            </Box>
          </Flex>
        ) : (
          categoryInfo.write.roles.map((value) => (
            <Box fontSize="sm">
              {defaultRoleList.filter((v) => v.value === value).at(0)?.label}
            </Box>
          ))
        )}
      </Box>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="update&delete"
          icon={<BsThreeDotsVertical />}
          variant="ghost"
        />
        <MenuList maxW="0.5rem">
          <MenuItem
            onClick={() => {
              setIsModify(true);
            }}
          >
            수정
          </MenuItem>
          <MenuItem onClick={onClickDelete}>삭제</MenuItem>
        </MenuList>
      </Menu>
    </>
  ) : (
    <>
      <Input
        placeholder="카테고리 이름"
        value={modifyName}
        onChange={(e) => setModifyName(e.target.value)}
      />
      <Input
        placeholder="카테고리 ID"
        value={modifyId}
        onChange={(e) => setModifyId(e.target.value)}
      />
      <AuthorityMenu
        authority={categoryInfo.manage}
        roleList={roleList}
        selectedRole={manageSelectedRole}
        setSelectedRole={setManageSelectedRole}
      />
      <AuthorityMenu
        authority={categoryInfo.write}
        roleList={roleList}
        selectedRole={writeSelectedRole}
        setSelectedRole={setWriteSelectedRole}
      />
      <Flex w="80%" mx="auto" justifyContent="space-between">
        <Button onClick={() => setIsModify(false)}>취소</Button>
        <Button
          variant="primary"
          onClick={() => onClickModify()}
          isLoading={modifyIsLoading}
          loadingText="수정 중"
        >
          등록
        </Button>
      </Flex>
    </>
  );
};

export const CategorySetting = ({
  menuId,
  roleList,
}: {
  menuId: number;
  roleList: Role[];
}) => {
  const { data, refetch } = useGetCategory(menuId);
  const { mutate: deleteMutate, isLoading: deleteIsLoading } =
    useDeleteCategory();
  const { mutate: moveMutate, isLoading: moveIsLoading } =
    usePostMoveCategory();

  const [categoryList, setCategoryList] = useState<CategoryInfomation[]>([]);
  const [isMoved, setIsMoved] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const fromIdRef = useRef<number>(0);
  const toIdRef = useRef<number>(0);

  useEffect(() => {
    if (!data) return;

    setCategoryList(data.subMenus);
  }, [data]);

  const onMovedCategory = () => {
    moveMutate(
      {
        fromCategoryId: fromIdRef.current,
        toCategoryId: toIdRef.current,
      },
      {
        onSuccess: () => {
          setIsMoved(true);
        },
      }
    );
  };

  const onClickDelete = () => {
    deleteMutate(fromIdRef.current, {
      onSuccess: () => {
        onClose();
        refetch();
        setIsMoved(false);
        fromIdRef.current = 0;
        toIdRef.current = 0;
      },
    });
  };

  return (
    <>
      <SimpleGrid
        columns={5}
        spacingX={{ base: 0, md: "1rem" }}
        spacingY={{ md: "0.5rem" }}
        textAlign="center"
      >
        <Box borderBottom="1px solid" borderColor="gray.5">
          카테고리 이름
        </Box>
        <Box borderBottom="1px solid" borderColor="gray.5">
          카테고리 ID
        </Box>
        <Box borderBottom="1px solid" borderColor="gray.5">
          관리 권한
        </Box>
        <Box borderBottom="1px solid" borderColor="gray.5">
          작성 권한
        </Box>
        <Box borderBottom="1px solid" borderColor="gray.5">
          수정 / 삭제
        </Box>
        {categoryList.map((category) => (
          <CategoryItem
            name={category.name}
            menuId={category.menuId}
            urlId={category.urlId}
            roleList={roleList}
            onOpen={onOpen}
            fromIdRef={fromIdRef}
          />
        ))}
      </SimpleGrid>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              카테고리 삭제
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text>게시글 이동 후 카테고리 삭제 가능합니다.</Text>
              <FormControl display="flex" alignItems="center" my="1rem">
                <FormLabel fontWeight="bold" w="fit-content">
                  옮길 카테고리
                </FormLabel>
                <Select
                  w="13rem"
                  mr="4px"
                  onChange={(e) => {
                    toIdRef.current = Number(e.target.value);
                  }}
                >
                  <option value="" hidden>
                    카테고리
                  </option>
                  {categoryList
                    .filter((v) => v.menuId !== fromIdRef.current)
                    .map((category) => (
                      <option value={category.menuId}>{category.name}</option>
                    ))}
                </Select>
                <Button
                  variant="primary"
                  onClick={onMovedCategory}
                  isLoading={moveIsLoading}
                  loadingText="이동 중"
                >
                  이동
                </Button>
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                취소
              </Button>
              <Button
                variant="danger"
                onClick={onClickDelete}
                ml={3}
                isDisabled={!isMoved}
                isLoading={deleteIsLoading}
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

interface CategoryInputProps {
  menuId: number;
  newCategory: string;
  onNewCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newCategoryId: string;
  onNewCategoryIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  roleList: Role[];
}

export const CategoryInput = ({
  menuId,
  newCategory,
  onNewCategoryChange,
  newCategoryId,
  onNewCategoryIdChange,
  roleList,
}: CategoryInputProps) => {
  const { mutate, isLoading } = usePostAddCategory();

  const [manageSelectedRole, setManageSelectedRole] = useState<PutRoleData>({
    option: "",
    roles: [],
  });
  const [writeSelectedRole, setWriteSelectedRole] = useState<PutRoleData>({
    option: "",
    roles: [],
  });

  const onAddCategory = () => {
    const data: { superCategoryId: number } & PostMenuInfo = {
      superCategoryId: menuId,
      name: newCategory,
      urlId: newCategoryId,
      externalUrl: "",
      description: "",
      access: {
        option: "",
        roles: [],
      },
      write: {
        option: writeSelectedRole.option,
        roles: writeSelectedRole.roles.map((v) => v.roleId),
      },
      manage: {
        option: manageSelectedRole.option,
        roles: manageSelectedRole.roles.map((v) => v.roleId),
      },
      expose: {
        option: "",
        roles: [],
      },
    };

    mutate(
      { categoryType: "CATEGORY", data },
      {
        onSuccess: () => {
          window.location.reload();
        },
      }
    );
  };

  return (
    <Flex
      display={{ base: "block", md: "flex" }}
      alignItems="center"
      wrap="wrap"
    >
      <Heading fontSize="md" w={{ base: "7rem" }} textAlign="center">
        카테고리 추가
      </Heading>
      <Input
        mx="2px"
        w={{ base: "9rem", md: "10rem" }}
        placeholder="카테고리 이름"
        value={newCategory}
        onChange={onNewCategoryChange}
      />
      <Input
        mx="2px"
        w={{ base: "9rem", md: "10rem" }}
        placeholder="카테고리 ID"
        value={newCategoryId}
        onChange={onNewCategoryIdChange}
      />
      <AuthorityMenu
        authorityName="관리 권한"
        roleList={roleList}
        selectedRole={manageSelectedRole}
        setSelectedRole={setManageSelectedRole}
      />
      <AuthorityMenu
        authorityName="작성 권한"
        roleList={roleList}
        selectedRole={writeSelectedRole}
        setSelectedRole={setWriteSelectedRole}
      />
      <Button
        mx="4px"
        variant="primary"
        onClick={onAddCategory}
        isLoading={isLoading}
        loadingText="등록 중"
      >
        등록
      </Button>
    </Flex>
  );
};
