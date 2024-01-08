import { Button, HStack } from "@chakra-ui/react";
import { Menu } from "@types";

import { usePostSearchParams } from "@/hooks/usePostSearchParams";

export const CategoryNavigation = ({
  categoryList,
}: {
  categoryList: Menu[];
}) => {
  const { category, changeCategory, deleteCategory } = usePostSearchParams();

  return (
    <HStack flexWrap="wrap">
      <Button
        onClick={deleteCategory}
        variant="ghost"
        color={!category ? "primary" : ""}
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
          color={category === item.urlId ? "primary" : ""}
        >
          {item.name}
        </Button>
      ))}
    </HStack>
  );
};
