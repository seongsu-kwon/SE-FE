import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
  BsExclamationCircle,
  BsPencilSquare,
  BsShare,
  BsThreeDotsVertical,
  BsTrash3,
} from "react-icons/bs";

import { openColors } from "@/styles";

interface MoreButtonProps {
  fontSize?: string;
  menuItems: {
    name: string;
    onClick: () => void;
    isWriter: boolean;
    icon: IconType;
  }[];
}

export const MoreButton = ({ fontSize, menuItems }: MoreButtonProps) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="더보기 버튼"
        icon={<BsThreeDotsVertical />}
        fontSize={fontSize || "24px"}
        mx="1vw"
        backgroundColor={openColors.white}
        _hover={{ backgroundColor: openColors.white }}
        _expanded={{ backgroundColor: openColors.white }}
      />
      <MenuList minWidth="120px" shadow="xl">
        {menuItems.map(
          (item) =>
            item.isWriter && (
              <MenuItem
                key={item.name}
                icon={<item.icon />}
                onClick={item.onClick}
                maxW="120px"
              >
                {item.name}
              </MenuItem>
            )
        )}
      </MenuList>
    </Menu>
  );
};

export const PostMoreButton = ({ isEditable }: { isEditable: boolean }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="더보기 버튼"
        icon={<BsThreeDotsVertical />}
        fontSize="24px"
        mx="1vw"
        backgroundColor={openColors.white}
        _hover={{ backgroundColor: openColors.white }}
        _expanded={{ backgroundColor: openColors.white }}
      />
      <MenuList minWidth="120px" shadow="xl">
        {isEditable ? (
          <>
            <MenuItem icon={<BsPencilSquare />} onClick={() => {}} maxW="120px">
              수정
            </MenuItem>
            <MenuItem icon={<BsTrash3 />} onClick={() => {}} maxW="120px">
              삭제
            </MenuItem>
            <MenuItem icon={<BsShare />} onClick={() => {}} maxW="120px">
              공유
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem icon={<BsShare />} onClick={() => {}} maxW="120px">
              공유
            </MenuItem>
            <MenuItem
              icon={<BsExclamationCircle />}
              onClick={() => {}}
              maxW="120px"
            >
              신고
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};
