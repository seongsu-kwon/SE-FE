import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import {
  BsClock,
  BsExclamationCircle,
  BsFillEyeFill,
  BsPencilSquare,
  BsPerson,
  BsShare,
  BsTrash3,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { useBookmarked } from "@/hooks";
import { openColors } from "@/styles";

import { BackButton } from "./BackButton";
import { Bookmark, BookmarkFill } from "./Bookmark";
import { MoreButton } from "./MoreButton";

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
    isEditalbe: boolean;
  };
}

export const Header = ({ HeadingInfo }: HeaderProps) => {
  const { isBookmarked, toggleBookmark } = useBookmarked(
    HeadingInfo.bookmarked
  );

  const menuItems = [
    { name: "수정", onClick: () => {}, isWriter: false, icon: BsPencilSquare },
    { name: "삭제", onClick: () => {}, isWriter: false, icon: BsTrash3 },
    {
      name: "공유",
      onClick: () => {
        const toast = useToast();
        const url = window.location.href;

        try {
          navigator.clipboard.writeText(url);
          toast({
            title: "URL이 복사되었습니다.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        } catch (err) {
          alert("URL 복사에 실패했습니다.");
        }
      },
      isWriter: true,
      icon: BsShare,
    },
    {
      name: "신고",
      onClick: () => {},
      isWriter: false,
      icon: BsExclamationCircle,
    },
  ];

  const modificationOnClick = () => {
    const navigate = useNavigate();

    navigate("url", {
      state: {
        header: HeadingInfo.title,
        contents: HeadingInfo.contents,
        files: [],
      },
    });
  };

  if (HeadingInfo.isEditalbe) {
    menuItems[0].isWriter = true;
    menuItems[0].onClick = modificationOnClick;
    menuItems[1].isWriter = true;
  }

  if (HeadingInfo.author.login_id === "anonymous") {
    menuItems[3].isWriter = false;
  }

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
        <MoreButton menuItems={menuItems} />
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

  const toast = useToast();

  const menuItems = [
    { name: "수정", onClick: () => {}, isWriter: false, icon: BsPencilSquare },
    { name: "삭제", onClick: () => {}, isWriter: false, icon: BsTrash3 },
    {
      name: "공유",
      onClick: () => {
        const url = window.location.href;

        try {
          navigator.clipboard.writeText(url);
          toast({
            title: "URL이 복사되었습니다.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        } catch (err) {
          toast({
            title: "URL 복사에 실패했습니다.",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      },
      isWriter: true,
      icon: BsShare,
    },
    {
      name: "신고",
      onClick: () => {},
      isWriter: false,
      icon: BsExclamationCircle,
    },
  ];

  const modificationOnClick = () => {
    const navigate = useNavigate();

    navigate("url", {
      state: {
        header: HeadingInfo.title,
        contents: HeadingInfo.contents,
        files: [],
      },
    });
  };

  if (HeadingInfo.isEditalbe) {
    menuItems[0].isWriter = true;
    menuItems[0].onClick = modificationOnClick;
    menuItems[1].isWriter = true;
  }

  if (HeadingInfo.author.login_id === "anonymous") {
    menuItems[3].isWriter = false;
  }

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
        <MoreButton fontSize="32px" menuItems={menuItems} />
      </Box>
    </Box>
  );
};
