import { useToast } from "@chakra-ui/react";
import { useState } from "react";

import {
  useBookmarkDeleteMutation,
  useBookmarkPostMutation,
} from "@/react-query/hooks";

export const useBookmarked = (
  postId: number,
  isLoggined: boolean,
  bookmarked: boolean
) => {
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const {
    data: deleteData,
    isLoading: deleteIsLoading,
    isError: deleteIsError,
    mutate: bookmarkDeleteMutate,
  } = useBookmarkDeleteMutation(postId);
  const {
    data: postData,
    isLoading: postIsLoading,
    isError: postIsError,
    mutate: bookmarkPostMutate,
  } = useBookmarkPostMutation(postId);

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
    }); // TODO: 성공 후 로직으로 들어가야 함

    if (isBookmarked) {
      // 북마크 해제
      bookmarkDeleteMutate();
      console.log("deleted!");
    } else {
      bookmarkPostMutate();
      console.log("posted!");
    }
  };

  return { isBookmarked, toggleBookmark };
};
