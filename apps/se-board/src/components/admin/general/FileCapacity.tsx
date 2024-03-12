import { Box, Button, Divider, useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import {
  useGetFileConfigurationsQuery,
  usePostFileConfigurationsMutation,
} from "@/react-query/hooks/useFileQuery";

import { NumberCount } from "../NumberCount";

export const FileCapacity = () => {
  const { data } = useGetFileConfigurationsQuery();
  const { mutate, isLoading } = usePostFileConfigurationsMutation();

  const [capacity, setCapacity] = useState<number>(data?.maxSizePerFile || 100);
  const [perPostCapacity, setPerPostCapacity] = useState<number>(
    data?.maxSizePerPost || 100
  );

  const queryClient = useQueryClient();

  const toast = useToast();

  useEffect(() => {
    if (data) {
      setCapacity(data.maxSizePerFile);
      setPerPostCapacity(data.maxSizePerPost);
    }
  }, [data]);

  const onCapacityChange = (value: string) => {
    setCapacity(Number(value));
  };

  const onPerPostCapacityChange = (value: string) => {
    setPerPostCapacity(Number(value));
  };

  const onClick = () => {
    if (isNaN(capacity) || isNaN(perPostCapacity)) {
      alert("숫자만 입력 가능합니다.");
      return;
    }

    if (capacity > perPostCapacity) {
      alert("파일 용량 제한이 게시글 당 파일 용량 제한보다 작아야 합니다.");
      return;
    }

    mutate(
      { maxSizePerFile: capacity, maxSizePerPost: perPostCapacity },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["fileConfigurations"]);
          toast({
            title: "파일 용량 정책이 설정되었습니다.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        },
      }
    );
  };

  return (
    <Box my="16px">
      <Box>
        <NumberCount
          title="파일 용량 제한"
          alert="파일당 업로드 가능한 용량을 설정합니다. 최대 용량을 초과하면 업로드가 제한됩니다."
          unit="MB"
          count={capacity}
          setCount={onCapacityChange}
          min={1}
          max={100}
        />
        <Divider />
        <NumberCount
          title="게시글 당 파일 용량 제한"
          alert="게시글 당 업로드 가능한 용량을 설정합니다. 게시글에 업로드된 파일 용량의 합이 최대 용량을 초과하면 업로드가 제한됩니다."
          unit="MB"
          count={perPostCapacity}
          setCount={onPerPostCapacityChange}
          min={1}
          max={500}
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
  );
};
