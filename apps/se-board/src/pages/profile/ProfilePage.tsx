import {
  Avatar,
  Button,
  Flex,
  Icon,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { IconType } from "react-icons";
import {
  BsBookmark,
  BsChatLeftText,
  BsCheckLg,
  BsChevronRight,
  BsFileText,
  BsKey,
  BsPencil,
} from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { useFetchUserProfile } from "@/react-query/hooks/useProfile";
import { userState } from "@/store/user";

import { PageNotFound } from "../PageNotFound";

export const ProfilePage = () => {
  const [nicknameChangeModalOpen, setNicknameChangeModalOpen] = useState(false);
  const userInfo = useRecoilValue(userState);
  const { userId } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { data, isError, isLoading } = useFetchUserProfile(userId!);

  const bgColor = useColorModeValue("gray.0", "#1A202C");
  const cardBgColor = useColorModeValue("white", "whiteAlpha.50");
  const titleColor = useColorModeValue("gray.7", "whiteAlpha.800");
  const subColor = useColorModeValue("gray.7", "whiteAlpha.800");
  const borderColor = useColorModeValue("gray.2", "whiteAlpha.400");

  const onClickKumohCertification = () => {
    if (userInfo.roles.includes("금오인")) {
      toast({
        title: "이미 금오인 입니다",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } else {
      navigate("/profile/kumoh-certification");
    }
  };

  if (isError) return <PageNotFound />;

  return (
    <>
      <Flex
        justifyContent="center"
        position="relative"
        zIndex={0}
        w="full"
        minH={{ base: "100vh", md: "calc(100vh - 59px)" }}
        bg={bgColor}
      >
        <Flex
          direction="column"
          maxW="container.sm"
          w="full"
          pt={{ base: "calc(56px + 1rem)", md: "1rem" }}
          px={{ base: 0, md: "1rem" }}
        >
          {isLoading ? (
            <Flex w="full" direction="column">
              <Skeleton height="6rem" w="full" />
              <Stack mt="1rem" w="full">
                <Skeleton height="4rem" w="full" />
                <Skeleton height="4rem" w="full" />
                <Skeleton height="4rem" w="full" />
                <Skeleton height="4rem" w="full" />
                <Skeleton height="4rem" w="full" />
                <Skeleton height="4rem" w="full" />
              </Stack>
            </Flex>
          ) : (
            <>
              <Flex
                w="full"
                bg={cardBgColor}
                py="1rem"
                px="1rem"
                border="1px"
                borderColor={borderColor}
                borderRadius={3}
              >
                <Flex gap="1rem" alignItems="center">
                  <Avatar size="lg" />
                  <Flex direction="column">
                    <Flex alignItems="center">
                      <Text
                        fontSize={{ base: "1.25rem", sm: "1.5rem" }}
                        fontWeight="bold"
                        mr="0.5rem"
                        color={titleColor}
                      >
                        {data?.nickname}
                      </Text>
                      {userInfo.email === userId && (
                        <Icon
                          onClick={() => navigate("/profile/edit")}
                          as={BsPencil}
                          boxSize={{ base: "0.875rem", sm: "1rem" }}
                          _hover={{ cursor: "pointer" }}
                        />
                      )}
                    </Flex>
                    <Text color={subColor}>{userId}</Text>
                    <Text color={subColor}>{userInfo.roles.join(" ")}</Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex
                direction="column"
                mt="1rem"
                bg={cardBgColor}
                border="1px"
                borderColor={borderColor}
                borderRadius={3}
                _hover={{ cursor: "pointer" }}
              >
                {/* 작성한 글 */}
                <Flex
                  onClick={() => navigate("posts")}
                  alignItems="center"
                  w="full"
                  py="1rem"
                  px="1rem"
                  color={titleColor}
                >
                  <Icon
                    as={BsFileText}
                    boxSize={{ base: "1rem", sm: "1.25rem" }}
                    mr="1rem"
                  />
                  <Text
                    fontSize={{ base: "1rem", sm: "1.25rem" }}
                    fontWeight="bold"
                  >
                    작성한 글
                  </Text>
                  <Text
                    fontSize={{ base: "1rem", sm: "1.25rem" }}
                    fontWeight="bold"
                    color="primary"
                    ml="1rem"
                  >
                    {data?.postCount || 0}
                  </Text>
                  <Icon
                    as={BsChevronRight}
                    boxSize={{ base: "1rem", sm: "1.25rem" }}
                    ml="auto"
                  />
                </Flex>
                {/* 작성한 댓글 */}
                <Flex
                  onClick={() => navigate("comments")}
                  alignItems="center"
                  w="full"
                  py="1rem"
                  px="1rem"
                  color={titleColor}
                >
                  <Icon
                    as={BsChatLeftText}
                    boxSize={{ base: "1rem", sm: "1.25rem" }}
                    mr="1rem"
                  />
                  <Text
                    fontSize={{ base: "1rem", sm: "1.25rem" }}
                    fontWeight="bold"
                  >
                    작성한 댓글
                  </Text>
                  <Text
                    fontSize={{ base: "1rem", sm: "1.25rem" }}
                    fontWeight="bold"
                    color="primary"
                    ml="1rem"
                  >
                    {data?.commentCount || 0}
                  </Text>
                  <Icon
                    as={BsChevronRight}
                    boxSize={{ base: "1rem", sm: "1.25rem" }}
                    ml="auto"
                  />
                </Flex>
                {userInfo.userId === Number(userId) && (
                  <>
                    {/* 북마크 */}
                    <Flex
                      onClick={() => navigate("/profile/bookmark")}
                      alignItems="center"
                      w="full"
                      py="1rem"
                      px="1rem"
                      color={titleColor}
                    >
                      <Icon
                        as={BsBookmark}
                        boxSize={{ base: "1rem", sm: "1.25rem" }}
                        mr="1rem"
                      />
                      <Text
                        fontSize={{ base: "1rem", sm: "1.25rem" }}
                        fontWeight="bold"
                      >
                        북마크
                      </Text>
                      <Text
                        fontSize={{ base: "1rem", sm: "1.25rem" }}
                        fontWeight="bold"
                        color="primary"
                        ml="1rem"
                      >
                        {data?.bookmarkCount || 0}
                      </Text>
                      <Icon
                        as={BsChevronRight}
                        boxSize={{ base: "1rem", sm: "1.25rem" }}
                        ml="auto"
                      />
                    </Flex>
                    {/* 알림 설정 */}
                    {/* <Flex
                      onClick={() => navigate("/profile/notification/setting")}
                      alignItems="center"
                      w="full"
                      py="1rem"
                      px="1rem"
                      color="gray.7"
                    >
                      <Icon
                        as={BsBell}
                        boxSize={{ base: "1rem", sm: "1.25rem" }}
                        mr="1rem"
                      />
                      <Text
                        fontSize={{ base: "1rem", sm: "1.25rem" }}
                        fontWeight="bold"
                      >
                        알림 설정
                      </Text>
                      <Icon
                        as={BsChevronRight}
                        boxSize={{ base: "1rem", sm: "1.25rem" }}
                        ml="auto"
                      />
                    </Flex> */}
                    {/* 비밀번호 변경 */}
                    <Flex
                      onClick={() => navigate("/profile/password/edit")}
                      alignItems="center"
                      w="full"
                      py="1rem"
                      px="1rem"
                      color={titleColor}
                    >
                      <Icon
                        as={BsKey}
                        boxSize={{ base: "1rem", sm: "1.25rem" }}
                        mr="1rem"
                      />
                      <Text
                        fontSize={{ base: "1rem", sm: "1.25rem" }}
                        fontWeight="bold"
                      >
                        비밀번호 변경
                      </Text>
                      <Icon
                        as={BsChevronRight}
                        boxSize={{ base: "1rem", sm: "1.25rem" }}
                        ml="auto"
                      />
                    </Flex>
                    {/* 금오인 인증 */}
                    <Flex
                      onClick={onClickKumohCertification}
                      alignItems="center"
                      w="full"
                      py="1rem"
                      px="1rem"
                      color={titleColor}
                    >
                      <Icon
                        as={BsCheckLg}
                        boxSize={{ base: "1rem", sm: "1.25rem" }}
                        mr="1rem"
                      />
                      <Text
                        fontSize={{ base: "1rem", sm: "1.25rem" }}
                        fontWeight="bold"
                      >
                        금오인 인증
                      </Text>
                      <Icon
                        as={BsChevronRight}
                        boxSize={{ base: "1rem", sm: "1.25rem" }}
                        ml="auto"
                      />
                    </Flex>
                  </>
                )}
              </Flex>
              <Button
                onClick={() => navigate("/profile/withdrawal")}
                variant="link"
                w="max"
                p="1rem"
                fontSize="14px"
                fontWeight="normal"
              >
                회원탈퇴
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
};

const Menu = ({
  icon,
  title,
  onClick,
  rightElement,
}: {
  icon: IconType;
  title: string;
  onClick: () => void;
  rightElement?: ReactNode;
}) => {
  return (
    <Flex
      onClick={onClick}
      alignItems="center"
      w="full"
      py="1rem"
      px="1rem"
      color="gray.7"
    >
      <Icon as={icon} boxSize={{ base: "1rem", sm: "1.25rem" }} mr="1rem" />
      <Text fontSize={{ base: "1rem", sm: "1.25rem" }} fontWeight="bold">
        {title}
      </Text>
      {rightElement}
      <Icon
        as={BsChevronRight}
        boxSize={{ base: "1rem", sm: "1.25rem" }}
        ml="auto"
      />
    </Flex>
  );
};
