import { Button, HStack, useColorModeValue } from "@chakra-ui/react";
import { Menu } from "@types";

import { usePostSearchParams } from "@/hooks/usePostSearchParams";

export const CategoryNavigation = ({
  categoryList,
}: {
  categoryList: Menu[];
}) => {
  const { category, changeCategory, deleteCategory } = usePostSearchParams();
  const color = useColorModeValue("gray.7", "white");

  return (
    <HStack flexWrap="wrap">
      <Button
        onClick={deleteCategory}
        variant="ghost"
        color={!category ? "primary" : color}
      >
        전체
      </Button>
      {categoryList.map((item) => (
        <Button
          key={item.menuId}
          onClick={() => {
            changeCategory(item.urlId);
          }}
          variant="ghost"
          color={category === item.urlId ? "primary" : color}
        >
          {item.name}
        </Button>
      ))}
    </HStack>
  );
};
