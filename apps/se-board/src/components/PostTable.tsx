import {
  Flex,
  Menu,
  MenuItem,
  MenuList,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { Icon, Text } from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import { PostListItem } from "@types";
import { BsLink45Deg, BsPinAngleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import { toYYMMDD_DOT } from "@/utils/dateUtils";
import { isRecentModifiedPost, isRecentPost } from "@/utils/postUtils";

import { NewIcon } from "./NewIcon";
import { UpdateIcon } from "./UpdateIcon";

const columnHelper = createColumnHelper<PostListItem>();

const columns: ColumnDef<PostListItem, any>[] = [
  columnHelper.accessor("number", {
    header: "번호",
    cell: (info) => {
      if (info.row.original.pined) {
        return <Icon as={BsPinAngleFill} color="primary" />;
      } else {
        return info.getValue();
      }
    },
  }),
  columnHelper.accessor("title", {
    header: "제목",
    cell: (info) => {
      const {
        commentSize,
        hasAttachment,
        pined,
        postId,
        createdDateTime,
        modifiedDateTime,
        category: { name },
      } = info.row.original;
      return (
        <Flex alignItems="center" gap="0.2rem">
          <Link to={`${postId}`}>
            <Text
              noOfLines={1}
              _hover={{
                textDecoration: "underline",
                textDecorationColor: "gray.6",
              }}
              fontWeight={pined ? "bold" : "normal"}
            >
              [{name}] {info.getValue()}
            </Text>
          </Link>
          <Text color={"orange.5"}>[{commentSize}]</Text>
          {hasAttachment && <Icon as={BsLink45Deg} ml="0.25rem" />}
          {isRecentPost(createdDateTime) ? (
            <NewIcon />
          ) : isRecentModifiedPost(createdDateTime, modifiedDateTime) ? (
            <UpdateIcon />
          ) : null}
        </Flex>
      );
    },
  }),
  columnHelper.accessor("author.name", {
    header: "작성자",
    cell: (info) => (
      <Flex justifyContent="flex-start">
        <Menu autoSelect={false}>
          {/* <MenuButton> */}
          <Text whiteSpace="nowrap" textAlign="left">
            {info.getValue()}
          </Text>
          {/* </MenuButton> */}
          <MenuList>
            <MenuItem>작성글 보기</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    ),
  }),
  columnHelper.accessor("createdDateTime", {
    header: "작성일",
    cell: (info) => toYYMMDD_DOT(info.getValue()),
  }),
  columnHelper.accessor("views", {
    header: "조회수",
    cell: (info) => info.getValue(),
  }),
];

const columnWidth = ["10%", "60%", "10%", "10%", "10%"];

interface PostTableProps {
  data: PostListItem[];
}

export const PostTable = ({ data }: PostTableProps) => {
  const table = useReactTable<PostListItem>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const titleColor = useColorModeValue("gray.7", "whiteAlpha.800");
  const borderColor = useColorModeValue("gray.3", "whiteAlpha.400");
  const pinnedBgColor = useColorModeValue("gray.1", "whiteAlpha.200");

  return (
    <ChakraTable>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header, i) => (
              <Th
                key={header.id}
                w={columnWidth[i]}
                fontSize="md"
                textAlign="center"
                borderColor={borderColor}
                whiteSpace="nowrap"
                color={titleColor}
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
        {table.getRowModel().rows.map((row, i) => (
          <Tr
            key={i}
            bgColor={row.original.pined ? pinnedBgColor : "transparent"}
            fontSize="sm"
            color={titleColor}
          >
            {row.getVisibleCells().map((cell, i) => (
              <Td
                key={cell.id}
                w={columnWidth[i]}
                textAlign={cell.column.id === "title" ? "left" : "center"}
                borderColor={borderColor}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </ChakraTable>
  );
};
