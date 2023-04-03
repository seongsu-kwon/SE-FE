import { Icon } from "@chakra-ui/react";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";

import { openColors } from "@/styles";

interface BookmarkProps {
  boxSize?: string;
  toggleBookmark: () => void;
}

export const Bookmark = ({ boxSize, toggleBookmark }: BookmarkProps) => {
  return (
    <Icon
      aria-label="북마크"
      as={BsBookmark}
      boxSize={boxSize || "24px"}
      my="auto"
      onClick={toggleBookmark}
    />
  );
};

export const BookmarkFill = ({ boxSize, toggleBookmark }: BookmarkProps) => {
  return (
    <Icon
      aria-label="북마크"
      as={BsFillBookmarkFill}
      boxSize={boxSize || "24px"}
      my="auto"
      onClick={toggleBookmark}
      color={openColors.blue[5]}
    />
  );
};
