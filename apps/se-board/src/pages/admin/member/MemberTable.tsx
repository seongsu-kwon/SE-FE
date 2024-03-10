import {
  Box,
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
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AdminMember, Role } from "@types";
import { useEffect, useMemo } from "react";

import { toYYMMDD_DOT } from "@/utils/dateUtils";

interface AdminMemberTableProps {
  members?: AdminMember[];
  setSelectedMemberIds: (ids: number[]) => void;
}
export const AdminMemberTable = ({
  members,
  setSelectedMemberIds,
}: AdminMemberTableProps) => {
  const columns = useMemo<ColumnDef<AdminMember>[]>(
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
          <Box textAlign="center">
            <Checkbox
              isChecked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          </Box>
        ),
      },
      {
        accessorFn: (row) => row.loginId,
        header: "로그인 ID",
        cell: (info) => <Text noOfLines={1}> {info.getValue<string>()}</Text>,
      },
      {
        accessorFn: (row) => row.name,
        header: "이름",
        cell: (info) => (
          <Box textAlign="center">
            <Text noOfLines={1}> {info.getValue<string>()}</Text>
          </Box>
        ),
      },
      {
        accessorFn: (row) => row.nickname,
        header: "닉네임",
        cell: (info) => (
          <Flex justify="center">
            <Text noOfLines={1}> {info.getValue<string>()}</Text>
          </Flex>
        ),
      },
      {
        accessorFn: (row) => row.registerDate,
        header: "가입일",
        cell: (info) => (
          <Text textAlign="center">
            {toYYMMDD_DOT(info.getValue<string>())}
          </Text>
        ),
      },
      {
        accessorFn: (row) => row.roles,
        header: "권한",
        cell: (info) => (
          <Text textAlign="center">
            {info
              .getValue<Role[]>()
              .map((v) => v.alias)
              .join(", ")}
          </Text>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: members ?? [],
    columns,
    // enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.accountId);
    setSelectedMemberIds(selectedIds);
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
