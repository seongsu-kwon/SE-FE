import {
  Box,
  Button,
  Checkbox,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DeletedPost } from "@types";
import { useEffect, useMemo, useState } from "react";
import { BsClockHistory, BsTrash3 } from "react-icons/bs";

import { Pagination } from "@/components/Pagination";
import {
  useGetDeletedPostQuery,
  usePermanentlyDeletePostQuery,
  usePostRestorePostQuery,
} from "@/react-query/hooks";
import { toYYMMDD_DOT } from "@/utils/dateUtils";

import { MemberProfileButton } from "../MemberProfileButton";

const columnWidth = {
  base: ["3rem", "8rem", "3rem", "4rem", "3rem", "2rem"],
  md: ["4rem", "4rem", "14rem", "4rem", "6rem", "4rem"],
};

export const PostPanel = () => {
  const columnHelper = createColumnHelper<DeletedPost>();

  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const [checkBoxes, setCheckBoxes] = useState<boolean[]>([]);
  const [page, setPage] = useState<number>(0);

  const { data, refetch } = useGetDeletedPostQuery(page, 25);
  const { mutate: restoreMutate, isLoading: restoreIsLoading } =
    usePostRestorePostQuery();
  const { mutate: deleteMutate, isLoading: deleteIsLoading } =
    usePermanentlyDeletePostQuery();

  const columns = useMemo<ColumnDef<DeletedPost, any>[]>(
    () => [
      columnHelper.accessor("menu", {
        header: "게시판",
        cell: (info) => {
          return <Text>{info.row.original.menu.name}</Text>;
        },
      }),
      columnHelper.accessor("category", {
        header: "카테고리",
        cell: (info) => {
          return <Text>{info.row.original.category.name}</Text>;
        },
      }),
      columnHelper.accessor("title", {
        header: "제목",
        cell: (info) => {
          return <Text>{info.row.original.title}</Text>;
        },
      }),
      columnHelper.accessor("author", {
        header: "작성자",
        cell: (info) => {
          return <MemberProfileButton memberInfo={info.row.original.author} />;
        },
      }),
      columnHelper.accessor("createdAt", {
        header: "작성일",
        cell: (info) => {
          return <Text>{toYYMMDD_DOT(info.row.original.createdAt)}</Text>;
        },
      }),
      columnHelper.accessor("exposeOption", {
        header: "공개범위",
        cell: (info) => {
          return <Text>{info.row.original.exposeOption}</Text>;
        },
      }),
    ],
    []
  );

  const table = useReactTable<DeletedPost>({
    data: data?.content || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    setCheckBoxes(Array(data?.content.length).fill(false));
  }, [data]);

  const onAllCheckClick = () => {
    setIsAllChecked(!isAllChecked);
    setCheckBoxes(checkBoxes.map(() => !isAllChecked));

    if (!isAllChecked) {
      // 체크박스가 모두 체크되어있는 상태
      setCheckedList(data?.content.map((post) => post.postId) || []);
    } else {
      setCheckedList([]);
    }
  };

  const onRestoreClick = () => {
    if (checkedList.length === 0) return alert("복원할 게시글을 선택해주세요.");

    restoreMutate(checkedList, {
      onSuccess: () => {
        setCheckedList([]);
        setIsAllChecked(false);
        setCheckBoxes(Array(data?.content.length).fill(false));
        refetch();
      },
    });
  };

  const onDeleteClick = () => {
    if (checkedList.length === 0) return alert("삭제할 게시글을 선택해주세요.");

    deleteMutate(checkedList, {
      onSuccess: () => {
        setCheckedList([]);
        setIsAllChecked(false);
        setCheckBoxes(Array(data?.content.length).fill(false));
        refetch();
      },
    });
  };

  return (
    <Box>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              <Th w="3%" borderY="1px solid" borderColor="gray.3">
                <Checkbox
                  borderColor="gray.4"
                  isChecked={isAllChecked}
                  onChange={onAllCheckClick}
                />
              </Th>
              {headerGroup.headers.map((header, i) => (
                <Th
                  key={header.id}
                  w={{ base: columnWidth.base[i], md: columnWidth.md[i] }}
                  textAlign="center"
                  whiteSpace="nowrap"
                  borderY="1px solid"
                  borderColor="gray.3"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.length === 0 ? (
            <Tr>
              <Td colSpan={7} h="20rem">
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  w="100%"
                  h="100%"
                  color="gray.5"
                >
                  <Text fontSize="lg">휴지통이 비어있습니다.</Text>
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
                          return [...prev, row.original.postId];
                        } else {
                          return prev.filter(
                            (id) => id !== row.original.postId
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
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <Flex
        w="full"
        justifyContent={{ base: "flex-start", md: "flex-end" }}
        mt="0.5rem"
        gap="0.5rem"
      >
        <Button
          leftIcon={<BsTrash3 />}
          variant="danger"
          loadingText="삭제 중"
          onClick={onDeleteClick}
          isLoading={deleteIsLoading}
        >
          삭제
        </Button>
        <Button
          leftIcon={<BsClockHistory />}
          variant="primary"
          loadingText="복원 중"
          onClick={onRestoreClick}
          isLoading={restoreIsLoading}
        >
          복원
        </Button>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mt="0.5rem">
        <Pagination
          currentPage={data?.pageable.pageNumber || 0}
          totalPage={data?.totalPages || 1}
          onChangePage={(page: number) => {
            setPage(page);
            window.scrollTo(0, 0);
          }}
        />
      </Flex>
    </Box>
  );
};
