import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";

interface NumberCountProps {
  title: string;
  unit: string;
  alert: string;
  count: number;
  setCount: (value: string) => void;
  min: number;
  max: number;
  onClick: () => void;
}

export const NumberCount = ({
  title,
  unit,
  alert,
  count,
  setCount,
  min,
  max,
  onClick,
}: NumberCountProps) => {
  return (
    <Box textAlign={{ base: "center", md: "left" }} py="0.5rem">
      <Text
        wordBreak="keep-all"
        w="fit-content"
        fontSize="md"
        fontWeight="semibold"
        mr={{ md: "1rem" }}
      >
        {title}
      </Text>
      <Alert
        status="info"
        variant="left-accent"
        my="0.5rem"
        py="0.25rem"
        px={{ base: "0.5rem", md: "0.75rem" }}
        w={{ md: "fit-content" }}
        textAlign="left"
        wordBreak="keep-all"
        fontSize="xs"
        flexGrow={1}
      >
        <AlertIcon />
        {alert}
      </Alert>
      <Flex alignItems="center">
        <NumberInput
          defaultValue={count}
          onChange={setCount}
          min={min}
          max={max}
          borderColor="gray.4"
          w={{ base: "12rem", md: "15rem" }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text fontSize="md" fontWeight="semibold" ml="0.5rem">
          {unit}
        </Text>
        <Button size="sm" variant="primary" ml="1rem" onClick={onClick}>
          등록
        </Button>
      </Flex>
    </Box>
  );
};
