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
    isSuccess: deleteIsSuccess,
    isLoading: deleteIsLoading,
    isError: deleteIsError,
    mutate: bookmarkDeleteMutate,
  } = useBookmarkDeleteMutation(postId);
  const {
    isSuccess: enrollIsSuccess,
    isLoading: enrollIsLoading,
    isError: enrollIsError,
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

    if (isBookmarked) {
      // 북마크 해제
      bookmarkDeleteMutate();

      deleteIsSuccess &&
        toast({
          title: "북마크가 해제되었습니다.",
          status: "info",
          duration: 5000,
          isClosable: true,
        }) &&
        setIsBookmarked(!isBookmarked);

      deleteIsError &&
        toast({
          title: "북마크 해제에 실패했습니다.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
    } else {
      bookmarkPostMutate();

      enrollIsSuccess &&
        toast({
          title: "북마크 되었습니다.",
          status: "info",
          duration: 5000,
          isClosable: true,
        }) &&
        setIsBookmarked(!isBookmarked);

      enrollIsError &&
        toast({
          title: "북마크에 실패했습니다.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
    }
  };

  return { isBookmarked, toggleBookmark };
};
