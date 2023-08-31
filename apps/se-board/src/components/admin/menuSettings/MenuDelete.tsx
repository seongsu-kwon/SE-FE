import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useRecoilValue } from "recoil";

import {
  useDeleteCategory,
  usePostMoveCategory,
} from "@/react-query/hooks/useMenu";
import { boardMenuListState } from "@/store/menu";
import { semanticColors } from "@/styles";

interface MenuDeleteProps {
  menuType: string | undefined;
  menuId: number | undefined;
}

export const MenuDelete = ({ menuType, menuId }: MenuDeleteProps) => {
  const boardMenuList = useRecoilValue(boardMenuListState);
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    mutate: moveMutate,
    isLoading: moveIsLoading,
    isSuccess: moveIsSuccess,
  } = usePostMoveCategory();
  const { mutate: deleteMutate, isLoading: deleteIsLoading } =
    useDeleteCategory();

  const toMenuIdRef = useRef<number | undefined>(undefined);

  function onPostsMoveClick() {
    if (!menuId) return alert("현재 게시판을 삭제할 수 없습니다.");

    if (!toMenuIdRef.current)
      return alert("게시글을 이동할 게시판을 선택해주세요.");

    moveMutate(
      {
        fromCategoryId: menuId,
        toCategoryId: toMenuIdRef.current,
      },
      {
        onSuccess: () => {
          toast({
            title: "게시글 이동 완료",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        },
      }
    );
  }

  function onMenuDeleteClick() {
    if (!menuId) return alert("현재 게시판을 삭제할 수 없습니다.");

    deleteMutate(menuId, {
      onSuccess: () => {
        queryClient.invalidateQueries(["adminMenuList"]);
      },
    });
  }

  return (
    <Box
      my="20px"
      bgColor="white"
      py="1rem"
      px={{ base: "0.75rem", md: "1rem" }}
      rounded="3xl"
      border="1px solid"
      borderColor="red.5"
    >
      <Heading fontSize="xl" color={semanticColors.error}>
        메뉴 삭제
      </Heading>
      {menuType === "BOARD" && (
        <Box my="1rem">
          <Text>게시글 이동 후 삭제 가능합니다.</Text>
          <Flex alignItems="center" my="0.5rem">
            <Heading fontSize="md" wordBreak="keep-all" textAlign="center">
              게시글 이동
            </Heading>
            <Select
              w="14rem"
              h="2.25rem"
              border="1px solid"
              borderColor="gray.5"
              mx={{ base: "8px", md: "16px" }}
              onChange={(e) => (toMenuIdRef.current = Number(e.target.value))}
            >
              <option value="" hidden>
                게시판
              </option>
              {boardMenuList
                .filter((menu) => menu.menuId !== menuId)
                .map((menu) => (
                  <option key={menu.menuId} value={menu.menuId}>
                    {menu.name}
                  </option>
                ))}
            </Select>
            <Button
              variant="primary"
              size="sm"
              onClick={onPostsMoveClick}
              isLoading={moveIsLoading}
              loadingText="이동 중"
              isDisabled={moveIsSuccess}
            >
              이동
            </Button>
          </Flex>
        </Box>
      )}

      {menuType === "BOARD" && <Divider borderColor="gray.6" my="0.5rem" />}

      <Box>
        {menuType === "BOARD" && (
          <Heading fontSize="md" color={semanticColors.error}>
            메뉴 삭제
          </Heading>
        )}
        <Flex my="0.25rem" alignItems="center">
          <Text wordBreak="keep-all">
            메뉴를 삭제하면 다시 복구할 수 없습니다. 신중히 선택해 주세요.
          </Text>
          <Button
            variant="danger"
            ml="1rem"
            size="sm"
            isDisabled={menuType === "BOARD" ? !moveIsSuccess : false}
            onClick={onMenuDeleteClick}
            isLoading={deleteIsLoading}
            loadingText="삭제 중"
          >
            삭제
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
