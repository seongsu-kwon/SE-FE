import { Box, Button, Divider, Flex, Grid, useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { PageHeaderTitle } from "@/components/admin";
import { AdminMenuContainer } from "@/components/admin/menuSettings";
import {
  useGetAdminDashboard,
  usePostAdminMenuRollSetting,
} from "@/react-query/hooks";
import { adminMenuRollSettingState } from "@/store/menu";
import { adminMenuRoleSetting, getAdminMenuArray } from "@/utils/menuUtils";

export const AdminMenuEdit = () => {
  const toast = useToast();
  const { data } = useGetAdminDashboard();
  const { mutate, isLoading } = usePostAdminMenuRollSetting();

  const menuDataList = getAdminMenuArray(data);

  const [adminMenuRoleSettingData, setAdminMenuRoleSettingData] =
    useRecoilState(adminMenuRollSettingState);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!data) return;

    setAdminMenuRoleSettingData(adminMenuRoleSetting(data));
  }, [data]);

  function onEnrollClick() {
    if (!adminMenuRoleSettingData.length) return;

    mutate(adminMenuRoleSettingData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["adminDashboardRoles"]);
        queryClient.invalidateQueries(["adminDashboard"]);
        toast({
          title: "권한 설정이 변경되었습니다.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
    });
  }

  return (
    <Box h="full" textAlign="left">
      <PageHeaderTitle title="관리자 메뉴 권한 관리" />
      <Box
        my="20px"
        bgColor="white"
        py="1rem"
        px={{ base: "0.75rem", md: "1rem" }}
        rounded="3xl"
      >
        <Grid templateColumns="repeat(1, 1fr)" rowGap="1.25rem">
          {menuDataList.map((menuData, index) => (
            <Box key={index} w="100%">
              <AdminMenuContainer
                heading={menuData.heading}
                menu={menuData.list}
              />
              <Divider border="1px solid" borderColor="gray.4" />
            </Box>
          ))}
        </Grid>
        <Flex justifyContent="flex-end" mt="1rem">
          <Button
            variant="primary"
            isLoading={isLoading}
            loadingText="등록 중"
            onClick={onEnrollClick}
          >
            등록
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
