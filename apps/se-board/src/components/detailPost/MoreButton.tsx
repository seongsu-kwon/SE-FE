import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { BsThreeDotsVertical } from "react-icons/bs";

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
