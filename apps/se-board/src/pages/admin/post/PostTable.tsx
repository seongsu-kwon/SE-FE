import {
  Box,
  Checkbox,
  Flex,
  Icon,
  Link as ChakraLink,
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
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AdminPost } from "@types";
import { useEffect, useMemo } from "react";
import { BsRecord, BsXLg } from "react-icons/bs";
import { Link } from "react-router-dom";

import { toYYMMDD_DOT } from "@/utils/dateUtils";
import { getExposeOptionName } from "@/utils/postUtils";

interface AdminPostTableProps {
  posts?: AdminPost[];
  setSelectedPostIds: (ids: number[]) => void;
}
export const AdminPostTable = ({
  posts,
  setSelectedPostIds,
}: AdminPostTableProps) => {
  const columns = useMemo<ColumnDef<AdminPost>[]>(
    () => [
      {
        id: "checkbox",
        header: ({ table }) => (
          <Checkbox
            isChecked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            isChecked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      {
        accessorFn: (row) => row.menu.name,
        header: "게시판",
        cell: (info) => (
          <ChakraLink
            as={Link}
            to={`/${info.row.original.menu.urlId}`}
            color="primary"
            noOfLines={1}
          >
            {info.getValue<string>()}
          </ChakraLink>
        ),
      },
      {
        accessorFn: (row) => row.title,
        header: "제목",
        cell: (info) => (
          <Box textAlign="left">
            <ChakraLink
              textOverflow="ellipsis"
              color="primary"
              as={Link}
              to={`/${info.row.original.menu.urlId}/${info.row.original.postId}`}
            >
              <Text noOfLines={1}> {info.getValue<string>()}</Text>
            </ChakraLink>
          </Box>
        ),
      },
      {
        accessorFn: (row) => row.author.name,
        header: "작성자",
        cell: (info) => (
          <Flex justify="center">
            <Menu>
              <MenuButton
                whiteSpace="nowrap"
                _hover={{ textDecoration: "underline" }}
              >
                {info.getValue<string>()}
              </MenuButton>
              <MenuList>
                <MenuItem>계정 정보 보기</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        ),
      },
      {
        accessorFn: (row) => row.createdAt,
        header: "작성일",
        cell: (info) => (
          <Text textAlign="center">
            {toYYMMDD_DOT(info.getValue<string>())}
          </Text>
        ),
      },
      {
        accessorFn: (row) => row.exposeOption,
        header: "공개범위",
        cell: (info) => (
          <Text textAlign="center">
            {getExposeOptionName(info.getValue<string>())}
          </Text>
        ),
      },
      {
        accessorFn: (row) => row.isReported,
        header: "신고",
        cell: (info) => (
          <Flex justify="center">
            {info.getValue() ? (
              <Icon as={BsRecord} fontSize="2xl" />
            ) : (
              <Icon as={BsXLg} />
            )}
          </Flex>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: posts ?? [],
    columns,
    // enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.postId);
    setSelectedPostIds(selectedIds);
  }, [table.getSelectedRowModel().rows]);

  return (
    <Table w="full" fontSize="sm" textAlign="center">
      <Thead w="full" whiteSpace="nowrap">
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <Th key={header.id} colSpan={header.colSpan} textAlign="center">
                  {header.isPlaceholder ? null : (
                    <>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </>
                  )}
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody w="full" overflowX="hidden">
        {table.getRowModel().rows.map((row) => {
          return (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
