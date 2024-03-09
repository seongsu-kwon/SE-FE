import { Box, Button, Divider, Text } from "@chakra-ui/react";
import { useState } from "react";

import { NumberCount } from "../NumberCount";

const data = {
  loginBan: 5,
  loginBanTime: 300,
};

const alerts = {
  loginBan: "로그인 시도 횟수를 초과하면 일정 시간동안 로그인이 제한됩니다.",
  loginBanTime:
    "로그인 시도 횟수를 초과하면 로그인이 제한되는 시간을 설정합니다. 제한 시간은 마지막 로그인 시도 기준입니다.",
};

export const LoginPolicy = () => {
  const [count, setCount] = useState<number>(data.loginBan);
  const [time, setTime] = useState<number>(data.loginBanTime);

  const onCountChange = (value: string) => {
    setCount(Number(value));
  };

  const onTimeChange = (value: string) => {
    setTime(Number(value));
  };

  const onClick = () => {
    // TODO: enroll Request
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
        로그인
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
          onClick={() => {
            console.log(count);
          }}
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
          onClick={() => {
            console.log(time);
          }}
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
