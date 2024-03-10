import { Box, Button, Divider, Text, useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import {
  useGetLoginPolicyQuery,
  usePostLoginPolicyMutation,
} from "@/react-query/hooks/useLoginPolicy";

import { NumberCount } from "../NumberCount";

const alerts = {
  loginBan: "로그인 시도 횟수를 초과하면 일정 시간동안 로그인이 제한됩니다.",
  loginBanTime:
    "로그인 시도 횟수를 초과하면 로그인이 제한되는 시간을 설정합니다. 제한 시간은 마지막 로그인 시도 기준입니다.",
};

export const LoginPolicy = () => {
  const [count, setCount] = useState<number>(0);
  const [time, setTime] = useState<number>(0);

  const { data } = useGetLoginPolicyQuery();
  const { mutate } = usePostLoginPolicyMutation();

  const toast = useToast();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      setCount(data.loginTryCount);
      setTime(data.loginLimitTime);
    }
  }, [data]);

  const onCountChange = (value: string) => {
    setCount(Number(value));
  };

  const onTimeChange = (value: string) => {
    setTime(Number(value));
  };

  const onClick = () => {
    mutate(
      { loginLimitTime: time, loginTryCount: count },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["loginPolicy"]);
          toast({
            title: "로그인 정책이 설정되었습니다.",
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
      mt="20px"
      bgColor="white"
      py="1rem"
      px={{ base: "0.75rem", md: "1rem" }}
      rounded="3xl"
    >
      <Text
        fontWeight="semibold"
        fontSize={{ base: "xl", md: "2xl" }}
        mb="10px"
        borderBottom="1px solid"
        borderColor="gray.5"
      >
        로그인 정책
      </Text>
      <Box mt="1rem">
        <NumberCount
          title="로그인 시도 횟수 제한"
          unit="회"
          alert={alerts.loginBan}
          count={count}
          setCount={onCountChange}
          min={0}
          max={30}
        />
        <Divider />
        <NumberCount
          title="로그인 시도 횟수 제한 시간"
          unit="초"
          alert={alerts.loginBanTime}
          count={time}
          setCount={onTimeChange}
          min={0}
          max={3600}
        />
      </Box>
      <Box w="full" textAlign="right" pr={{ base: "1rem", md: "1.5rem" }}>
        <Button
          size={{ base: "sm", md: "md" }}
          variant="primary"
          onClick={onClick}
        >
          등록
        </Button>
      </Box>
    </Box>
  );
};
