import { Box, Flex, Heading, HStack, Icon, Spacer } from "@chakra-ui/react";
import { BsClock, BsFillEyeFill, BsPerson } from "react-icons/bs";

import { useBookmarked } from "@/hooks";
import { openColors } from "@/styles";

import { BackButton } from "./BackButton";
import { Bookmark, BookmarkFill } from "./Bookmark";
import { PostMoreButton } from "./MoreButton";

interface HeaderProps {
  HeadingInfo: {
    title: string;
    author: {
      login_id: string;
      name: string;
    };
    views: number;
    category: {
      main_category: string;
      sub_category: string;
    };
    created_at: string;
    contents: string;
    bookmarked: boolean;
    isEditable: boolean;
  };
}

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
        <PostMoreButton isEditable={HeadingInfo.isEditable} />
      </Flex>
      <Box borderBottom={`1px solid ${openColors.gray[3]}`}>
        <Box m="16px 0 16px 16px">
          <Heading
            size="lg"
            w="fit-content"
          >{`[${HeadingInfo.category.sub_category}] ${HeadingInfo.title}`}</Heading>
          <HStack mt="4px" spacing="12px">
            <Box display="flex">
              <Icon as={BsPerson} boxSize="20px" my="auto" />
              <Box ml="6px" fontSize="md">
                {HeadingInfo.author.name}
              </Box>
            </Box>
            <Box display="flex">
              <Icon as={BsClock} boxSize="16px" my="auto" />
              <Box ml="6px" fontSize="md">
                {`${HeadingInfo.created_at.split("-")[0]}.${
                  HeadingInfo.created_at.split("-")[1]
                }.${HeadingInfo.created_at.split("-")[2]}`}
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
    HeadingInfo.bookmarked
  );

  return (
    <Box
      display="flex"
      maxW="984px"
      m="120px auto 0 auto"
      borderY={`1px solid ${openColors.gray[3]}`}
    >
      <Box m="16px 0 16px 16px">
        <Heading
          as="h2"
          size="lg"
          w="fit-content"
        >{`[${HeadingInfo.category.sub_category}] ${HeadingInfo.title}`}</Heading>
        <HStack mt="8px" spacing="12px">
          <Box display="flex">
            <Icon as={BsPerson} boxSize="24px" my="auto" />
            <Box ml="6px" fontSize="lg">
              {HeadingInfo.author.name}
            </Box>
          </Box>
          <Box display="flex">
            <Icon as={BsClock} boxSize="20px" my="auto" />
            <Box ml="6px" fontSize="lg">
              {`${HeadingInfo.created_at.split("-")[0]}.${
                HeadingInfo.created_at.split("-")[1]
              }.${HeadingInfo.created_at.split("-")[2]}`}
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
        <PostMoreButton isEditable={HeadingInfo.isEditable} />
      </Box>
    </Box>
  );
};
