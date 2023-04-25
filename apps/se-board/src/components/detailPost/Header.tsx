import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { BsClock, BsFillEyeFill, BsPerson } from "react-icons/bs";

import { useBookmarked } from "@/hooks";
import { openColors } from "@/styles";

import { BackButton } from "./BackButton";
import { Bookmark, BookmarkFill } from "./Bookmark";
import { PostMoreButton } from "./MoreButton";

interface HeaderProps {
  HeadingInfo: {
    postId: number;
    title: string;
    author: {
      loginId: string;
      name: string;
    };
    views: number;
    category: {
      mainCategory: string;
      subCategory: string;
    };
    createdAt: string;
    modifiedAt: string;
    contents: string;
    bookmarked: boolean;
    isEditable: boolean;
  };
}

const AuthorInfoMenuList = ({ name }: { name: string }) => {
  return (
    <Menu autoSelect={false}>
      <MenuButton>
        <Box display="flex" alignItems="center">
          <Icon
            as={BsPerson}
            boxSize={{ base: "20px", md: "24px" }}
            my="auto"
          />
          <Text
            ml="6px"
            fontSize={{ base: "md", md: "lg" }}
            whiteSpace="nowrap"
          >
            {name}
          </Text>
        </Box>
      </MenuButton>
      <MenuList maxW={{ base: "100px" }}>
        <MenuItem w="100%">작성글 보기</MenuItem>
      </MenuList>
    </Menu>
  );
};

export const Header = ({ HeadingInfo }: HeaderProps) => {
  const { isBookmarked, toggleBookmark } = useBookmarked(
    HeadingInfo.bookmarked
  );

  return (
    <Box>
      <Flex borderBottom={`1px solid ${openColors.gray[3]}`}>
        <BackButton />
        <Spacer />
        {!isBookmarked ? (
          <Bookmark toggleBookmark={toggleBookmark} />
        ) : (
          <BookmarkFill toggleBookmark={toggleBookmark} />
        )}
        <PostMoreButton
          postId={HeadingInfo.postId}
          isEditable={HeadingInfo.isEditable}
        />
      </Flex>
      <Box borderBottom={`1px solid ${openColors.gray[3]}`}>
        <Box m="16px 0 16px 16px">
          <Heading
            size="lg"
            w="fit-content"
          >{`[${HeadingInfo.category.subCategory}] ${HeadingInfo.title}`}</Heading>
          <HStack mt="4px" spacing="12px">
            <AuthorInfoMenuList name={HeadingInfo.author.name} />

            <Box display="flex">
              <Icon as={BsClock} boxSize="16px" my="auto" />
              <Box ml="6px" fontSize="md">
                {`${HeadingInfo.createdAt.split("-")[0]}.${
                  HeadingInfo.createdAt.split("-")[1]
                }.${HeadingInfo.createdAt.split("-")[2]}`}
              </Box>
            </Box>
            <Box display="flex">
              <Icon as={BsFillEyeFill} boxSize="18px" my="auto" />
              <Box ml="6px" fontSize="md">
                {HeadingInfo.views}
              </Box>
            </Box>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export const DesktopHeader = ({ HeadingInfo }: HeaderProps) => {
  const { isBookmarked, toggleBookmark } = useBookmarked(
    HeadingInfo.isEditable
  );

  return (
    <Box
      display="flex"
      w="100%"
      m="20px auto 0 auto"
      borderY={`1px solid ${openColors.gray[3]}`}
    >
      <Box m="16px 0 16px 16px">
        <Heading
          as="h2"
          size="lg"
          w="fit-content"
        >{`[${HeadingInfo.category.subCategory}] ${HeadingInfo.title}`}</Heading>
        <HStack mt="8px" spacing="12px">
          <AuthorInfoMenuList name={HeadingInfo.author.name} />
          <Box display="flex">
            <Icon as={BsClock} boxSize="20px" my="auto" />
            <Box ml="6px" fontSize="lg">
              {`${HeadingInfo.createdAt.split("-")[0]}.${
                HeadingInfo.createdAt.split("-")[1]
              }.${HeadingInfo.createdAt.split("-")[2]}`}
            </Box>
          </Box>
          <Box display="flex">
            <Icon as={BsFillEyeFill} boxSize="22px" my="auto" />
            <Box ml="6px" fontSize="lg">
              {HeadingInfo.views}
            </Box>
          </Box>
        </HStack>
      </Box>
      <Spacer />
      <Box display="flex" my="auto">
        {!isBookmarked ? (
          <Bookmark boxSize="32px" toggleBookmark={toggleBookmark} />
        ) : (
          <BookmarkFill boxSize="32px" toggleBookmark={toggleBookmark} />
        )}
        <PostMoreButton
          postId={HeadingInfo.postId}
          isEditable={HeadingInfo.isEditable}
        />
      </Box>
    </Box>
  );
};
