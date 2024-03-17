import {
  Box,
  Checkbox,
  Flex,
  IconButton,
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
  useReactTable,
} from "@tanstack/react-table";
import { AdminMember, Role } from "@types";
import { useEffect, useMemo } from "react";
import { BsPencil, BsThreeDots, BsTrash3 } from "react-icons/bs";

import { toYYMMDD_DOT } from "@/utils/dateUtils";

interface AdminMemberTableProps {
  members?: AdminMember[];
  setSelectedMemberIds: (ids: number[]) => void;
  onClickEdit: (member: AdminMember) => void;
}
export const AdminMemberTable = ({
  members,
  setSelectedMemberIds,
  onClickEdit,
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
        accessorFn: (row) => row.registeredDate,
        header: "가입일",
        cell: (info) => (
          <Text textAlign="center" noOfLines={1}>
            {toYYMMDD_DOT(info.getValue<string>())}
          </Text>
        ),
      },
      {
        accessorFn: (row) => row.roles,
        header: "권한",
        cell: (info) => (
          <Text textAlign="center" noOfLines={1}>
            {info
              .getValue<Role[]>()
              .map((v) => v.alias)
              .join(", ")}
          </Text>
        ),
      },
      {
        id: "actions",
        header: "관리",
        cell: (props) => (
          <Flex justify="center">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<BsThreeDots />}
                variant="ghost"
              />
              <MenuList>
                <MenuItem
                  icon={<BsPencil />}
                  onClick={() => onClickEdit(props.row.original)}
                >
                  수정
                </MenuItem>
                <MenuItem
                  icon={<BsTrash3 />}
                  _hover={{
                    backgroundColor: "red.7",
                    color: "white",
                  }}
                >
                  삭제
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
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
                  <Td key={cell.id} py="0.25rem">
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
