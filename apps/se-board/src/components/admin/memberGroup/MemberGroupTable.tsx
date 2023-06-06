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
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Role } from "@types";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import { BsFillPencilFill, BsTrash3 } from "react-icons/bs";

import {
  useAddRole,
  useDeleteRole,
  useGetRoleInfos,
  useUpdateRole,
} from "@/react-query/hooks";
import { errorHandle } from "@/utils/errorHandling";

const columnHelper = createColumnHelper<Role>();

const columnWidth = ["10rem", "10rem", "60rem", "10rem"];
const mobileColumnWidth = ["8rem", "8rem", "40rem", "8rem"];

interface MemberGroupTableProps {
  addIsOpen: boolean;
  setAddIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MemberGroupTable = ({
  addIsOpen,
  setAddIsOpen,
}: MemberGroupTableProps) => {
  const { data, refetch } = useGetRoleInfos();
  const { mutate: deleteRoleMutate, isLoading: deleteIsLoading } =
    useDeleteRole();
  const { mutate: modifyRoleMutate, isLoading: modifyIsLoading } =
    useUpdateRole();
  const { mutate: addRoleMutate, isLoading: addIsLoading } = useAddRole();

  const [roleList, setRoleList] = useState<Role[]>([]);
  const [modifyRole, setModifyRole] = useState<Role>({
    roleId: -1,
    name: "",
    alias: "",
    description: "",
  });
  const [addRole, setAddRole] = useState<Role>({
    roleId: -1,
    name: "",
    alias: "",
    description: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: modifyIsOpen,
    onOpen: modifyOnOpen,
    onClose: modifyOnClose,
  } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const deleteRoleId = React.useRef<number>(-1);

  useEffect(() => {
    if (!data) return;

    setRoleList(data.roles);
  }, [data]);

  const columns = useMemo<ColumnDef<Role, any>[]>(
    () => [
      columnHelper.accessor("name", {
        header: "그룹명",
        cell: (info) => {
          return info.row.original.name;
        },
      }),
      columnHelper.accessor("alias", {
        header: "별칭",
        cell: (info) => {
          return info.row.original.alias;
        },
      }),
      columnHelper.accessor("description", {
        header: "설명",
        cell: (info) => {
          return info.row.original.description;
        },
      }),
      columnHelper.display({
        id: "removeAndModify",
        header: "삭제/수정",
        cell: (info) => (
          <>
            <Flex
              justifyContent="space-between"
              alignItems="cener"
              w="85%"
              mx="auto"
            >
              <Tooltip label="삭제" placement="top">
                <IconButton
                  aria-label="삭제"
                  variant="danger"
                  icon={<BsTrash3 />}
                  fontSize="1.1rem"
                  size="sm"
                  onClick={() => {
                    deleteRoleId.current = info.row.original.roleId;
                    onOpen();
                  }}
                />
              </Tooltip>
              <Tooltip label="수정" placement="top">
                <IconButton
                  aria-label="수정"
                  bgColor="gray.3"
                  _hover={{ bgColor: "gray.5" }}
                  icon={<BsFillPencilFill />}
                  size="sm"
                  onClick={() => {
                    setModifyRole(info.row.original);
                    modifyOnOpen();
                  }}
                />
              </Tooltip>
            </Flex>
          </>
        ),
      }),
    ],
    []
  );

  const table = useReactTable<Role>({
    data: roleList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onMemberGroupDeleteClick = () => {
    deleteRoleMutate(deleteRoleId.current, {
      onSuccess: () => {
        refetch();
        onClose();
        deleteRoleId.current = -1;
      },
      onError: (error) => {
        errorHandle(error);
      },
    });
  };

  const onModifyRole = () => {
    modifyRoleMutate(modifyRole, {
      onSuccess: () => {
        refetch();
        modifyOnClose();
        setModifyRole({
          roleId: -1,
          name: "",
          alias: "",
          description: "",
        });
      },
      onError: (error) => {
        errorHandle(error);
      },
    });
  };

  const onAddRole = () => {
    addRoleMutate(addRole, {
      onSuccess: () => {
        refetch();
        setAddIsOpen(false);
        setAddRole({
          roleId: -1,
          name: "",
          alias: "",
          description: "",
        });
      },
      onError: (error) => {
        errorHandle(error);
      },
    });
  };

  return (
    <>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header, i) => (
                <Th
                  key={header.id}
                  w={{ base: mobileColumnWidth[i], md: columnWidth[i] }}
                  fontSize="md"
                  textAlign="center"
                  borderY="1px solid"
                  borderColor="gray.3"
                  whiteSpace="nowrap"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id} fontSize="sm">
              {row.getVisibleCells().map((cell, i) => (
                <Td
                  key={cell.id}
                  textAlign={
                    cell.column.id !== "description" ? "center" : "left"
                  }
                  wordBreak="keep-all"
                  py="0.5rem"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              권한 삭제
            </AlertDialogHeader>

            <AlertDialogBody>해당 권한을 삭제하시겠습니까?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                취소
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  onMemberGroupDeleteClick();
                }}
                ml={3}
                isLoading={deleteIsLoading}
                loadingText="삭제중"
              >
                삭제
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={modifyIsOpen || addIsOpen}
        leastDestructiveRef={cancelRef}
        onClose={modifyOnClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              권한 {addIsOpen ? "추가" : "수정"}
            </AlertDialogHeader>

            <AlertDialogBody>
              <Box>
                <FormControl>
                  <FormLabel>그룹명</FormLabel>
                  <Input
                    type="text"
                    placeholder="그룹명을 입력하세요."
                    value={addIsOpen ? addRole.name : modifyRole.name}
                    onChange={(e) => {
                      if (addIsOpen) {
                        setAddRole({
                          ...addRole,
                          name: e.target.value,
                        });
                      } else {
                        setModifyRole({
                          ...modifyRole,
                          name: e.target.value,
                        });
                      }
                    }}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>별칭</FormLabel>
                  <Input
                    type="text"
                    placeholder="별칭을 입력하세요."
                    value={addIsOpen ? addRole.alias : modifyRole.alias}
                    onChange={(e) => {
                      if (addIsOpen) {
                        setAddRole({
                          ...addRole,
                          alias: e.target.value,
                        });
                      } else {
                        setModifyRole({
                          ...modifyRole,
                          alias: e.target.value,
                        });
                      }
                    }}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>설명</FormLabel>
                  <Textarea
                    placeholder="설명을 입력하세요."
                    value={
                      addIsOpen ? addRole.description : modifyRole.description
                    }
                    onChange={(e) => {
                      if (addIsOpen) {
                        setAddRole({
                          ...addRole,
                          description: e.target.value,
                        });
                      } else {
                        setModifyRole({
                          ...modifyRole,
                          description: e.target.value,
                        });
                      }
                    }}
                  />
                </FormControl>
              </Box>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={
                  addIsOpen
                    ? () => {
                        setAddRole({
                          roleId: -1,
                          name: "",
                          alias: "",
                          description: "",
                        });
                        setAddIsOpen(false);
                      }
                    : modifyOnClose
                }
              >
                취소
              </Button>
              <Button
                variant="primary"
                onClick={
                  addIsOpen
                    ? () => {
                        onAddRole();
                      }
                    : () => {
                        onModifyRole();
                      }
                }
                ml={3}
                isLoading={modifyIsLoading || addIsLoading}
                loadingText={addIsOpen ? "등록 중" : "수정 중"}
              >
                {addIsOpen ? "등록" : "수정"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
