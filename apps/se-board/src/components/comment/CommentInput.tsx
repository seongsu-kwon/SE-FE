import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  ScaleFade,
  Switch,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { openColors } from "@/styles";

interface CommentInputProps {
  replyInputRef: React.MutableRefObject<HTMLTextAreaElement | null>;
}

export const CommentInput = ({ replyInputRef }: CommentInputProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const [value, setValue] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSecret, setIsSecret] = useState(false);
  const [secretPassword, setSecretPassword] = useState("");

  return (
    <Box
      display={{ base: "inline-block", md: "inline-block" }}
      w={{ base: "100%", md: "784px" }}
      pb={{ md: "8px" }}
      position="relative"
      zIndex="200"
    >
      <Box
        position={{ base: "fixed", md: "static" }}
        bottom="0"
        w={{ base: "85%", md: "784px" }}
        bgColor={openColors.white}
      >
        <Textarea
          placeholder="댓글을 입력해주세요."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          minH="50px"
          h={{ md: "120px" }}
          borderRadius={{ base: "0", md: "8px" }}
          border={{ base: "none", md: `1px solid ${openColors.gray[5]}` }}
          focusBorderColor={openColors.blue[5]}
          my={{ md: "10px" }}
          ref={replyInputRef}
        />
      </Box>
      <Box
        display="flex"
        position={{ base: "fixed", md: "static" }}
        bottom="0"
        right="0"
        w={{ base: "15%", md: "fit-content" }}
        h={{ base: "61px", md: "fit-content" }}
        ml={{ md: "20px" }}
        bgColor={openColors.white}
        alignItems="center"
        justifyContent={{ base: "center", md: "right" }}
        float={{ md: "right" }}
      >
        <Button
          my={{ base: "auto", md: "0" }}
          mx={{ base: "auto", md: "0" }}
          variant="primary"
          size={{ base: "sm", md: "md" }}
        >
          등록
        </Button>
      </Box>
      <Box
        display="flex"
        position={{ base: "fixed", md: "static" }}
        bottom="60px"
        w={{ base: "100%", md: "fit-content" }}
        h={{ base: "fit-content" }}
        minH={{ base: "40px" }}
        borderY={{ base: `1px solid ${openColors.gray[3]}`, md: "none" }}
        bgColor={openColors.white}
        alignItems="center"
        float={{ md: "right" }}
      >
        <FormControl
          display="flex"
          alignItems="center"
          h="100%"
          ml={{ base: "12px", md: "0" }}
          flexWrap="wrap"
          justifyContent={{ md: "right" }}
        >
          <Box
            display="flex"
            alignItems="center"
            mr={{ base: "6px", sm: "12px" }}
          >
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
            <FormLabel htmlFor="secret" mb="0" mr="4px" minW="64px">
              비밀댓글
            </FormLabel>
            <Switch
              id="secret"
              mt="3px"
              onChange={() => {
                setIsSecret(!isSecret);
              }}
            />
          </Box>
          <ScaleFade initialScale={0.6} in={isSecret}>
            <Input
              type="password"
              placeholder="비밀글 비밀번호"
              _placeholder={{ fontSize: "12px" }}
              value={secretPassword}
              onChange={(e) => setSecretPassword(e.target.value)}
              display={isSecret ? "block" : "none"}
              minW="100px"
              w="150px"
              ml="4px"
              my={{ base: "2px", md: "0" }}
              size="sm"
            />
          </ScaleFade>
        </FormControl>
      </Box>
    </Box>
  );
};
