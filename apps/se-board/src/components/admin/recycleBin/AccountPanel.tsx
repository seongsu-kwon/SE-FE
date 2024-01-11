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
import { AccountContent, DeletedAccounts } from "@types";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import { BsClockHistory, BsTrash3 } from "react-icons/bs";

import { Pagination } from "@/components";
import { useNavigatePage } from "@/hooks";
import { useRecycleBinParams } from "@/hooks/useRecycleBinParams";
import {
  useGetDeleteAccountsQuery,
  usePermanentlyDeleteAccountsQuery,
  usePostRestoreAccountsQuery,
} from "@/react-query/hooks/useAccountQuery";
import { toYYMMDD_DOT } from "@/utils/dateUtils";

const columnWidth = {
  base: ["4rem", "4rem", "4rem", "6rem", "8rem"],
  md: ["6rem", "6rem", "6rem", "8rem", "10rem"],
};

export const AccountPanel = () => {
  const columnHelper = createColumnHelper<AccountContent>();

  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const [checkBoxes, setCheckBoxes] = useState<boolean[]>([]);
  const [accounts, setAccounts] = useState<DeletedAccounts>();

  const { page, setPageSearchParam } = useRecycleBinParams();

  const { data, refetch } = useGetDeleteAccountsQuery(page, 25);
  const { mutate: restoreMutate, isLoading: restoreIsLoading } =
    usePostRestoreAccountsQuery();
  const { mutate: deleteMutate, isLoading: deleteIsLoading } =
    usePermanentlyDeleteAccountsQuery();

  const { goToProfilePage } = useNavigatePage();

  useEffect(() => {
    setCheckBoxes(Array(data?.content.length).fill(false));
    setAccounts(data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [page]);

  const columns = useMemo<ColumnDef<AccountContent, any>[]>(
    () => [
      columnHelper.accessor("accountId", {
        header: "아이디",
        cell: (info) => {
          return <Text>{info.row.original.accountId}</Text>;
        },
      }),
      columnHelper.accessor("name", {
        header: "이름",
        cell: (info) => {
          return (
            <Text
              color="blue.7"
              onClick={() => goToProfilePage(info.row.original.loginId)}
            >
              {info.row.original.name}
            </Text>
          );
        },
      }),
      columnHelper.accessor("nickname", {
        header: "닉네임",
        cell: (info) => {
          return <Text>{info.row.original.nickname}</Text>;
        },
      }),
      columnHelper.accessor("registeredDate", {
        header: "가입일",
        cell: (info) => {
          return <Text>{toYYMMDD_DOT(info.row.original.registeredDate)}</Text>;
        },
      }),
      columnHelper.accessor("authorities", {
        header: "회원그룹",
        cell: (info) => {
          return (
            <Box>
              {info.row.original.authorities.map((v) => {
                return <Text>{v.authority}</Text>;
              })}
            </Box>
          );
        },
      }),
    ],
    []
  );

  const table = useReactTable<AccountContent>({
    data: accounts?.content || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onAllCheckClick = () => {
    setIsAllChecked(!isAllChecked);
    setCheckBoxes(checkBoxes.map(() => !isAllChecked));

    if (!isAllChecked) {
      // 체크박스가 모두 체크되어있는 상태
      setCheckedList(
        accounts?.content.map((account) => account.accountId) || []
      );
    } else {
      setCheckedList([]);
    }
  };

  const onCheckClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    accountId: number
  ) => {
    const isChecked = e.target.checked;
    setCheckBoxes((prev) =>
      prev.map((checkbox, i) => (i === index ? isChecked : checkbox))
    );
    setCheckedList((prev) => {
      if (isChecked) {
        return [...prev, accountId];
      } else {
        return prev.filter((v) => v !== accountId);
      }
    });

    if (isChecked && checkedList.length + 1 === accounts?.content.length) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  };

  const onRestoreClick = () => {
    if (checkedList.length === 0) return alert("복원할 계정을 선택해주세요.");

    restoreMutate(
      { accountIds: checkedList },
      {
        onSuccess: () => {
          setCheckedList([]);
          setIsAllChecked(false);
          setCheckBoxes(Array(accounts?.content.length).fill(false));
          refetch();
        },
      }
    );
  };

  const onDeleteClick = () => {
    if (checkedList.length === 0) return alert("삭제할 계정을 선택해주세요.");

    deleteMutate(
      { accountIds: checkedList },
      {
        onSuccess: () => {
          setCheckedList([]);
          setIsAllChecked(false);
          setCheckBoxes(Array(accounts?.content.length).fill(false));
          refetch();
        },
      }
    );
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
                    onChange={(e) => onCheckClick(e, i, row.original.accountId)}
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
          currentPage={accounts?.pageable.pageNumber || 0}
          totalPage={accounts?.totalPages || 1}
          onChangePage={(page: number) => {
            setPageSearchParam(page);
            window.scrollTo(0, 0);
          }}
        />
      </Flex>
    </Box>
  );
};
