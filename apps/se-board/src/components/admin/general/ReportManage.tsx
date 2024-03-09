import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

import { NumberCount } from "../NumberCount";

export const ReportManage = () => {
  const [count, setCount] = useState<number>(5);

  const onCountChange = (value: string) => {
    setCount(Number(value));
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
        <Flex alignItems="end" justifyContent="space-between">
          <NumberCount
            title=""
            alert="신고 임계점을 설정합니다. 설정된 임계점을 초과하면 해당 게시물 또는 댓글은 숨김 처리됩니다."
            unit="회"
            count={count}
            setCount={onCountChange}
            min={5}
            max={100}
            onClick={() => {
              console.log(count);
            }}
          />
        </Flex>
      </Box>
    </Box>
  );
};
