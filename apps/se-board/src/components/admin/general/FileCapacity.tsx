import { Box, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

import { NumberCount } from "../NumberCount";

export const FileCapacity = () => {
  const [capacity, setCapacity] = useState<number>(100);

  const onCapacityChange = (value: string) => {
    setCapacity(Number(value));
  };

  return (
    <Box my="16px">
      <Flex alignItems="end" justifyContent="space-between">
        <NumberCount
          title="파일 용량 제한"
          alert="파일 업로드 가능한 용량을 설정합니다. 최대 용량을 초과하면 업로드가 제한됩니다."
          unit="MB"
          count={capacity}
          setCount={onCapacityChange}
          min={1}
          max={1000}
        />
        <Button
          size="sm"
          variant="primary"
          onClick={() => {
            console.log(capacity);
          }}
        >
          등록
        </Button>
      </Flex>
    </Box>
  );
};
