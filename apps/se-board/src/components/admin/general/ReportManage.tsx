import { Box, Button, Divider, Text, useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import {
  useGetReportThreshold,
  usePostReportThreshold,
} from "@/react-query/hooks/useReportQuery";

import { NumberCount } from "../NumberCount";

export const ReportManage = () => {
  const { data } = useGetReportThreshold();
  const { mutate, isLoading } = usePostReportThreshold();

  const [postCount, setPostCount] = useState<number>(data?.postThreshold || 5);
  const [commentCount, setCommentCount] = useState<number>(
    data?.commentThreshold || 5
  );

  const toast = useToast();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      setPostCount(data.postThreshold);
      setCommentCount(data.commentThreshold);
    }
  }, [data]);

  const onPostCountChange = (value: string) => {
    setPostCount(Number(value));
  };

  const onCommentCountChange = (value: string) => {
    setCommentCount(Number(value));
  };

  const onClick = () => {
    if (isNaN(postCount) || isNaN(commentCount)) {
      alert("숫자만 입력 가능합니다.");
      return;
    }

    mutate(
      { postThreshold: postCount, commentThreshold: commentCount },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["reportThreshold"]);
          toast({
            title: "신고 임계점이 설정되었습니다.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        },
      }
    );
  };

  return (
    <Box
      my="20px"
      bgColor="white"
      py="1rem"
      px={{ base: "0.75rem", md: "1rem" }}
      rounded="3xl"
    >
      <Text
        fontWeight="semibold"
        fontSize={{ base: "xl", md: "2xl" }}
        mb="20px"
        borderBottom="1px solid"
        borderColor="gray.5"
      >
        신고 임계점 관리
      </Text>
      <Box my="16px">
        <Box>
          <NumberCount
            title=""
            alert="게시글 신고 임계점을 설정합니다. 설정된 임계점을 초과하면 해당 게시물은 숨김 처리됩니다."
            unit="회"
            count={postCount}
            setCount={onPostCountChange}
            min={1}
            max={50}
          />
          <Divider />
          <NumberCount
            title=""
            alert="댓글 신고 임계점을 설정합니다. 설정된 임계점을 초과하면 해당 댓글은 숨김 처리됩니다."
            unit="회"
            count={commentCount}
            setCount={onCommentCountChange}
            min={1}
            max={50}
          />
        </Box>
        <Box w="full" textAlign="right" pr={{ base: "1rem", md: "1.5rem" }}>
          <Button
            size={{ base: "sm", md: "md" }}
            variant="primary"
            onClick={onClick}
            isLoading={isLoading}
          >
            등록
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
