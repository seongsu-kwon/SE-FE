import {
  Button,
  Checkbox,
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AdminCommentContent } from "@types";
import { useEffect, useMemo, useState } from "react";
import { BsRecord, BsTrash3, BsXLg } from "react-icons/bs";

import { useDeleteCommentListMutation } from "@/react-query/hooks";
import { toYYMMDD_DOT } from "@/utils/dateUtils";
import { errorHandle } from "@/utils/errorHandling";

interface AllCommentTableProps {
  commentList: AdminCommentContent[];
  refetch: () => void;
}

const columnWidth = {
  base: ["5rem", "7rem", "7rem", "8rem", "8rem", "8rem"],
  md: ["7rem", "22rem", "4rem", "6rem", "6rem", "5rem"],
};

const columnHelper = createColumnHelper<AdminCommentContent>();

export const AllCommentTable = ({
  commentList,
  refetch,
}: AllCommentTableProps) => {
  const { mutate, isLoading } = useDeleteCommentListMutation();

  const queryClient = useQueryClient();

  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const [checkBoxes, setCheckBoxes] = useState<boolean[]>([]);

  const columns = useMemo<ColumnDef<AdminCommentContent, any>[]>(
    () => [
      columnHelper.accessor("menu", {
        header: "게시판",
        cell: (info) => {
          return (
            <Link href={`/${info.row.original.menu.urlId}`} color="blue.7">
              {info.row.original.menu.name}
            </Link>
          );
        },
      }),
      columnHelper.accessor("contents", {
        header: "댓글",
        cell: (info) => {
          return (
            <Link
              href={`/${info.row.original.menu.urlId}/${info.row.original.postId}`}
              color="blue.7"
            >
              <Text noOfLines={1} maxW="full">
                {info.row.original.contents}
              </Text>
            </Link>
          );
        },
      }),
      columnHelper.accessor("author", {
        header: "작성자",
        cell: (info) => {
          if (info.row.original.author.loginId === null) {
            return (
              <Text cursor="not-allowed">{info.row.original.author.name}</Text>
            );
          } else {
            return (
              <Menu>
                <MenuButton _hover={{ textDecoration: "underline" }}>
                  {info.row.original.author.name}
                </MenuButton>
                <MenuList>
                  <MenuItem>계정 정보 보기</MenuItem>
                </MenuList>
              </Menu>
            );
          }
        },
      }),
      columnHelper.accessor("createdAt", {
        header: "작성일",
        cell: (info) => {
          return toYYMMDD_DOT(info.row.original.createdAt);
        },
      }),
      columnHelper.accessor("isReadOnlyAuthor", {
        header: "공개범위",
        cell: (info) => {
          if (info.row.original.isReadOnlyAuthor) {
            return "비밀";
          } else {
            return "공개";
          }
        },
      }),
      columnHelper.accessor("isReported", {
        header: "신고",
        cell: (info) => {
          return info.row.original.isReported ? (
            <Icon as={BsRecord} fontSize="2xl" />
          ) : (
            <Icon as={BsXLg} />
          );
        },
      }),
    ],
    []
  );

  const table = useReactTable<AdminCommentContent>({
    data: commentList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    setCheckBoxes(new Array(commentList.length).fill(false));
  }, [commentList]);

  const handleCheckAll = () => {
    setIsAllChecked(!isAllChecked);
    setCheckBoxes(checkBoxes.map(() => !isAllChecked));

    if (!isAllChecked) {
      setCheckedList(commentList.map((comment) => comment.commentId));
    } else {
      setCheckedList([]);
    }
  };

  const onDeleteCommentList = () => {
    if (checkedList.length === 0) return alert("삭제할 댓글을 선택해주세요.");

    mutate(checkedList, {
      onSuccess: () => {
        setCheckedList([]);
        setIsAllChecked(false);
        setCheckBoxes(new Array(commentList.length).fill(false));
        refetch();
        queryClient.invalidateQueries(["deletedComments", 0, 25]);
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
              <Th borderY="1px solid" borderColor="gray.3" w="3%">
                <Checkbox
                  borderColor="gray.4"
                  isChecked={isAllChecked}
                  onChange={handleCheckAll}
                ></Checkbox>
              </Th>
              {headerGroup.headers.map((header, i) => (
                <Th
                  key={header.id}
                  w={{ base: columnWidth.base[i], md: columnWidth.md[i] }}
                  fontSize="md"
                  borderY="1px solid"
                  borderColor="gray.3"
                  textAlign="center"
                  whiteSpace="nowrap"
                  color={header.id === "isReported" ? "red.7" : "gray.7"}
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
          {commentList.length === 0 ? (
            <Tr>
              <Td colSpan={7} h="20rem">
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  w="100%"
                  h="100%"
                  color="gray.5"
                >
                  <Text fontSize="lg">댓글이 없습니다.</Text>
                </Flex>
              </Td>
            </Tr>
          ) : (
            table.getRowModel().rows.map((row, i) => (
              <Tr key={row.id}>
                <Td borderY="1px solid" borderColor="gray.3">
                  <Checkbox
                    borderColor="gray.4"
                    isChecked={checkBoxes[i]}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setCheckBoxes((prev) =>
                        prev.map((checkbox, index) =>
                          index === i ? isChecked : checkbox
                        )
                      );
                      setCheckedList((prev) => {
                        if (isChecked) {
                          return [...prev, row.original.commentId];
                        } else {
                          return prev.filter(
                            (commentId) => commentId !== row.original.commentId
                          );
                        }
                      });
                    }}
                  ></Checkbox>
                </Td>
                {row.getVisibleCells().map((cell, i) => (
                  <Td
                    key={cell.id}
                    w={{ base: columnWidth.base[i], md: columnWidth.md[i] }}
                    px="0.5rem"
                    fontSize="sm"
                    borderY="1px solid"
                    borderColor="gray.3"
                    wordBreak={
                      cell.id.includes("contents") ? "normal" : "keep-all"
                    }
                    textAlign={cell.id.includes("contents") ? "left" : "center"}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))
          )}
          {}
        </Tbody>
      </Table>
      <Flex w="full" justifyContent={{ base: "flex-start", md: "flex-end" }}>
        <Button
          leftIcon={<BsTrash3 />}
          variant="danger"
          mt="0.5rem"
          onClick={onDeleteCommentList}
          isLoading={isLoading}
          loadingText="삭제 중"
        >
          삭제
        </Button>
      </Flex>
    </>
  );
};
