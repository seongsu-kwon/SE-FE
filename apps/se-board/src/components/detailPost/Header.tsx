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
  useColorModeValue,
} from "@chakra-ui/react";
import { DateType } from "@types";
import { BsClock, BsFillEyeFill, BsPerson } from "react-icons/bs";

import { useBookmarked, useNavigatePage } from "@/hooks";
import { isModifiedContent, toYYYYMMDDHHhhss } from "@/utils/dateUtils";

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
    category: string;
    createdAt: DateType;
    modifiedAt: DateType;
    bookmarked: boolean;
    isEditable: boolean;
  };
}

const AuthorInfoMenuList = ({ id, name }: { id: string; name: string }) => {
  const { goToProfilePage } = useNavigatePage();

  return (
    <Menu autoSelect={false}>
      <MenuButton cursor={id ? "pointer" : "not-allowed"}>
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
      {!!id && (
        <MenuList maxW={{ base: "100px" }}>
          <MenuItem w="100%" onClick={() => goToProfilePage(id)}>
            프로필 보기
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );
};

export const Header = ({ HeadingInfo }: HeaderProps) => {
  const { isBookmarked, toggleBookmark } = useBookmarked(
    HeadingInfo.postId,
    HeadingInfo.bookmarked
  );

  const color = useColorModeValue("gray.7", "whiteAlpha.700");
  const borderColor = useColorModeValue("gray.3", "whiteAlpha.400");

  return (
    <Box paddingTop="56px">
      <Flex
        py="0.5rem"
        borderBottom={`1px solid`}
        borderColor={borderColor}
        color={color}
      >
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
      <Box borderBottom={`1px solid`} borderColor={borderColor}>
        <Box m="16px 0 16px 16px">
          <Heading
            size="lg"
            w="fit-content"
            wordBreak="keep-all"
            color={color}
          >{`[${HeadingInfo.category}] ${HeadingInfo.title}`}</Heading>
          <HStack mt="4px" spacing="12px" color={color}>
            <AuthorInfoMenuList
              id={HeadingInfo.author.loginId}
              name={HeadingInfo.author.name}
            />

            <Box display="flex" alignItems="baseline">
              <Icon as={BsClock} boxSize="16px" my="auto" />
              <Box ml="6px" fontSize="md">
                {toYYYYMMDDHHhhss(HeadingInfo.createdAt)}
              </Box>
              {isModifiedContent(
                HeadingInfo.createdAt,
                HeadingInfo.modifiedAt
              ) && (
                <Box ml="1px" fontSize="sm" color="gray.6">
                  (수정됨)
                </Box>
              )}
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
    HeadingInfo.postId,
    HeadingInfo.bookmarked
  );

  const color = useColorModeValue("gray.7", "whiteAlpha.700");
  const borderColor = useColorModeValue("gray.3", "whiteAlpha.400");

  return (
    <Box
      display="flex"
      w="100%"
      m="0px auto 0 auto"
      borderBottom={`1px solid`}
      borderColor={borderColor}
    >
      <Box p="1.5rem 0 1.5rem 1rem">
        <Heading
          as="h2"
          fontSize="1.625rem"
          w="fit-content"
          wordBreak="keep-all"
          color={color}
        >{`[${HeadingInfo.category}] ${HeadingInfo.title}`}</Heading>
        <HStack mt="8px" spacing="12px" color={color}>
          <AuthorInfoMenuList
            id={HeadingInfo.author.loginId}
            name={HeadingInfo.author.name}
          />
          <Box display="flex" alignItems="baseline">
            <Icon as={BsClock} boxSize="20px" my="auto" />
            <Box ml="6px" fontSize="lg">
              {toYYYYMMDDHHhhss(HeadingInfo.createdAt)}
            </Box>
            {isModifiedContent(
              HeadingInfo.createdAt,
              HeadingInfo.modifiedAt
            ) && (
              <Box ml="1px" fontSize="sm" color="gray.6">
                (수정됨)
              </Box>
            )}
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
      <Box display="flex" my="auto" color={color}>
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
