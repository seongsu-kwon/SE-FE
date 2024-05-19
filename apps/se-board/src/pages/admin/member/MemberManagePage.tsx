import { Box, Button, Flex } from "@chakra-ui/react";
import { AdminMember, FetchAdminMemberListParams } from "@types";
import { useEffect, useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";

import { Pagination } from "@/components";
import { PageHeaderTitle } from "@/components/admin";
import { useAdminMemberSearchParams } from "@/hooks";
import {
  useAdminDeleteMembers,
  useAdminFetchMemberList,
} from "@/react-query/hooks/admin/useAdminMemberQuery";

import { MemberEditModal } from "./MemberEditModal";
import { AdminMemberTable } from "./MemberTable";

export const MemberManagePage = () => {
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    member?: AdminMember;
  }>({ isOpen: false });
  const [selectedPMemberIds, setSelectedMemberIds] = useState<number[]>([]);
  const [params, setParams] = useState<FetchAdminMemberListParams>({
    page: 0,
    perPage: 20,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useAdminFetchMemberList(params);
  const { setPageSearchParam } = useAdminMemberSearchParams();

  const { mutate: deleteMembers, isLoading } = useAdminDeleteMembers();

  const emptySelectMemberIds = () => {
    setSelectedMemberIds([]);
  };

  const onChangePage = (page: number) => {
    emptySelectMemberIds();
    setPageSearchParam(page);
    window.scrollTo(0, 0);
  };

  // 선택된 회원 삭제
  const onDeleteButtonClick = () => {
    deleteMembers(selectedPMemberIds);
    emptySelectMemberIds();
  };

  const deleteMember = (accountId: number) => {
    deleteMembers([accountId]);
  };

  const openEditModal = (member: AdminMember) => {
    setEditModal({ isOpen: true, member });
  };
  const closeEditModal = () => {
    setEditModal({ isOpen: false });
  };

  useEffect(() => {
    const page = searchParams.get("page");
    const perPage = searchParams.get("perPage");

    setParams({
      page: page ? parseInt(page) : 0,
      perPage: perPage ? parseInt(perPage) : params.perPage,
    });
  }, [searchParams]);
  return (
    <Box h="full" textAlign="left">
      <PageHeaderTitle title="회원 목록" />
      <Box
        my="20px"
        py="1rem"
        px={{ base: "0.75rem", md: "1rem" }}
        rounded="3xl"
        bgColor="white"
      >
        <AdminMemberTable
          members={data?.content || []}
          selectedMemberIds={selectedPMemberIds}
          setSelectedMemberIds={setSelectedMemberIds}
          onClickEdit={openEditModal}
          onClickDelete={deleteMember}
        />
        <Flex mt="0.5rem" justify="end">
          <Button
            leftIcon={<BsTrash3 />}
            variant="danger"
            isDisabled={selectedPMemberIds.length === 0}
            onClick={onDeleteButtonClick}
            isLoading={isLoading}
            loadingText="삭제 중"
          >
            삭제
          </Button>
        </Flex>
        <Flex justify="center">
          <Pagination
            totalPage={data?.totalPages ?? 0}
            currentPage={data?.pageable.pageNumber ?? 0}
            onChangePage={onChangePage}
          />
        </Flex>
      </Box>
      <MemberEditModal
        isOpen={editModal.isOpen}
        onClose={closeEditModal}
        member={editModal.member}
      />
    </Box>
  );
};
