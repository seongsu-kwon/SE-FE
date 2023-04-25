import { useToast } from "@chakra-ui/react";
import { useState } from "react";

export const useBookmarked = (isLoggined: boolean, bookmarked: boolean) => {
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const toast = useToast();

  const toggleBookmark = () => {
    if (!isLoggined) {
      toast({
        title: "로그인 후 이용해 주세요.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "북마크가 해제되었습니다." : "북마크 되었습니다.",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  return { isBookmarked, toggleBookmark };
};
