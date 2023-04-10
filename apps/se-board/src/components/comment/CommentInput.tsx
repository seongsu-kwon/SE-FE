import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

import { openColors } from "@/styles";

export const CommentInput = () => {
  const [isFocus, setIsFocus] = useState(true);
  const [value, setValue] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSecret, setIsSecret] = useState(false);
  const [secretPassword, setSecretPassword] = useState("");

  return (
    <Box w={{ md: "fit-content" }} mx="auto">
      {isFocus && (
        <Box
          display={{ md: "none" }}
          position={{ base: "fixed" }}
          h="40px"
          w="100%"
          bottom="80px"
          borderY="1px solid"
          borderColor={openColors.gray[4]}
          backgroundColor={openColors.white}
        >
          <FormControl
            display="flex"
            h="100%"
            w="fit-content"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" mr="12px">
              <FormLabel htmlFor="anonymous" mb="0" mr="4px" minW="36px">
                익명
              </FormLabel>
              <Switch
                id="anonymous"
                mt="3px"
                onChange={() => {
                  setIsAnonymous(!isAnonymous);
                }}
              />
            </Box>
            <Box display="flex" alignItems="center">
              <FormLabel htmlFor="secret" mb="0" mr="4px" minW="48px">
                비밀글
              </FormLabel>
              <Switch
                id="secret"
                mt="3px"
                onChange={() => setIsSecret(!isSecret)}
              />
              <Input
                placeholder="비밀글 비밀번호"
                _placeholder={{ fontSize: "10px" }}
                value={secretPassword}
                onChange={(e) => setSecretPassword(e.target.value)}
                visibility={isSecret ? "visible" : "hidden"}
                minW="100px"
                w="120px"
                ml="4px"
                size="sm"
              />
            </Box>
            <Button variant="primary" size="sm">
              등록
            </Button>
          </FormControl>
        </Box>
      )}
      <Textarea
        placeholder="댓글을 입력해주세요."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        position={{ base: "fixed", md: "static" }}
        bottom="0"
        h={{ md: "100px" }}
        width={{ base: "100%", md: "784px" }}
        borderRadius={{ base: "0", md: "10px" }}
        my={{ md: "10px" }}
        bgColor={{ base: openColors.white }}
        focusBorderColor={openColors.blue[5]}
        onFocus={() => {
          setIsFocus(true);
        }}
        // onBlur={() => {
        //   setIsFocus(false);
        // }}
      />
    </Box>
  );
};
