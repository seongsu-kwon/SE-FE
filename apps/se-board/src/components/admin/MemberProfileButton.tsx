import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { AuthorDTO } from "@types";

import { useNavigatePage } from "@/hooks";

interface MemberProfileButtonProps {
  memberInfo: AuthorDTO;
}

export const MemberProfileButton = ({
  memberInfo,
}: MemberProfileButtonProps) => {
  const { goToProfilePage } = useNavigatePage();

  if (memberInfo.loginId === null) {
    return (
      <Menu>
        <MenuButton cursor="not-allowed">{memberInfo.name}</MenuButton>
      </Menu>
    );
  }

  return (
    <Menu>
      <MenuButton _hover={{ textDecoration: "underline" }} color="blue.7">
        {memberInfo.name}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => goToProfilePage(memberInfo.loginId)}>
          프로필 보기
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
