import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import {
  useBookmarkDeleteMutation,
  useBookmarkPostMutation,
} from "@/react-query/hooks";

export const useBookmarked = (postId: number, bookmarked: boolean) => {
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
        onError: (error) => {
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
        onError: (error) => {
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
