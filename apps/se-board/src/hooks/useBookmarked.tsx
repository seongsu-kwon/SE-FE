import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

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
  } = useBookmarkDeleteMutation();
  const {
    isSuccess: enrollIsSuccess,
    isLoading: enrollIsLoading,
    isError: enrollIsError,
    mutate: bookmarkPostMutate,
  } = useBookmarkPostMutation();

  const toast = useToast();

  useEffect(() => {
    setIsBookmarked(bookmarked);
  }, [bookmarked]);

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
      bookmarkDeleteMutate(postId, {
        onSuccess: () => {
          toast({
            title: "북마크가 해제되었습니다.",
            status: "info",
            duration: 5000,
            isClosable: true,
          }) && setIsBookmarked(!isBookmarked);
        },
        onError: () => {
          toast({
            title: "북마크 해제에 실패했습니다.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        },
      });
    } else {
      bookmarkPostMutate(postId, {
        onSuccess: () => {
          toast({
            title: "북마크 되었습니다.",
            status: "info",
            duration: 5000,
            isClosable: true,
          }) && setIsBookmarked(!isBookmarked);
        },
        onError: () => {
          toast({
            title: "북마크에 실패했습니다.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        },
      });
    }
  };

  return { isBookmarked, toggleBookmark };
};
