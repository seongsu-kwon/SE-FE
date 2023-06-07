import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { AdminSettingRole, PutRoleData, Role } from "@types";
import { useEffect, useState } from "react";

import { PageHeaderTitle } from "@/components/admin";
import { AuthorityMenu } from "@/components/admin/menuSettings";
import { useGetAdminDashboard, useGetRoleInfos } from "@/react-query/hooks";

export const AdminMenuEdit = () => {
  const { data: RoleList } = useGetRoleInfos();
  const { data: adminSettingRoleList } = useGetAdminDashboard();

  const [roleList, setRoleList] = useState<Role[]>([]);
  const [settingRoleList, setSettingRoleList] = useState<AdminSettingRole>();
  const [seSelectedRole, setSeSelectedRole] = useState<PutRoleData>({
    option: "",
    roles: [],
  });
  const [accountListSelectedRole, setAccountListSelectedRole] =
    useState<PutRoleData>({
      option: "",
      roles: [],
    });
  const [accountPolicySelectedRole, setAccountPolicySelectedRole] =
    useState<PutRoleData>({
      option: "",
      roles: [],
    });
  const [roleSelectedRole, setRoleSelectedRole] = useState<PutRoleData>({
    option: "",
    roles: [],
  });
  const [postSelectedRole, setPostSelectedRole] = useState<PutRoleData>({
    option: "",
    roles: [],
  });
  const [commentSelectedRole, setCommentSelectedRole] = useState<PutRoleData>({
    option: "",
    roles: [],
  });
  const [attachmentSelectedRole, setAttachmentSelectedRole] =
    useState<PutRoleData>({
      option: "",
      roles: [],
    });
  const [trashSelectedRole, setTrashSelectedRole] = useState<PutRoleData>({
    option: "",
    roles: [],
  });
  const [settingSelectedRole, setSettingSelectedRole] = useState<PutRoleData>({
    option: "",
    roles: [],
  });
  const [mainSelectedRole, setMainSelectedRole] = useState<PutRoleData>({
    option: "",
    roles: [],
  });

  useEffect(() => {
    if (!RoleList) return;

    setRoleList(roleList);
  }, [RoleList]);

  useEffect(() => {
    if (!adminSettingRoleList) return;

    setSettingRoleList(adminSettingRoleList);
  }, [adminSettingRoleList]);

  return (
    <Box h="full" textAlign="left">
      <PageHeaderTitle title="관리자 메뉴 관리" />
      <Box
        my="20px"
        bgColor="white"
        py="1rem"
        px={{ base: "0.75rem", md: "1rem" }}
        rounded="3xl"
      >
        <Heading fontSize="xl">메뉴 관리 권한 설정</Heading>
        <Box ml="2rem">
          <Flex alignItems="center" my="0.5rem">
            <Heading fontSize="md" mr="4px" w="6rem">
              SE 메뉴 편집
            </Heading>
            <AuthorityMenu
              authority={
                settingRoleList?.menuSetting.menuEdit || {
                  option: "",
                  roles: [],
                }
              }
              roleList={roleList}
              selectedRole={seSelectedRole}
              setSelectedRole={setSeSelectedRole}
            />
          </Flex>
        </Box>
      </Box>

      <Box
        my="20px"
        bgColor="white"
        py="1rem"
        px={{ base: "0.75rem", md: "1rem" }}
        rounded="3xl"
      >
        <Heading fontSize="xl">회원 관리 권한 설정</Heading>
        <Box ml="2rem">
          <Flex alignItems="center" my="0.5rem">
            <Heading fontSize="md" mr="4px" w="6rem">
              회원 목록
            </Heading>
            <AuthorityMenu
              authority={
                settingRoleList?.accountManage.accountList || {
                  option: "",
                  roles: [],
                }
              }
              roleList={roleList}
              selectedRole={accountListSelectedRole}
              setSelectedRole={setAccountListSelectedRole}
            />
          </Flex>
          <Flex alignItems="center" my="0.5rem">
            <Heading fontSize="md" mr="4px" w="6rem">
              회원 정책
            </Heading>
            <AuthorityMenu
              authority={
                settingRoleList?.accountManage.accountPolicy || {
                  option: "",
                  roles: [],
                }
              }
              roleList={roleList}
              selectedRole={accountPolicySelectedRole}
              setSelectedRole={setAccountPolicySelectedRole}
            />
          </Flex>
          <Flex alignItems="center" my="0.5rem">
            <Heading fontSize="md" mr="4px" w="6rem">
              회원 그룹
            </Heading>
            <AuthorityMenu
              authority={
                settingRoleList?.accountManage.roles || {
                  option: "",
                  roles: [],
                }
              }
              roleList={roleList}
              selectedRole={roleSelectedRole}
              setSelectedRole={setRoleSelectedRole}
            />
          </Flex>
        </Box>
      </Box>

      <Box
        my="20px"
        bgColor="white"
        py="1rem"
        px={{ base: "0.75rem", md: "1rem" }}
        rounded="3xl"
      >
        <Heading fontSize="xl">컨텐츠 관리 권한 설정</Heading>
        <Box ml="2rem">
          <Flex alignItems="center" my="0.5rem">
            <Heading fontSize="md" mr="4px" w="6.5rem">
              게시글 관리
            </Heading>
            <AuthorityMenu
              authority={
                settingRoleList?.contentManage.post || {
                  option: "",
                  roles: [],
                }
              }
              roleList={roleList}
              selectedRole={postSelectedRole}
              setSelectedRole={setPostSelectedRole}
            />
          </Flex>
          <Flex alignItems="center" my="0.5rem">
            <Heading fontSize="md" mr="4px" w="6.5rem">
              댓글 관리
            </Heading>
            <AuthorityMenu
              authority={
                settingRoleList?.contentManage.comment || {
                  option: "",
                  roles: [],
                }
              }
              roleList={roleList}
              selectedRole={commentSelectedRole}
              setSelectedRole={setCommentSelectedRole}
            />
          </Flex>
          <Flex alignItems="center" my="0.5rem">
            <Heading fontSize="md" mr="4px" w="6.5rem">
              첨부파일 관리
            </Heading>
            <AuthorityMenu
              authority={
                settingRoleList?.contentManage.file || {
                  option: "",
                  roles: [],
                }
              }
              roleList={roleList}
              selectedRole={attachmentSelectedRole}
              setSelectedRole={setAttachmentSelectedRole}
            />
          </Flex>
          <Flex alignItems="center" my="0.5rem">
            <Heading fontSize="md" mr="4px" w="6.5rem">
              휴지통
            </Heading>
            <AuthorityMenu
              authority={
                settingRoleList?.contentManage.trash || {
                  option: "",
                  roles: [],
                }
              }
              roleList={roleList}
              selectedRole={trashSelectedRole}
              setSelectedRole={setTrashSelectedRole}
            />
          </Flex>
        </Box>
      </Box>

      <Box
        my="20px"
        bgColor="white"
        py="1rem"
        px={{ base: "0.75rem", md: "1rem" }}
        rounded="3xl"
      >
        <Heading fontSize="xl">설정 권한 설정</Heading>
        <Box ml="2rem">
          <Flex alignItems="center" my="0.5rem">
            <Heading fontSize="md" mr="4px" w="8rem">
              일반
            </Heading>
            <AuthorityMenu
              authority={
                settingRoleList?.generalSetting.general || {
                  option: "",
                  roles: [],
                }
              }
              roleList={roleList}
              selectedRole={settingSelectedRole}
              setSelectedRole={setSettingSelectedRole}
            />
          </Flex>
          <Flex alignItems="center" my="0.5rem">
            <Heading fontSize="md" mr="4px" w="8rem">
              메인 페이지 설정
            </Heading>
            <AuthorityMenu
              authority={
                settingRoleList?.generalSetting.mainPage || {
                  option: "",
                  roles: [],
                }
              }
              roleList={roleList}
              selectedRole={mainSelectedRole}
              setSelectedRole={setMainSelectedRole}
            />
          </Flex>
        </Box>
      </Box>

      <Box
        mt="-10px"
        bgColor="white"
        py="0.5rem"
        px={{ base: "0.75rem", md: "1rem" }}
        rounded="xl"
        textAlign="right"
      >
        <Button variant="primary">등록</Button>
      </Box>
    </Box>
  );
};
